import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import FormField from '../../hooks/FormFields';

const CartButtons = ({ clearCart, handleClose, confirmSale }) => {
	const [cargando, setCargando] = useState(false)
	const methods = useForm();
	const { handleSubmit } = methods;
	const onSubmit = (data) => {setCargando(true); confirmSale(data.name)}
	return (
		<div className='Cart'>
			<FormProvider {...methods}>
				<form className="text-center" onSubmit={handleSubmit(onSubmit)}>
					<FormField name='name' label='NOMBRE' type='text' required />
					<Button className="ConfirmaPedido" type='submit' disabled={cargando} >Confirmar Fiado</Button>
				</form>
			</FormProvider>
			<Button className="VaciarCarrito" onClick={() => { clearCart(); handleClose(); }} > Vaciar carrito </Button>
			<Button onClick={handleClose}>Volver</Button>
		</div>
	);
};

export default CartButtons;
