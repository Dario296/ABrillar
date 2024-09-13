import { useState } from 'react';
import { getFirestore, collection, query, where, documentId, writeBatch, addDoc, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
import app from '../config/firebase';

// Firebase Firestore instance
const db = getFirestore(app);

// Hook personalizado para manejar los carritos
const useCartHandler = () => {
	const [cartItems, setCartItems] = useState([]); // Estado para los ítems del carrito

	// Añadir un ítem al carrito, o actualizarlo si ya existe
	const addToCart = (item) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((i) => i.ID === item.ID);
			if (existingItem) {
				// Si el ítem ya existe, se actualiza
				const updatedItems = prevItems.filter((i) => i.ID !== item.ID);
				return [...updatedItems, { ...item }];
			}
			// Si no existe, se agrega como nuevo
			return [...prevItems, { ...item }];
		});
	};

	// Eliminar un ítem del carrito
	const removeFromCart = (itemId) => {
		setCartItems((prevItems) => prevItems.filter((i) => i.ID !== itemId));
	};

	// Vaciar el carrito
	const clearCart = () => {
		setCartItems([]);
	};

	// Aumentar la cantidad de un ítem en el carrito, respetando el stock disponible
	const increaseQuantity = (itemId) => {
		setCartItems((prevItems) => prevItems.map((item) => (item.ID === itemId && item.cantidad < item.stock ? { ...item, cantidad: item.cantidad + 1 } : item)));
	};

	// Disminuir la cantidad de un ítem en el carrito, y eliminarlo si la cantidad llega a 0
	const decreaseQuantity = (itemId) => {
		setCartItems(
			(prevItems) =>
				prevItems
					.map((item) => {
						if (item.ID === itemId && item.cantidad > 0) {
							return { ...item, cantidad: item.cantidad - 1 };
						}
						return item; // Devuelve el mismo objeto si no cumple la condición
					})
					.filter((item) => item.cantidad > 0) // Elimina los productos con cantidad 0
		);
	}; // Disminuir la cantidad de un producto en el carrito y eliminarlo si llega a 0

	// Calcular la cantidad total de ítems en el carrito
	const quantity = () => cartItems.reduce((total, item) => total + item.cantidad, 0);

	// Calcular el precio total de los ítems en el carrito
	const totalPrice = () => {
		return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
	};
	const totalPriceVF = () => {
		return cartItems.reduce((total, item) => total + item.precio, 0);
	};

	// Confirmar la venta y actualizar la base de datos
	const confirmSaleF = async (name) => {
		try {
			const batch = writeBatch(db); // Batch para hacer múltiples escrituras
			const ventaRef = collection(db, 'Fiados'); // Define la colección

			// Obtener productos para actualizar el stock
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

			// Actualizar el stock en la base de datos
			productos.forEach((doc) => {
				const item = cartItems.find(({ IDRef, ID }) => (IDRef || ID) === doc.id);
				const cantidad = item.IDRef ? item.cantidad * item.unidades : item.cantidad;
				batch.update(doc.ref, { stock: doc.data().stock - cantidad });
			});

			await batch.commit(); // Confirmar la actualización del stock

			// Agregar la venta a la colección
			await addDoc(ventaRef, {
				fecha: new Date().toLocaleDateString(),
				hora: new Date().toLocaleTimeString(),
				items: cartItems,
				total: totalPriceVF(),
				nombre: name,
			});

			clearCart(); // Limpiar el carrito después de confirmar la venta
		} catch (error) {
			Swal.fire({
				icon: 'error',
				text: 'Hubo un problema al confirmar la venta. Inténtelo nuevamente.',
			});
		}
	};

	const confirmSaleV = async () => {
		try {
			const batch = writeBatch(db); // Batch para hacer múltiples escrituras
			const ventaRef = collection(db, 'Ventas'); // Define la colección

			// Obtener productos para actualizar el stock
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

			// Actualizar el stock en la base de datos
			productos.forEach((doc) => {
				const item = cartItems.find(({ IDRef, ID }) => (IDRef || ID) === doc.id);
				const cantidad = item.IDRef ? item.cantidad * item.unidades : item.cantidad;
				batch.update(doc.ref, { stock: doc.data().stock - cantidad });
			});

			await batch.commit(); // Confirmar la actualización del stock

			// Agregar la venta a la colección
			await addDoc(ventaRef, {
				fecha: new Date().toLocaleDateString(),
				hora: new Date().toLocaleTimeString(),
				items: cartItems,
				total: totalPriceVF(),
			});

			clearCart(); // Limpiar el carrito después de confirmar la venta
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
