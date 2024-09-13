import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../config/firebase';
import Swal from 'sweetalert2';
import { useCartContext } from '../context/CartContext';

const db = getFirestore(app);

const ProductsListDB = () => {
	const [productsList, setProductsList] = useState([]);
	const [loading, setLoading] = useState(true);
	const { shouldReload, setShouldReload } = useCartContext();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const ref = collection(db, 'ListadoProductos');
				const snapshot = await getDocs(ref);
				const products = snapshot.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
				products.sort((a, b) => a.nombre.localeCompare(b.nombre));
				setProductsList(products);
				setShouldReload(false);
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
		if (shouldReload) {
			fetchProducts();
		}
	}, [shouldReload, setShouldReload]);

	return { productsList, loading };
};

export default ProductsListDB;
