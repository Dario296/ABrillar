import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../../config/firebase';
import TotalForTheDay from './TotalForTheDay';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const db = getFirestore(app);

const TotalForTheDayList = () => {
	const [ventas, setVentas] = useState([]);
	const [fechaSeleccionada, setFechaSeleccionada] = useState(dayjs().format('D/M/YYYY'));

	useEffect(() => {
		const obtenerVentasDelDia = async () => {
			const q = query(collection(db, 'Ventas'), where('fecha', '==', fechaSeleccionada));
			const snapshot = await getDocs(q);
			const ventasDelDia = snapshot.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
			setVentas(ventasDelDia.sort((a, b) => a.hora.localeCompare(b.hora)));
		};

		obtenerVentasDelDia();
	}, [fechaSeleccionada]);

	const total = () => ventas.reduce((acc, venta) => acc + parseFloat(venta.total), 0);

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar value={dayjs(fechaSeleccionada, 'D/M/YYYY')} onChange={(newValue) => setFechaSeleccionada(dayjs(newValue).format('D/M/YYYY'))} />
			</LocalizationProvider>
			<div>
				<h1 className='text-center'>Total de Ventas del Día: {fechaSeleccionada} - ${total().toFixed(2)}</h1>
				<table className='table table-striped mt-4 text-center'>
					<thead>
						<tr>
							<th>Nombre del producto</th>
							<th>Cantidad vendida</th>
							<th>Monto total</th>
							<th>Hora</th>
						</tr>
					</thead>
					<tbody>
						{ventas.length > 0 ? (
							ventas.map((venta) => <TotalForTheDay key={venta.ID} productos={venta.items} hora={venta.hora} />)
						) : (
							<tr>
								<td colSpan='4'>No hay registros para mostrar</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default TotalForTheDayList;
