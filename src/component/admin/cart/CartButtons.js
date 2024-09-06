import React, { useState } from 'react';
import { Button } from '@mui/material';

const CartButtons = ({ clearCart, handleClose, confirmSale, sendPresupuesto }) => {
	const [cargando, setCargando] = useState(false)
	return (
		<div className='Cart'>
			<Button className="ConfirmaPedido" onClick={() => {setCargando(true); confirmSale()}} disabled={cargando} >Confirmar Venta</Button>
			<Button className="VaciarCarrito" onClick={() => { clearCart(); handleClose(); }} > Vaciar carrito </Button>
			<Button className="EnviarPresupuesto" onClick={sendPresupuesto}>Enviar Presupuesto</Button>
			<Button onClick={handleClose}>Volver</Button>
		</div>
	);
};

export default CartButtons;
