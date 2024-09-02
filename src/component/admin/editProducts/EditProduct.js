import React, { useState, useEffect } from 'react';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import app from '../../config/firebase';
import { Modal, StyledBackdrop, ModalContent } from './ModalStyles'; // Import styles from ModalStyles.js
import FormField from '../../formFields/FormFields';

const db = getFirestore(app);

const EditProduct = ({ id }) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState(''); // Estado para almacenar el mensaje de éxito/error

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setMessage(''); // Limpiar el mensaje al cerrar
	};

	const methods = useForm();
	const { handleSubmit, watch, reset } = methods;

	// Observa el valor de "categoria"
	const categoria = watch('categoria');

	useEffect(() => {
		if (id) {
			// Cargar datos del producto existente
			const loadProduct = async () => {
				try {
					const docRef = doc(db, 'ListadoProductos', id);
					const docSnap = await getDoc(docRef);

					if (docSnap.exists()) {
						const productData = docSnap.data();
						// Cargar los valores en el formulario
						for (let key in productData) {
							setValue(key, productData[key]);
						}
					} else {
						setMessage('Producto no encontrado.');
					}
				} catch (error) {
					setMessage('Error al cargar el producto.');
				}
			};

			loadProduct();
		}
	}, [id, setValue]);

	const onSubmit = async (data) => {
		try {
			const productRef = doc(db, 'ListadoProductos', id);
			await updateDoc(productRef, data); // Actualiza el documento existente
			setMessage(`Producto modificado con éxito. ID: ${id}`);
			reset();
		} catch (error) {
			setMessage('Error al modificar el producto.');
		}
	};

	return (
		<>
			<Button onClick={handleOpen} variant='contained' color='primary'>
				Editar producto
			</Button>

			<Modal aria-labelledby='unstyled-modal-title' aria-describedby='unstyled-modal-description' open={open} onClose={handleClose} slots={{ backdrop: StyledBackdrop }}>
				<ModalContent sx={{ width: 400 }}>
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
				</ModalContent>
			</Modal>
		</>
	);
};

export default EditProduct;