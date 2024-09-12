import React, { useState } from 'react';
import { Button, IconButton, InputAdornment, InputLabel, Input, FormControl, FormHelperText } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useAuth } from '../../../context/AdminContext';
import FormField from '../../../hooks/FormFields';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
	const { login } = useAuth();
	const methods = useForm();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = methods;
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = (data) => login(data.name.toLowerCase(), data.password.toLowerCase());

	return (
		<FormProvider {...methods}>
			<form className='FormularioLogin' onSubmit={handleSubmit(onSubmit)}>
				<FormField name='name' label='NOMBRE' type='text' required />
				<FormControl fullWidth margin='normal'>
					<InputLabel htmlFor='password'>CONTRASEÑA</InputLabel>
					<Input
						id='password'
						type={showPassword ? 'text' : 'password'}
						{...register('password', { required: { value: true, message: 'Contraseña es obligatorio' } })}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton onClick={handleClickShowPassword} edge='end'>
									{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
								</IconButton>
							</InputAdornment>
						}
					/>
					{errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
				</FormControl>
				<Button className='Confirmar' type='submit'>
					Iniciar
				</Button>
			</form>
		</FormProvider>
	);
};

export default Login;
