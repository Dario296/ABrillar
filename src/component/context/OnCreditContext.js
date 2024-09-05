import { createContext, useContext, useState } from 'react';
import { getFirestore, collection, query, where, documentId, writeBatch, addDoc, getDocs } from 'firebase/firestore';
import app from '../config/firebase';
import Swal from 'sweetalert2';

const OnCreditContext = createContext();
const db = getFirestore(app);

export const OnCreditProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [saleInProcess, setSaleInProcess] = useState(false);

	const addToCart = (item) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((i) => i.ID === item.ID);
			if (existingItem) {
				return prevItems.map((i) => (i.ID === item.ID ? { ...i, cantidad: item.cantidad } : i));
			} else {
				return [...prevItems, { ...item }];
			}
		});
	};

	const removeFromCart = (itemId) => {
		setCartItems((prevItems) => prevItems.filter((i) => i.ID !== itemId));
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const quantity = () => {
		return cartItems.reduce((total, item) => total + item.cantidad, 0);
	};

	const totalPrice = () => {
		return cartItems.reduce((total, item) => total + item.precio, 0);
	};

	const confirmSale = async (name) => {
		setSaleInProcess(true);
		try {
			const batch = writeBatch(db);
			const ventaRef = collection(db, 'Fiados');
			const productos = await getDocs(
				query(
					collection(db, 'ListadoProductos'),
					where(
						documentId(),
						'in',
						cartItems.map((item) => item.IDRef || item.ID)
					)
				)
			);

			productos.forEach((doc) => {
				const item = cartItems.find(({ IDRef, ID }) => (IDRef || ID) === doc.id);
				const cantidad = item.IDRef ? item.cantidad * item.unidades : item.cantidad;
				batch.update(doc.ref, { stock: doc.data().stock - cantidad });
			});

			await batch.commit();
			await addDoc(ventaRef, { fecha: new Date().toLocaleDateString(), hora: new Date().toLocaleTimeString(), items: cartItems, total: totalPrice(), nombre: name });

			clearCart();
			window.location.reload();
		} catch (error) {
			Swal.fire({
				icon: 'error',
				text: 'Hubo un problema al confirmar la venta. Inténtelo nuevamente.',
			});
		} finally {
			setSaleInProcess(false);
		}
	};

	return <OnCreditContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, quantity, totalPrice, confirmSale, saleInProcess }}>{children}</OnCreditContext.Provider>;
};

export const useOnCreditContext = () => {
	return useContext(OnCreditContext);
};
