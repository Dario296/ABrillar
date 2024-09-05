import React from 'react';
import { Button } from '@mui/material';

const CartButtons = ({ clearCart, handleClose, confirmSale, sendPresupuesto }) => {
	return (
		<div className='Cart'>
			<Button className="ConfirmaPedido" onClick={confirmSale}>Confirmar Venta</Button>
			<Button className="VaciarCarrito" onClick={() => { clearCart(); handleClose(); }} > Vaciar carrito </Button>
			<Button className="EnviarPresupuesto" onClick={sendPresupuesto}>Enviar Presupuesto</Button>
			<Button onClick={handleClose}>Volver</Button>
		</div>
	);
};

export default CartButtons;
