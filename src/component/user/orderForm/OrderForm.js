import React from 'react';
import { Button, FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useForm, FormProvider } from 'react-hook-form';
import Swal from 'sweetalert2';
import app from '../../config/firebase';
import { useCartContext } from '../../context/CartContext';
import FormField from '../../hooks/FormFields';

const db = getFirestore(app);

const OrderForm = () => {
	const { cartItems, totalPrice, clearCart } = useCartContext();
	const methods = useForm();
	const { handleSubmit, register } = methods;

	let total = totalPrice();

	const onSubmit = async (data) => {
		const order = {
			Comprador: data,
			Items: cartItems,
			Total: total,
		};
		try {
			const orderRef = collection(db, 'Pedidos');
			await addDoc(orderRef, order);
			// Crear mensaje para WhatsApp
			let productos = cartItems.map((producto) => `${producto.cantidad} x ${producto.nombre}: $${producto.precio.toFixed(2)}`).join(', ');
			let cliente = `Nombre: ${data.nombre}, Dirección: ${data.direccion}, Teléfono: ${data.telefono}, Forma de pago: ${data.formaDePago}`;
			let mensaje = `${productos}. Total: $${total.toFixed(2)}. ${cliente}`;
			// Enviar mensaje a WhatsApp
			window.location.href = `https://api.whatsapp.com/send?phone=5493512591067&text=${encodeURIComponent(mensaje)}`;
			// Limpiar carrito y formulario
			clearCart();
		} catch (error) {
			Swal.fire({
				icon: 'error',
				text: 'Hubo un problema al procesar su pedido.',
			});
		}
	};

	return (
		<FormProvider {...methods}>
			<form className='formularioPedido' onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<FormField name='nombre' label='NOMBRE' type='text' required />
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormField name='direccion' label='DIRECCION' type='text' required />
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormField name='telefono' label='TELEFONO' type='tel' required />
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormControl fullWidth margin='normal'>
							<label>Forma de Pago</label>
							<Select {...register('formaDePago', { required: { value: true, message: 'Debe selecionar una forma de pago' } })}>
								<MenuItem value='Efectivo'>Efectivo</MenuItem>
								<MenuItem value='Transferencia bancaria'>Transferencia bancaria</MenuItem>
							</Select>
							{methods.formState.errors.formaDePago && <FormHelperText error>{methods.formState.errors.formaDePago.message}</FormHelperText>}
						</FormControl>
					</Grid>
				</Grid>
				<Button type='submit' variant='contained' color='primary'>
					Confirmar Pedido
				</Button>
			</form>
		</FormProvider>
	);
};

export default OrderForm;
