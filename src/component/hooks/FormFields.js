import { FormControl, Input, InputLabel, FormHelperText } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const FormField = ({ name, label, type, required }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<FormControl fullWidth margin='normal'>
			<InputLabel htmlFor={name}>{label}</InputLabel>
			<Input id={name} type={type} {...register(name, { required: { value: required, message: `${label} es obligatorio` } })} />
			{errors[name] && <FormHelperText error>{errors[name].message}</FormHelperText>}
		</FormControl>
	);
};

export default FormField;
