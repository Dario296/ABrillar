import React, { useState } from 'react';
import { Button, Box, Modal, Typography } from '@mui/material';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import app from '../../../config/firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCartContext } from "../../../context/CartContext";

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 };

const db = getFirestore(app);

const DeleteProduct = ({ id }) => {
	const { setShouldReload } = useCartContext();
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// Función para eliminar el producto
	const deleteProduct = async () => {
		try {
			const productRef = doc(db, 'ListadoProductos', id);
			await deleteDoc(productRef); // Elimina el producto
			setMessage(`Producto eliminado con éxito. ID: ${id}`);
			handleClose(); // Cierra el modal después de eliminar el producto
		} catch (error) {
			setMessage('Error al eliminar el producto.');
		} finally {
			setTimeout(() => {
                setShouldReload(true);
            }, 1500);
		}
	};

	return (
		<div>
			<Button onClick={handleOpen}>
				<DeleteIcon />
			</Button>
			<Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Typography>¿Estás seguro de que quieres eliminar este producto?</Typography>
					<Typography>Esta acción no se puede deshacer.</Typography>

					<Box mt={3} display='flex' justifyContent='space-between'>
						<Button onClick={deleteProduct}>Eliminar</Button>
						<Button onClick={handleClose}>Cancelar</Button>
					</Box>
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

export default DeleteProduct;
