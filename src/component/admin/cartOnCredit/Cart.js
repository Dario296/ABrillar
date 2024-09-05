import React, { useState } from 'react';
import CartTable from './CartTable';
import CartButtons from './CartButtons';
import CartIcon from './CartIcon';
import CartModal from './CartModal';
import { useOnCreditContext } from '../../context/OnCreditContext';

const Cart = () => {
	const { cartItems, quantity, removeFromCart, totalPrice, clearCart, confirmSale, saleInProcess } = useOnCreditContext();
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleRemoveFromCart = (itemId) => {
		removeFromCart(itemId);
		if (cartItems.length === 1) {
			handleClose(); // Si queda un solo ítem en el carrito, cerramos el modal al eliminarlo.
		}
	};

	return (
		<>	
			{ cartItems.length === 0 ? null : <CartIcon handleOpen={handleOpen} cartItems={cartItems} quantity={quantity} />}
			<CartModal open={open} handleClose={handleClose}>
				<CartTable cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} quantity={quantity} totalPrice={totalPrice} />
				<CartButtons clearCart={clearCart} handleClose={handleClose} confirmSale={confirmSale} saleInProcess={saleInProcess} />
			</CartModal>
		</>
	);
};

export default Cart;
