import { createContext, useContext, useState } from 'react';

const CartContextAdmin = createContext();

export const CartAdminProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	console.log(cartItems);

	const addToCart = (item) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((i) => i.ID === item.ID);
			if (existingItem) {
				// Si el producto ya está en el carrito, reemplaza la cantidad con la nueva cantidad seleccionada
				return prevItems.map((i) => (i.ID === item.ID ? { ...i, cantidad: item.cantidad } : i));
			} else {
				// Agregar el producto si no existe en el carrito
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
		return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
	};

	return (
		<CartContextAdmin.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				clearCart,
				quantity,
				totalPrice,
			}}
		>
			{children}
		</CartContextAdmin.Provider>
	);
};

export const useCartAdminContext = () => {
	return useContext(CartContextAdmin);
};
