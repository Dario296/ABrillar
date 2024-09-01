import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCartContext } from '../../context/CartContext';

export default function RecipeReviewCard({ product }) {
	const [quantity, setQuantity] = useState(0);
	const { addToCart } = useCartContext();

	const calculatePrice = (cost, porcentaje) => {
		return Math.ceil((cost + (cost * porcentaje) / 100) / 50) * 50;
	}; // Calcula el precio redondeado basado en costo y porcentaje

	const price = calculatePrice(product.costo, product.porcentaje);

	const handleAdd = () => {
		if (quantity < product.stock) {
			setQuantity((prevQuantity) => prevQuantity + 1);
		}
	}; // Maneja el incremento de la cantidad, sin superar el stock

	const handleRemove = () => {
		if (quantity > 0) {
			setQuantity((prevQuantity) => prevQuantity - 1);
		}
	}; // Maneja la reducción de la cantidad, asegurándose de que no baje de 0

	const handleAgregar = () => {
		if (quantity > 0) {
			const productToAdd = {
				ID: product.ID,
				nombre: product.nombre,
				precio: price,
				cantidad: quantity,
				stock: product.stock,
			};
			addToCart(productToAdd);
			setQuantity(0); // Reinicia la cantidad tras agregar al carrito
		}
	}; // Añade el producto al carrito y reinicia la cantidad

	return (
		<Card className='Card'>
			<CardHeader title={product.nombre} action={`$${price}`} />
			<CardMedia component='img' height='194' image={product.img} alt={`Imagen de ${product.nombre}`} />
			<CardContent>
				<Typography className='Descripcion'>{product.descripcion1}</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{product.stock > 0 ? (
					<>
						<IconButton className='Restar' onClick={handleRemove}>
							<RemoveIcon />
						</IconButton>
						<Typography className='Cantidad'>{quantity}</Typography>
						<IconButton className='Sumar' onClick={handleAdd}>
							<AddIcon />
						</IconButton>
						<IconButton onClick={handleAgregar} className='Añadir'>
							<Typography>Añadir</Typography>
							<AddShoppingCartIcon />
						</IconButton>
					</>
				) : (
					<Typography>No hay stock de este producto</Typography>
				)}
			</CardActions>
		</Card>
	);
}
