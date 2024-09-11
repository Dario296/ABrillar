import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Box, Input } from '@mui/material';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../../../config/firebase';
import FormFieldsByCategory from '../../../hooks/FormFieldsByCategory';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const db = getFirestore(app);
const storage = getStorage(app);

const categories = ['ofertas', 'autos', 'bolsas', 'cocina', 'insecticidas', 'otros', 'pisos', 'ropa', 'gato', 'perro'];

const CreateProduct = () => {
	const [cargando, setCargando] = useState(false);
	const methods = useForm();
	const {
		handleSubmit,
		watch,
		reset,
		control,
		formState: { errors },
	} = methods;
	const [message, setMessage] = useState('');
	const categoria = watch('categoria');

	const onSubmit = async (data) => {
		setCargando(true);
		try {
			let imageUrl = '';
			const { categoria, descripcion1, nombre, porcentaje, referencia, unidades, costo, stock } = data;
			if (data.image[0]) {
				const imageFile = data.image[0];
				const storageRef = ref(storage, `products/${imageFile.name}`);
				const uploadTask = uploadBytesResumable(storageRef, imageFile);

				await new Promise((resolve, reject) => {
					uploadTask.on(
						'state_changed',
						null,
						(error) => reject(error),
						async () => {
							imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
							resolve();
						}
					);
				});
			}
			const product = {
				categoria,
				descripcion1,
				nombre,
				porcentaje: Number(porcentaje),
				...(categoria === 'ofertas' ? { referencia, unidades: Number(unidades) } : { costo: Number(costo), stock: Number(stock) }),
				img: imageUrl,
			};
			const ProductosRef = collection(db, 'ListadoProductos');
			const docRef = await addDoc(ProductosRef, product);
			setMessage(`Producto guardado con éxito. ID: ${docRef.id}`);
			reset();
		} catch (error) {
			setMessage('Error al guardar el producto.');
		} finally {
			setCargando(false);
		}
	};

	return (
		<FormProvider {...methods}>
			<Box sx={{ p: 2 }}>
				{message && <h3>{message}</h3>}
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl fullWidth>
						<InputLabel>Categoría</InputLabel>
						<Select {...methods.register('categoria', { required: 'Debe seleccionar una categoría' })}>
							<MenuItem value={'baños'}>Baños</MenuItem>
							{categories.map((cat) => (
								<MenuItem key={cat} value={cat}>
									{cat.charAt(0).toUpperCase() + cat.slice(1)}
								</MenuItem>
							))}
						</Select>
						{errors.categoria && <FormHelperText error>{errors.categoria.message}</FormHelperText>}
					</FormControl>

					<FormFieldsByCategory categoria={categoria} />
					<FormControl fullWidth margin='normal'>
						<Controller name='image' control={control} defaultValue={[]} render={({ field }) => <Input type='file' inputProps={{ accept: 'image/*' }} onChange={(e) => field.onChange(e.target.files)} />} />
						{errors.image && <FormHelperText error>{errors.image.message}</FormHelperText>}
					</FormControl>

					<Button type='submit' disabled={cargando}>
						Guardar
					</Button>
				</form>
			</Box>
		</FormProvider>
	);
};

export default CreateProduct;
