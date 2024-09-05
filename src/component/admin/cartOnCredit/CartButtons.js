import React from 'react';
import { Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import FormField from '../../hooks/FormFields';

const CartButtons = ({ clearCart, handleClose, confirmSale }) => {
	const methods = useForm();
	const { handleSubmit } = methods;
	const onSubmit = (data) => confirmSale(data.name)
	return (
		<div className='Cart'>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormField name='name' label='NOMBRE' type='text' required />
					<Button type='submit'>
						Confirmar Fiado
					</Button>
				</form>
			</FormProvider>
			<Button onClick={() => { clearCart(); handleClose(); }} > Vaciar carrito </Button>
			<Button onClick={handleClose}>Volver</Button>
		</div>
	);
};

export default CartButtons;
