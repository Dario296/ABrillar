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
		const existingItem = cartItems.find((i) => i.ID === item.ID);
		if (existingItem) {
			setCartItems((prevItems) => prevItems.map((i) => (i.ID === item.ID ? { ...i, quantity: i.quantity + 1 } : i)));
		} else {
			setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
		}
	}; // Agregar un producto al carrito

	const removeFromCart = (itemId) => {
		setCartItems((prevItems) => prevItems.filter((i) => i.ID !== itemId));
	}; // Remover un producto del carrito

	const clearCart = () => {
		setCartItems([]);
	}; // Vaciar el carrito

	const increaseQuantity = (itemId) => {
		setCartItems((prevItems) => prevItems.map((item) => (item.ID === itemId && item.quantity < item.stock ? { ...item, quantity: item.quantity + 1 } : item)));
	}; // Incrementar la cantidad de un producto en el carrito

	const decreaseQuantity = (itemId) => {
		setCartItems((prevItems) => prevItems.map((item) => (item.ID === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)).filter((item) => item.quantity > 0));
	}; // Disminuir la cantidad de un producto en el carrito y eliminarlo si llega a 0

	const quantity = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0);
	}; // Obtener el total de productos en el carrito

	const totalPrice = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	}; // Calcular el precio total del carrito

	return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, quantity, totalPrice }}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
	return useContext(CartContext);
};
