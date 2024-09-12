import React, { useState } from 'react';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useForm, FormProvider } from 'react-hook-form';
import Swal from 'sweetalert2';
import app from '../../../config/firebase';
import { useCartContext } from '../../../context/CartContext';
import FormField from '../../../hooks/FormFields';

const db = getFirestore(app);

const OrderForm = () => {
	const { pedidos } = useCartContext();
	const cartData = pedidos;
	const methods = useForm();
	const { handleSubmit, register } = methods;
	const [saleInProcess, setSaleInProcess] = useState(false)

	let total = cartData.totalPrice();

	const onSubmit = async (data) => {
		setSaleInProcess(true);
		const order = {
			Comprador: data,
			Items: cartData.cartItems,
			Total: total,
		};
		try {
			const orderRef = collection(db, 'Pedidos');
			await addDoc(orderRef, order);
			// Crear mensaje para WhatsApp
			let productos = cartData.cartItems.map((producto) => `${producto.cantidad} x ${producto.nombre}: $${producto.precio}`).join(', ');
			let cliente = `Nombre: ${data.nombre}, Dirección: ${data.direccion}, Teléfono: ${data.telefono}, Forma de pago: ${data.formaDePago}`;
			let mensaje = `${productos}. Total: $${total}. ${cliente}`;
			// Enviar mensaje a WhatsApp
			window.open(`https://api.whatsapp.com/send?phone=5493512591067&text=${encodeURIComponent(mensaje)}`, '_blank');
			// Limpiar carrito y formulario
			cartData.clearCart();
		} catch (error) {
			Swal.fire({
				icon: 'error',
				text: 'Hubo un problema al procesar su pedido.',
			});
		} finally{
			setSaleInProcess(false);
		}
	};

	return (
		<FormProvider {...methods}>
			<form className='FormularioPedido' onSubmit={handleSubmit(onSubmit)}>
				<FormField name='nombre' label='NOMBRE' type='text' required />
				<FormField name='direccion' label='DIRECCION' type='text' required />
				<FormField name='telefono' label='TELEFONO' type='tel' required />
				<FormControl fullWidth margin='normal'>
					<InputLabel>Forma de Pago</InputLabel>
					<Select {...register('formaDePago', { required: { value: true, message: 'Debe selecionar una forma de pago' } })}>
						<MenuItem value='Efectivo'>Efectivo</MenuItem>
						<MenuItem value='Transferencia bancaria'>Transferencia bancaria</MenuItem>
					</Select>
					{methods.formState.errors.formaDePago && <FormHelperText error>{methods.formState.errors.formaDePago.message}</FormHelperText>}
				</FormControl>
				<Button className='ConfirmaPedido' type='submit' disabled={saleInProcess}>
					Confirmar Pedido
				</Button>
			</form>
		</FormProvider>
	);
};

export default OrderForm;
