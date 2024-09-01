import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const cartItemsLS = JSON.parse(localStorage.getItem('cartItems'));
		if (cartItemsLS) setCartItems(cartItemsLS);
	}, []); // Cargar los elementos del carrito desde localStorage al iniciar

	useEffect(() => {
		if (cartItems.length > 0) {
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
		} else {
			localStorage.removeItem('cartItems');
		}
	}, [cartItems]); // Sincronizar el carrito con localStorage cada vez que cambie cartItems

	const addToCart = (item) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((i) => i.ID === item.ID);
			if (existingItem) {
				if (existingItem.cantidad < item.stock) {
					// Verificar que la cantidad actual no supere el stock disponible
					return prevItems.map((i) => (i.ID === item.ID ? { ...i, cantidad: i.cantidad + 1 } : i));
				} else {
					return prevItems; // Si ya alcanzó el stock, retorna el estado anterior sin cambios
				}
			} else {
				// Agregar el producto si no existe en el carrito
				return [...prevItems, { ...item }];
			}
		});
	}; // Agregar un producto al carrito

	const removeFromCart = (itemId) => {
		setCartItems((prevItems) => prevItems.filter((i) => i.ID !== itemId));
	}; // Remover un producto del carrito

	const clearCart = () => {
		setCartItems([]);
	}; // Vaciar el carrito

	const increaseQuantity = (itemId) => {
		setCartItems((prevItems) => prevItems.map((item) => (item.ID === itemId && item.cantidad < item.stock ? { ...item, cantidad: item.cantidad + 1 } : item)));
	}; // Incrementar la cantidad de un producto en el carrito

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

	const quantity = () => {
		return cartItems.reduce((total, item) => total + item.cantidad, 0);
	}; // Obtener el total de productos en el carrito

	const totalPrice = () => {
		return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
	}; // Calcular el precio total del carrito

	return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, quantity, totalPrice }}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
	return useContext(CartContext);
};
