import { useState } from 'react';
import { getFirestore, collection, query, where, documentId, writeBatch, addDoc, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
import app from '../config/firebase';

const db = getFirestore(app);

const useCartHandler = () => {
	const [cartItems, setCartItems] = useState([]);

	const addToCart = (item) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((i) => i.ID === item.ID);
			if (existingItem) {
				const updatedItems = prevItems.filter((i) => i.ID !== item.ID);
				return [...updatedItems, { ...item }];
			}
			return [...prevItems, { ...item }];
		});
	};

	const removeFromCart = (itemId) => {
		setCartItems((prevItems) => prevItems.filter((i) => i.ID !== itemId));
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const increaseQuantity = (itemId) => {
		setCartItems((prevItems) => prevItems.map((item) => (item.ID === itemId && item.cantidad < item.stock ? { ...item, cantidad: item.cantidad + 1 } : item)));
	};

	const decreaseQuantity = (itemId) => {
		setCartItems((prevItems) =>
			prevItems
				.map((item) => {
					if (item.ID === itemId && item.cantidad > 0) {
						return { ...item, cantidad: item.cantidad - 1 };
					}
					return item;
				})
				.filter((item) => item.cantidad > 0)
		);
	};

	const quantity = () => cartItems.reduce((total, item) => total + item.cantidad, 0);

	const totalPrice = () => {
		return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
	};
	const totalPriceVF = () => {
		return cartItems.reduce((total, item) => total + item.precio, 0);
	};

	const confirmSaleF = async (name) => {
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

			await addDoc(ventaRef, {
				fecha: new Date().toLocaleDateString(),
				hora: new Date().toLocaleTimeString(),
				items: cartItems,
				total: totalPriceVF(),
				nombre: name,
			});

			clearCart();
		} catch (error) {
			Swal.fire({
				icon: 'error',
				text: 'Hubo un problema al confirmar la venta. Inténtelo nuevamente.',
			});
		}
	};

	const confirmSaleV = async () => {
		try {
			const batch = writeBatch(db);
			const ventaRef = collection(db, 'Ventas');

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

			await addDoc(ventaRef, {
				fecha: new Date().toLocaleDateString(),
				hora: new Date().toLocaleTimeString(),
				items: cartItems,
				total: totalPriceVF(),
			});

			clearCart();
		} catch (error) {
			Swal.fire({
				icon: 'error',
				text: 'Hubo un problema al confirmar la venta. Inténtelo nuevamente.',
			});
		}
	};

	return {
		cartItems,
		addToCart,
		removeFromCart,
		clearCart,
		increaseQuantity,
		decreaseQuantity,
		quantity,
		totalPrice,
		totalPriceVF,
		confirmSaleF,
		confirmSaleV,
	};
};

export default useCartHandler;
