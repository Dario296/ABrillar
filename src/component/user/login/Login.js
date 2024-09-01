import React from 'react';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AdminContext';

const Login = () => {
	const { login } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => login(data.name, data.password);

	return (
		<form className='formularioLogin' onSubmit={handleSubmit(onSubmit)}>
			<FormControl className='controles' margin='normal' fullWidth>
				<InputLabel>Nombre</InputLabel>
				<Input type='text' {...register('name', { required: { value: true, message: 'El nombre es obligatorio' } })} />
				{errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
			</FormControl>
			<FormControl className='controles' margin='normal' fullWidth>
				<InputLabel>Contraseña</InputLabel>
				<Input type='password' {...register('password', { required: { value: true, message: 'La contraseña es obligatorio' } })} />
				{errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
			</FormControl>
			<Button type='submit' variant='contained' color='primary'>
				Iniciar
			</Button>
		</form>
	);
};

export default Login;
