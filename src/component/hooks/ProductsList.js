import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../config/firebase';

const db = getFirestore(app);

const useProductsList = () => {
	const [productsList, setProductsList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const ref = collection(db, 'ListadoProductos');
				const snapshot = await getDocs(ref); // Obtiene todos los productos sin filtrar por categoría
				const products = snapshot.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
				products.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar productos por nombre
				setProductsList(products);
			} catch (err) {
				setError('Error al cargar los productos.');
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return { productsList, loading, error };
};

export default useProductsList;
