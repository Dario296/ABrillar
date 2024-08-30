import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useCartContext } from '../../context/CartContext';
import app from '../../config/firebase';

const db = getFirestore(app);

export default function RecipeReviewCard({ producto }) {
	const [productRef, setProductRef] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [quantity, setQuantity] = useState(0);
	const { addToCart } = useCartContext();

	useEffect(() => {
		const fetchProductRef = async () => {
			try {
				const productDoc = await getDoc(doc(db, 'ListadoProductos', producto.referencia));
				if (productDoc.exists()) {
					setProductRef(productDoc.data());
				} else {
					setError('Producto no encontrado');
				}
			} catch (err) {
				setError('Error al cargar los datos del producto');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProductRef();
	}, [producto.referencia]);

	const stockAvailable = Math.floor(productRef.stock / producto.unidades);
	const price = Math.round((productRef.costo * producto.unidades + (productRef.costo * producto.unidades * producto.porcentaje) / 100) / 10) * 10; // Calcula el precio redondeado basado en costo y porcentaje multiplicado por las unidades de la oferta

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
				ID: producto.ID,
				nombre: producto.nombre,
				precio: price,
				cantidad,
				stock: stockAvailable,
			};
			addToCart(productoAgregar);
			setQuantity(0); // Reiniciar la cantidad después de agregar
		}
	}; // Añade el producto al carrito y reinicia la cantidad

	if (loading) {
		return <CircularProgress />;
	} // Muestra indicador de carga mientras se cargan el producto

	if (error) {
		return <Typography color='error'>{error}</Typography>;
	} // Muestra un mensaje de error en caso de que algo falle

	if (!productRef) {
		return null;
	} // Muestra un mensaje de error en caso de que algo falle

	return (
		<Card className='Card'>
			<CardHeader title={producto.nombre} action={`$${price}`} />
			<CardMedia component='img' height='194' image={producto.img} alt={`Imagen de ${producto.nombre}`} />
			<CardContent>
				<Typography className='Descripcion'>{producto.descripcion1}</Typography>
				{producto.descripcion2 && <Typography className='Descripcion'>({producto.descripcion2})</Typography>}
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
