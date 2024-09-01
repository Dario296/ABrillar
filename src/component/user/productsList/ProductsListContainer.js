import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import app from '../../config/firebase';
import RecipeReviewCard from '../card/Card';
import RecipeReviewCardOffers from '../card/CardOffers';

const db = getFirestore(app);

const ProductsListContainer = () => {
	const { categoria } = useParams();
	const [productsList, setProductsList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const ref = collection(db, 'ListadoProductos');
				const answer = query(ref, where('categoria', '==', categoria));
				const snapshot = await getDocs(answer);
				let products = snapshot.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
				products.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordena productos por nombre
				setProductsList(products);
			} catch (err) {
				setError('Error al cargar los productos.');
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();

		return () => setProductsList([]); // Limpia los productos al desmontar
	}, [categoria]);

	if (loading) {
		return (
			<Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
				<CircularProgress />
			</Grid>
		);
	} // Muestra indicador de carga mientras se cargan los productos

	if (error) {
		return (
			<Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
				<Typography variant='h6' color='error'>
					{error}
				</Typography>
			</Grid>
		);
	} // Muestra un mensaje de error en caso de que algo falle

	return (
		<Grid container spacing={4} direction='row' justifyContent='space-around' alignItems='center'>
			{productsList.map((product) => (
				<Grid item key={product.ID}>
					{categoria === 'ofertas' ? <RecipeReviewCardOffers product={product} /> : <RecipeReviewCard product={product} />}
				</Grid>
			))}
		</Grid>
	);
};

export default ProductsListContainer;
