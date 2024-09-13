import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import app from '../../../config/firebase';
import ViewCard from '../card/ViewCard';
import ViewCardOfert from '../card/ViewCardOffers';

const db = getFirestore(app);

const ProductsList = () => {
	const { categoria } = useParams();
	const [productsList, setProductsList] = useState([]);
	const [loading, setLoading] = useState(true);

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
				console.log("Error: " + err);				
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

	return (
		<Grid container spacing={4} direction='row' justifyContent='space-around' alignItems='center'>
			{productsList.map((product) => (
				<Grid item key={product.ID}>
					{categoria === 'ofertas' ? <ViewCardOfert product={product} /> : <ViewCard product={product} />}
				</Grid>
			))}
		</Grid>
	);
};

export default ProductsList;
