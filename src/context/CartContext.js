import React, { createContext, useContext, useState } from 'react';
import useCartHandler from '../hooks/useCartHandler';
import Swal from "sweetalert2";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const ventas = useCartHandler('ventas');
	const fiados = useCartHandler('fiados');
	const pedidos = useCartHandler('pedidos');
	const [saleInProcess, setSaleInProcess] = useState(false);
    const [shouldReload, setShouldReload] = useState(false);
	const confirmSaleV = async () => {
        setSaleInProcess(true);
        try {
            await ventas.confirmSaleV();
            setShouldReload(true);  
        } catch (error) {
            Swal.fire({ icon: 'error', text: 'Hubo un problema al confirmar la venta.' });
        } finally {
            setSaleInProcess(false);
        }
    };
	const confirmSaleF = async (data) => {
        setSaleInProcess(true);
        try {
            await fiados.confirmSaleF(data);
            setShouldReload(true);  
        } catch (error) {
            Swal.fire({ icon: 'error', text: 'Hubo un problema al confirmar la venta.' });
        } finally {
            setSaleInProcess(false);
        }
    };

	return (
		<CartContext.Provider
			value={{
				ventas: ventas,
				fiados: fiados,
				pedidos: pedidos,
				saleInProcess,
                confirmSaleV,
                confirmSaleF,
                shouldReload,
                setShouldReload,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => useContext(CartContext);
