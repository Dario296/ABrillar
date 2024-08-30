import React, { useState } from 'react';
import { Button, FormControl, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import app from '../../config/firebase';
import { useCartContext } from '../../context/CartContext';

const db = getFirestore(app);

const OrderForm = () => {
	const { cartItems, totalPrice, clearCart } = useCartContext();

	const [data, setData] = useState({
		nombre: '',
		direccion: '',
		telefono: '',
		formaDePago: '',
	});

	const [error, setError] = useState('');

	let total = totalPrice();

	const changeInput = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const sendOrder = () => {
		let productos = cartItems.map((producto) => `${producto.cantidad} x ${producto.nombre}: $${producto.precio.toFixed(2)}`).join(', ');
		let cliente = `Nombre: ${data.nombre}, Dirección: ${data.direccion}, Teléfono: ${data.telefono}, Forma de pago: ${data.formaDePago}`;
		let mensaje = `${productos}. Total: $${total.toFixed(2)}. ${cliente}`;
		window.location.href = `https://api.whatsapp.com/send?phone=5493516062623&text=${encodeURIComponent(mensaje)}`;
	};

	const confirmPurchase = async (e) => {
		e.preventDefault();
		if (!data.nombre || !data.direccion || !data.telefono || !data.formaDePago) {
			setError('Por favor, complete todos los campos.');
			return;
		}

		setError('');

		const order = {
			Comprador: data,
			Items: cartItems,
			Total: total,
		};

		try {
			const orderRef = collection(db, 'Pedidos');
			await addDoc(orderRef, order);
			sendOrder();
			clearCart();
		} catch (error) {
			console.error('Error al crear el pedido: ', error);
			setError('Hubo un problema al procesar su pedido.');
		}
	};

	return (
		<form className='formularioPedido' onSubmit={confirmPurchase}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin='normal'>
						<InputLabel>Nombre</InputLabel>
						<Input onChange={changeInput} name='nombre' required type='text' />
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin='normal'>
						<InputLabel>Dirección</InputLabel>
						<Input onChange={changeInput} name='direccion' required type='text' />
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin='normal'>
						<InputLabel>Teléfono</InputLabel>
						<Input onChange={changeInput} name='telefono' required type='tel' />
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl fullWidth margin='normal'>
						<InputLabel>Forma de Pago</InputLabel>
						<Select onChange={changeInput} name='formaDePago' required>
							<MenuItem value='Efectivo'>Efectivo</MenuItem>
							<MenuItem value='Transferencia bancaria'>Transferencia bancaria</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			{error && <Typography color='error'>{error}</Typography>}
			<Button type='submit' variant='contained' color='primary'>
				Confirmar Pedido
			</Button>
		</form>
	);
};

export default OrderForm;
