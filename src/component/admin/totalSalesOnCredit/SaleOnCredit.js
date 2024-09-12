import { collection, deleteDoc, doc, getFirestore, addDoc } from 'firebase/firestore';
import app from '../../../config/firebase';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useState } from 'react';

const db = getFirestore(app);

const SaleOnCredit = ({ total, fecha, hora, nombre, id, venta, recargar, setRecargar, setCargando }) => {
	const [isProcessing, setIsProcessing] = useState(false); // Estado para bloquear el botón durante el proceso
	const ventaRef = collection(db, 'Ventas');

	const eliminarFiados = async () => {
		setCargando('Espere por favor...');
		setIsProcessing(true); // Bloquea el botón
		try {
			const ven = {
				fecha: fecha,
				hora: hora,
				items: venta.items,
				total: total,
			};
			await addDoc(ventaRef, ven);
			await deleteDoc(doc(db, 'Fiados', id));
			setRecargar(!recargar);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				text: 'Hubo un problema al procesar el pago.',
			});
		} finally {
			setIsProcessing(false);
			setCargando(false);
		}
	};

	return (
		<tr>
			<td>{nombre}</td>
			<td>{total}</td>
			<td>{fecha}</td>
			<td>{hora}</td>
			<td>
				<Button
					className='Confirmar'
					onClick={eliminarFiados}
					disabled={isProcessing} // Deshabilita el botón mientras se procesa el pago
				>
					Pago
				</Button>
			</td>
		</tr>
	);
};

export default SaleOnCredit;
