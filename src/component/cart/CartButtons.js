import React from 'react';
import { Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import FormField from '../../hooks/FormFields';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AdminContext';

const CartButtons = ({ clearCart, confirmSaleF, confirmSaleV, handleClose, sendPresupuesto }) => {
	const methods = useForm();
	const { handleSubmit } = methods;
	const onSubmit = (data) => confirmSaleF(data.name);
	const location = useLocation();
	const { isAuthenticated } = useAuth();

	return (
		<div className='Cart'>
			{isAuthenticated ? (
				<>
					{location.pathname === '/fiados' && (
						<FormProvider {...methods}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<FormField name='name' label='NOMBRE' type='text' required />
								<Button type='submit' className='ConfirmaPedido'>
									Confirmar
								</Button>
							</form>
						</FormProvider>
					)}
					{location.pathname === '/' && (
						<>
							<Button onClick={confirmSaleV} className='ConfirmaPedido'>
								Confirmar
							</Button>
							<Button onClick={sendPresupuesto} className='EnviarPresupuesto'>
								Enviar Presupuesto
							</Button>
						</>
					)}
				</>
			) : null}
			{!isAuthenticated && (
				<Button className='ConfirmaPedido' onClick={handleClose} component={Link} to='/realizarpedido'>
					Terminar pedido
				</Button>
			)}
			<Button
				onClick={() => {
					clearCart();
					handleClose();
				}}
				className='VaciarCarrito'
			>
				Vaciar carrito
			</Button>
			<Button onClick={handleClose}>Volver</Button>
		</div>
	);
};

export default CartButtons;
