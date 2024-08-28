import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const cartItemsLS = JSON.parse(localStorage.getItem('cartItems'));
		if (cartItemsLS) setCartItems(cartItemsLS);
	}, []);

	const addToCart = (item) => {
		const existingItem = cartItems.find((i) => i.ID === item.ID);
		if (existingItem) {
			setCartItems((prevItems) => prevItems.map((i) => (i.ID === item.ID ? { ...i, quantity: i.quantity + 1 } : i)));
		} else {
			setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
		}
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	};

	const removeFromCart = (itemId) => {
		setCartItems((prevItems) => prevItems.filter((i) => i.ID !== itemId));
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	};

	const clearCart = () => {
		setCartItems([]);
		localStorage.removeItem('cartItems');
	};

	const increaseQuantity = (itemId) => {
		setCartItems((prevItems) => prevItems.map((i) => (i.ID === itemId ? { ...i, quantity: i.quantity + 1 } : i)));
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	};

	const decreaseQuantity = (itemId) => {
		setCartItems((prevItems) => prevItems.map((i) => (i.ID === itemId && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i)));
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	};

	const quantity = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0);
	};

	const totalPrice = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, quantity, totalPrice }}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
	return useContext(CartContext);
};
