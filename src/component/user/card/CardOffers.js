import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useCartContext } from '../../context/CartContext';
import app from '../../config/firebase';

const db = getFirestore(app);

export default function RecipeReviewCard({ product }) {
	const [productRef, setProductRef] = useState([]);
	const [quantity, setQuantity] = useState(0);
	const { addToCart } = useCartContext();

	useEffect(() => {
		const fetchProductRef = async () => {
			try {
				const productDoc = await getDoc(doc(db, 'ListadoProductos', product.referencia));
				setProductRef(productDoc.data());
			} catch (err) {}
		};

		fetchProductRef();
	}, [product.referencia]); // Busca el producto del cual se hace referencia la oferta

	const stockAvailable = Math.floor(productRef.stock / product.unidades); // calcula el stock disponible de la oferta dividiendo el stock por las unidades de la oferta
	const price = Math.ceil((productRef.costo * product.unidades + (productRef.costo * product.unidades * product.porcentaje) / 100) / 50) * 50; // Calcula el precio redondeado basado en costo y porcentaje multiplicado por las unidades de la oferta

	const handleAdd = () => {
		if (quantity < stockAvailable) {
			setQuantity(quantity + 1);
		}
	}; // Maneja el incremento de la cantidad, sin superar el stock

	const handleRemove = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		}
	}; // Maneja la reducción de la cantidad, asegurándose de que no baje de 0

	const handleAgregar = () => {
		if (quantity > 0) {
			const productoAgregar = {
				ID: product.ID,
				nombre: product.nombre,
				precio: price,
				cantidad: quantity,
				stock: stockAvailable,
			};
			addToCart(productoAgregar);
			setQuantity(0); // Reiniciar la cantidad después de agregar
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
				{stockAvailable > 0 ? (
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
