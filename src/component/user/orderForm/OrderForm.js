import React from 'react';
import { Button, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import app from '../../config/firebase';
import { useCartContext } from '../../context/CartContext';

const db = getFirestore(app);

const OrderForm = () => {
	const { cartItems, totalPrice, clearCart } = useCartContext();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

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
		<form className='formularioPedido' onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin='normal'>
						<InputLabel>Nombre</InputLabel>
						<Input type='text' {...register('nombre', { required: { value: true, message: 'El nombre es obligatorio' } })} />
						{errors.nombre && <span style={{ color: 'red' }}>{errors.nombre.message}</span>}
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin='normal'>
						<InputLabel>Dirección</InputLabel>
						<Input type='text' {...register('direccion', { required: { value: true, message: 'La direccion es obligatoria' } })} />
						{errors.direccion && <span style={{ color: 'red' }}>{errors.direccion.message}</span>}
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin='normal'>
						<InputLabel>Teléfono</InputLabel>
						<Input type='tel' {...register('telefono', { required: { value: true, message: 'El telefono es obligatorio' } })} />
						{errors.telefono && <span style={{ color: 'red' }}>{errors.telefono.message}</span>}
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin='normal'>
						<InputLabel>Forma de Pago</InputLabel>
						<Select {...register('formaDePago', { required: { value: true, message: 'Debe selecionar una forma de pago' } })}>
							<MenuItem value='Efectivo'>Efectivo</MenuItem>
							<MenuItem value='Transferencia bancaria'>Transferencia bancaria</MenuItem>
						</Select>
						{errors.formaDePago && <span style={{ color: 'red' }}>{errors.formaDePago.message}</span>}
					</FormControl>
				</Grid>
			</Grid>
			<Button type='submit' variant='contained' color='primary'>
				Confirmar Pedido
			</Button>
		</form>
	);
};

export default OrderForm;
