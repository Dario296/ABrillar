import React from 'react';
import { Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useAuth } from '../../context/AdminContext';
import FormField from '../../hooks/FormFields';

const Login = () => {
	const { login } = useAuth();
	const methods = useForm();
	const { handleSubmit } = methods;
	const onSubmit = (data) => login(data.name, data.password);

	return (
		<FormProvider {...methods}>
			<form className='formularioLogin' onSubmit={handleSubmit(onSubmit)}>
				<FormField name='name' label='NOMBRE' type='text' required />
				<FormField name='password' label='CONTRASEÑA' type='password' required />
				<Button type='submit'>
					Iniciar
				</Button>
			</form>
		</FormProvider>
	);
};

export default Login;
