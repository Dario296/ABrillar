import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContexto } from '../context/CartContex';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import app from '../config/firebase';

const db = getFirestore(app);

export default function RecipeReviewCard({ producto }) {
	const [productRef, setProductRef] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [cantidad, setCantidad] = useState(0);
	const { agregarCarrito, estaEnCarrito } = useContexto();

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

	const handleSumar = () => {
		if (productRef && cantidad < Math.floor(productRef.stock / producto.unidades)) {
			setCantidad(cantidad + 1);
		}
	};

	const handleRestar = () => {
		if (cantidad > 0) {
			setCantidad(cantidad - 1);
		}
	};

	const handleAgregar = () => {
		if (cantidad > 0) {
			const productoAgregar = {
				ID: producto.ID,
				nombre: producto.nombre,
				precio: Math.round((productRef.costo * producto.unidades * (1 + producto.porcentaje / 100)) / 10) * 10,
				cantidad,
				stock: Math.floor(productRef.stock / producto.unidades),
			};
			agregarCarrito(productoAgregar);
			setCantidad(0); // Reiniciar la cantidad después de agregar
		}
	};

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <Typography color="error">{error}</Typography>;
	}

	if (!productRef) {
		return null;
	}

	const stockDisponible = Math.floor(productRef.stock / producto.unidades);
	const precio = Math.round((productRef.costo * producto.unidades * (1 + producto.porcentaje / 100)) / 10) * 10;

	return (
		<Card className='Card'>
			<CardHeader title={producto.nombre} action={`$${precio}`} />
			<CardMedia component='img' height='194' image={producto.img} alt={`Imagen de ${producto.nombre}`} />
			<CardContent>
				<Typography className='Descripcion'>{producto.descripcion1}</Typography>
				{producto.descripcion2 && <Typography className='Descripcion'>({producto.descripcion2})</Typography>}
			</CardContent>
			{estaEnCarrito(producto.ID) ? null : (
				<CardActions disableSpacing>
					{stockDisponible > 0 ? (
						<>
							<IconButton className='Restar' onClick={handleRestar}>
								<RemoveIcon />
							</IconButton>
							<Typography className='Cantidad'>{cantidad}</Typography>
							<IconButton className='Sumar' onClick={handleSumar}>
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
			)}
		</Card>
	);
}
