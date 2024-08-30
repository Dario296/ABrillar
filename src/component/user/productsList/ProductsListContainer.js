import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
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
				let Products = snapshot.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
				Products = Products.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordena productos por nombre
				setProductsList(Products);
			} catch (err) {
				setError('Error al cargar los productos.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();

		return () => {
			setProductsList([]);
		};
	}, [categoria]);

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<Grid container spacing={4} direction='row' justifyContent='space-around' alignItems='center'>
			{productsList.map((Products) => (
				<Grid item key={Products.ID}>
					{categoria === "ofertas"? <RecipeReviewCardOffers producto={Products} /> : <RecipeReviewCard Products={Products} />}
				</Grid>
			))}
		</Grid>
	);
};

export default ProductsListContainer;
