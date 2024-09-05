import { collection, deleteDoc, doc, getFirestore, addDoc } from "firebase/firestore";
import app from "../../config/firebase";
import { Button } from "@mui/material";

const db = getFirestore(app);

const SaleOnCredit = ({ total, fecha, hora, nombre, id, venta, recargar, setRecargar, setCargando }) => {
	
	const ventaRef = collection(db, 'Ventas');
	
	const eliminarFiados = async () => {
		if (window.confirm("¿Está seguro de que desea procesar este pago?")) {
			setCargando('Espere por favor...');
			try {
				const ven = {
					fecha: fecha,
					hora: hora,
					items: venta.items,
					total: total,
				};

				// Agregar la venta a la colección 'Ventas' y luego eliminarla de 'Fiados'
				await addDoc(ventaRef, ven);
				await deleteDoc(doc(db, 'Fiados', id));

				setRecargar(!recargar);
				alert('Pago procesado con éxito');
			} catch (error) {
				console.error('Error al procesar el pago: ', error);
				alert('Hubo un problema al procesar el pago.');
			} finally {
				setCargando(false);
			}
		}
	};

	return (
		<tr>
			<td>{nombre}</td>
			<td>{total}</td>
			<td>{fecha}</td>
			<td>{hora}</td>
			<td><Button onClick={eliminarFiados}>Pago</Button></td>
		</tr>
	);
};

export default SaleOnCredit;
