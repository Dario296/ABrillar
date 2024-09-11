import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import CartModal from './CartModal';
import CartButtons from './CartButtons';
import CartIcon from './CartIcon';
import CartTable from './CartTable';
import { useAuth } from '../../context/AdminContext';

const Cart = () => {
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const { ventas, fiados, pedidos } = useCartContext();
	const { isAuthenticated } = useAuth();
	const cartData = isAuthenticated? location.pathname === '/fiados'? fiados: ventas: pedidos
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleRemoveFromCart = (itemId) => {
		cartData.removeFromCart(itemId);
		if (cartData.cartItems.length === 1) {
			handleClose(); // Si queda un solo ítem en el carrito, cerramos el modal al eliminarlo.
		}
	};
	const sendPresupuesto = () => {
		const productos = cartData.cartItems.map((producto) => `$${producto.precio} - ${producto.nombre} x ${producto.cantidad}.\n`).join('');
		const mensaje = `${productos}Total: $${cartData.totalPrice()}.`;
		window.open(`https://api.whatsapp.com/send?phone=5493512591067&text=${encodeURIComponent(mensaje)}`, '_blank');
	};

	return (
		<>
			<CartIcon handleOpen={handleOpen} quantity={cartData.quantity} />
			<CartModal open={open} handleClose={handleClose}>
				<CartTable cartItems={cartData.cartItems} removeFromCart={handleRemoveFromCart} totalPrice={cartData.totalPrice} totalPriceVF={cartData.totalPriceVF} increaseQuantity={cartData.increaseQuantity} decreaseQuantity={cartData.decreaseQuantity} />
				<CartButtons handleClose={handleClose} clearCart={cartData.clearCart} confirmSaleV={cartData.confirmSaleV} confirmSaleF={cartData.confirmSaleF} sendPresupuesto={sendPresupuesto} />
			</CartModal>
		</>
	);
};

export default Cart;
