import React, { createContext, useContext } from 'react';
import useCartHandler from '../hooks/useCartHandler';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const ventas = useCartHandler('ventas');
	const fiados = useCartHandler('fiados');
	const pedidos = useCartHandler('pedidos');

	return (
		<CartContext.Provider
			value={{
				ventas: ventas,
				fiados: fiados,
				pedidos: pedidos,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => useContext(CartContext);
