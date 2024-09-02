import React, { useState, useEffect } from 'react';
import { Button, Box, Modal } from '@mui/material';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import app from '../../config/firebase';
import { useForm, FormProvider } from 'react-hook-form';
import FormFieldsByCategory from '../../hooks/FormFieldsByCategory';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 };

const db = getFirestore(app);

const EditProduct = ({ id }) => {
	const methods = useForm();
	const { handleSubmit, watch, setValue } = methods;
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const categoria = watch('categoria'); // Observa el valor de "categoria"
	const [message, setMessage] = useState('');

	useEffect(() => {
		const loadProduct = async () => {
			const docRef = doc(db, 'ListadoProductos', id);
			const docSnap = await getDoc(docRef);
			const productData = docSnap.data();
			for (let key in productData) {
				setValue(key, productData[key]);
			}
		}; // Cargar datos del producto existente

		loadProduct();
	}, [id, setValue]);

	const onSubmit = async (data) => {
		const { categoria, descripcion1, nombre, porcentaje, referencia, unidades, costo, stock } = data;

		const product = {
			categoria,
			descripcion1,
			nombre,
			porcentaje: Number(porcentaje),
			...(categoria === 'ofertas' ? { referencia, unidades: Number(unidades) } : { costo: Number(costo), stock: Number(stock) }),
		}; // Crear el objeto producto basado en la categoría

		try {
			const productRef = doc(db, 'ListadoProductos', id);
			await updateDoc(productRef, product);
			setMessage(`Producto modificado con éxito. ID: ${id}`);
		} catch (error) {
			setMessage('Error al modificar el producto.');
		}
	};

	return (
		<div>
			<Button onClick={handleOpen} variant='contained' color='primary'>
				Editar producto
			</Button>
			<Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<FormProvider {...methods}>
						<div>
							{message && <h3>{message}</h3>}
							<form onSubmit={handleSubmit(onSubmit)}>
								<FormFieldsByCategory categoria={categoria} />

								<Button type='submit' variant='contained' color='primary'>
									Guardar
								</Button>
								<Button type='buton' variant='contained' onClick={handleClose}>
									Salir
								</Button>
							</form>
						</div>
					</FormProvider>
				</Box>
			</Modal>
		</div>
	);
};

export default EditProduct;
