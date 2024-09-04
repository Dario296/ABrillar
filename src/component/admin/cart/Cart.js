import React, { useState } from 'react';
import { useCartAdminContext } from '../../context/CartAdminContext';
import CartTable from './CartTable';
import CartButtons from './CartButtons';
import CartIcon from './CartIcon';
import CartModal from './CartModal';



const Cart = () => {
    const { cartItems, quantity, removeFromCart, totalPrice, clearCart, confirmarVenta, ventaEnProceso } = useCartAdminContext();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
        if (cartItems.length === 1) {
            handleClose(); // Si queda un solo ítem en el carrito, cerramos el modal al eliminarlo.
        }
    };

    const sendPresupuesto = () => {
        const productos = cartItems.map((producto) => `$${producto.precio} - ${producto.nombre} x ${producto.cantidad}.\n`).join('');
        const mensaje = `${productos}Total: $${totalPrice()}.`;
        window.open(`https://api.whatsapp.com/send?phone=5493512591067&text=${encodeURIComponent(mensaje)}`, '_blank');
    };

    return (
        <>
            <CartIcon handleOpen={handleOpen} cartItems={cartItems} quantity={quantity} />
            <CartModal open={open} handleClose={handleClose}>
                <CartTable cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} quantity={quantity} totalPrice={totalPrice} />
                <CartButtons clearCart={clearCart} handleClose={handleClose} confirmarVenta={confirmarVenta} sendPresupuesto={sendPresupuesto} ventaEnProceso={ventaEnProceso} />
            </CartModal>
        </>
    );
};

export default Cart;
