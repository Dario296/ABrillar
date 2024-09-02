import { useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../../config/firebase';
import FormField from '../../formFields/FormFields';

const db = getFirestore(app);

const CreateProduct = () => {
	const methods = useForm();
	const { handleSubmit, watch, reset } = methods;
	const [message, setMessage] = useState('');

	const categoria = watch('categoria');

	const onSubmit = async (data) => {
		try {
			const ProductosRef = collection(db, 'ListadoProductos');
			const docRef = await addDoc(ProductosRef, data);

			if (data.categoria !== 'ofertas') {
				setMessage(`Producto guardado con éxito. ID: ${docRef.id}`);
			}

			reset();
		} catch (error) {
			setMessage('Error al guardar el producto.');
		}
	};

	return (
		<FormProvider {...methods}>
			<div>
				{message && <h3>{message}</h3>}
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl fullWidth margin='normal'>
						<InputLabel id='select-label'>CATEGORIA</InputLabel>
						<Select labelId='select-label' defaultValue='' {...methods.register('categoria', { required: { value: true, message: 'Debe seleccionar una categoría' } })}>
							<MenuItem value='ofertas'>Ofertas</MenuItem>
							<MenuItem value='autos'>Autos</MenuItem>
							<MenuItem value='autos'>Autos</MenuItem>
							<MenuItem value='baños'>Baños</MenuItem>
							<MenuItem value='bolsas'>Bolsas</MenuItem>
							<MenuItem value='cocina'>Cocina</MenuItem>
							<MenuItem value='insecticidas'>Insecticidas</MenuItem>
							<MenuItem value='otros'>Otros</MenuItem>
							<MenuItem value='pisos'>Pisos</MenuItem>
							<MenuItem value='ropa'>Ropa</MenuItem>
							<MenuItem value='gato'>Gato</MenuItem>
							<MenuItem value='perro'>Perro</MenuItem>
						</Select>
						{methods.formState.errors.categoria && <FormHelperText error>{methods.formState.errors.categoria.message}</FormHelperText>}
					</FormControl>

					{categoria === 'ofertas' ? (
						<>
							<FormField name='descripcion1' label='DESCRIPCION1' type='text' required />
							<FormField name='nombre' label='NOMBRE' type='text' required />
							<FormField name='porcentaje' label='PORCENTAJE' type='number' required />
							<FormField name='referencia' label='REFERENCIA' type='text' required />
							<FormField name='unidades' label='UNIDADES' type='number' required />
						</>
					) : (
						<>
							<FormField name='costo' label='COSTO' type='number' required />
							<FormField name='descripcion1' label='DESCRIPCION1' type='text' required />
							<FormField name='nombre' label='NOMBRE' type='text' required />
							<FormField name='porcentaje' label='PORCENTAJE' type='number' required />
							<FormField name='stock' label='STOCK' type='number' required />
						</>
					)}

					<Button type='submit' variant='contained' color='primary'>
						Guardar
					</Button>
				</form>
			</div>
		</FormProvider>
	);
};

export default CreateProduct;
