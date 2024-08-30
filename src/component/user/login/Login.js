import React, { useState } from 'react';
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material';
import { useAuth } from '../../context/AdminContext';

const Login = () => {
	const { login } = useAuth();
	const [data, setData] = useState({
		nombre: '',
		password: '',
	});
	const [error, setError] = useState('');

	const changeInput = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setError('');

		if (data.nombre && data.password) {
			login(data.nombre, data.password).catch(() => {
				setError('Nombre o contraseña incorrectos');
			});
		} else {
			setError('Por favor, complete todos los campos.');
		}
	};

	return (
		<form className='formularioLogin' onSubmit={handleSubmit}>
			<FormControl className='controles' margin='normal' fullWidth>
				<InputLabel htmlFor='nombre'>Nombre</InputLabel>
				<Input id='nombre' onChange={changeInput} name='nombre' value={data.nombre} required type='text' />
			</FormControl>
			<FormControl className='controles' margin='normal' fullWidth>
				<InputLabel htmlFor='password'>Contraseña</InputLabel>
				<Input id='password' onChange={changeInput} name='password' value={data.password} required type='password' />
			</FormControl>
			{error && <Typography color='error'>{error}</Typography>}
			<Button type='submit' variant='contained' color='primary'>
				Iniciar
			</Button>
		</form>
	);
};

export default Login;
