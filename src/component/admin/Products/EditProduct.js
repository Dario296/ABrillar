import React, { useState, useEffect } from 'react';
import { Button, Box, Modal, Typography, FormControl } from '@mui/material';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import app from '../../../config/firebase';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import FormFieldsByCategory from '../../../hooks/FormFieldsByCategory';
import EditIcon from '@mui/icons-material/Edit';

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 };

const db = getFirestore(app);
const storage = getStorage(app);

const EditProduct = ({ id }) => {
	const [cargando, setCargando] = useState(false);
	const methods = useForm();
	const { handleSubmit, watch, setValue, control, reset } = methods;
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const categoria = watch('categoria'); // Observa el valor de "categoria"
	const [message, setMessage] = useState('');
	const [productImg, setProductImg] = useState('');

	useEffect(() => {
		const loadProduct = async () => {
			const docRef = doc(db, 'ListadoProductos', id);
			const docSnap = await getDoc(docRef);
			const productData = docSnap.data();
			for (let key in productData) {
				setValue(key, productData[key]);
			}
			setProductImg(productData.img || '');
		}; // Cargar datos del producto existente

		loadProduct();
	}, [id, setValue]);

	const onSubmit = async (data) => {
		setCargando(true);
		const { categoria, descripcion1, nombre, porcentaje, referencia, unidades, costo, stock } = data;
		let imageUrl = productImg;
		if (data.image && data.image[0]) {
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
		}; // Crear el objeto producto basado en la categoría

		try {
			const productRef = doc(db, 'ListadoProductos', id);
			await updateDoc(productRef, product);
			setMessage(`Producto modificado con éxito. ID: ${id}`);
			reset();
			handleClose();
		} catch (error) {
			setMessage('Error al modificar el producto.');
		} finally {
			setCargando(false);
		}
	};
	const deleteImage = async () => {
		if (productImg) {
			const imgRef = ref(storage, productImg);
			try {
				await deleteObject(imgRef);
				setProductImg(''); // Eliminar la referencia de la imagen
				const productRef = doc(db, 'ListadoProductos', id);
				await updateDoc(productRef, { img: '' }); // Eliminar la URL de la imagen en Firestore
				setMessage('Imagen eliminada con éxito.');
			} catch (error) {
				setMessage('Error al eliminar la imagen.');
			}
		}
	};

	return (
		<div>
			<Button onClick={handleOpen}>
				<EditIcon />
			</Button>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<FormProvider {...methods}>
						<div>
							{message && <h3>{message}</h3>}
							<form onSubmit={handleSubmit(onSubmit)}>
								<FormFieldsByCategory categoria={categoria} />
								<FormControl fullWidth margin='normal'>
									<Controller name='image' control={control} defaultValue={[]} render={({ field }) => <input type='file' onChange={(e) => field.onChange(e.target.files)} accept='image/*' />} />
								</FormControl>

								{productImg && (
									<div>
										<img src={productImg} alt='Imagen del producto' style={{ maxWidth: '100px', marginBottom: '10px' }} />
										<Button onClick={deleteImage} variant='contained' color='secondary'>
											Eliminar Imagen
										</Button>
									</div>
								)}

								<Button type='submit' disabled={cargando}>
									Guardar
								</Button>
								<Button type='buton' onClick={handleClose}>
									Salir
								</Button>
							</form>
						</div>
					</FormProvider>
				</Box>
			</Modal>
			{message && (
				<Typography variant='subtitle1' color={message.includes('éxito') ? 'green' : 'red'}>
					{message}
				</Typography>
			)}
		</div>
	);
};

export default EditProduct;
