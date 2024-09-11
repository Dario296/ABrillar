import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../config/firebase';
import Swal from 'sweetalert2';

const db = getFirestore(app);

const ProductsListDB = () => {
	const [productsList, setProductsList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const ref = collection(db, 'ListadoProductos');
				const snapshot = await getDocs(ref); // Obtiene todos los productos sin filtrar por categoría
				const products = snapshot.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
				products.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar productos por nombre
				setProductsList(products);
			} catch (err) {
				Swal.fire({
					icon: 'error',
					text: 'Error al cargar los productos.',
				});
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return { productsList, loading };
};

export default ProductsListDB;
