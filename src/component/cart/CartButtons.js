import React from 'react';
import { Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import FormField from '../../hooks/FormFields';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AdminContext';

const CartButtons = ({ clearCart, confirmSaleF, confirmSaleV, handleClose, sendPresupuesto, saleInProcess }) => {
	const methods = useForm();
	const { handleSubmit } = methods;
	const onSubmit = async (data) => {
		await confirmSaleF(data.name);
		handleClose();
	};
	const location = useLocation();
	const { isAuthenticated } = useAuth();

	return (
		<div className='Cart'>
			{isAuthenticated ? (
				<>
					{location.pathname === '/fiados' && (
						<FormProvider {...methods}>
							<form className='text-center my-2' onSubmit={handleSubmit(onSubmit)}>
								<FormField name='name' label='NOMBRE' type='text' required />
								<Button type='submit' className='Confirmar' disabled={saleInProcess}>
									Confirmar
								</Button>
							</form>
						</FormProvider>
					)}
					{location.pathname === '/' && (
						<>
							<Button
								onClick={async () => {
									await confirmSaleV();
									handleClose();
								}}
								className='Confirmar mb-2'
								disabled={saleInProcess}
							>
								Confirmar
							</Button>
							<Button onClick={sendPresupuesto} className='EnviarPresupuesto mb-2'>
								Enviar Presupuesto
							</Button>
						</>
					)}
				</>
			) : null}
			{!isAuthenticated && (
				<Button className='Confirmar mb-2' onClick={handleClose} component={Link} to='/realizarpedido'>
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
