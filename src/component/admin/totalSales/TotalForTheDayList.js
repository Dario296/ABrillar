import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../../../config/firebase';
import dayjs from 'dayjs';
import TotalForTheDay from './TotalForTheDay';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const db = getFirestore(app);

const TotalForThePeriod = () => {
	const [ventas, setVentas] = useState([]);
	const [fechaSeleccionada, setFechaSeleccionada] = useState(dayjs().format('D/M/YYYY'));
	const [mesSeleccionado, setMesSeleccionado] = useState(dayjs().format('M/YYYY'));
	const [view, setView] = useState('day'); // Cambia entre 'day' y 'month'

	// Función para obtener ventas del día seleccionado
	const obtenerVentasDelDia = async (fecha) => {
		const q = query(collection(db, 'Ventas'), where('fecha', '==', fecha));
		const snapshot = await getDocs(q);
		const ventasDelDia = snapshot.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
		setVentas(ventasDelDia.sort((a, b) => a.hora.localeCompare(b.hora)));
	};

	// Función para obtener ventas del mes seleccionado
	const obtenerVentasDelMes = async (mes, anio) => {
		const q = query(collection(db, 'Ventas'));
		const snapshot = await getDocs(q);
		const ventasDelMes = snapshot.docs
			.map((doc) => ({ ID: doc.id, ...doc.data() }))
			.filter((venta) => {
				const [, mesVenta, anioVenta] = venta.fecha.split('/');
				return parseInt(mesVenta) === parseInt(mes) && parseInt(anioVenta) === parseInt(anio);
			});
		setVentas(ventasDelMes);
	};

	// useEffect para obtener las ventas según la vista seleccionada
	useEffect(() => {
		if (view === 'day') {
			obtenerVentasDelDia(fechaSeleccionada);
		} else if (view === 'month') {
			const [mes, anio] = mesSeleccionado.split('/');
			obtenerVentasDelMes(mes, anio);
		}
	}, [view, fechaSeleccionada, mesSeleccionado]);

	const total = () => ventas.reduce((acc, venta) => acc + parseFloat(venta.total), 0);

	return (
		<div>
			{/* Selector de vista (día o mes) */}
			<ToggleButtonGroup className='DiaMes' value={view} exclusive onChange={(e, newView) => setView(newView)} aria-label='Selector de vista'>
				<ToggleButton value='day'>Día</ToggleButton>
				<ToggleButton value='month'>Mes</ToggleButton>
			</ToggleButtonGroup>

			{/* Mostrar calendario o selector de mes dependiendo de la vista */}
			<div className='SeleccionarDiaMes'>
				<LocalizationProvider dateAdapter={AdapterDayjs}>{view === 'day' ? <DateCalendar value={dayjs(fechaSeleccionada, 'D/M/YYYY')} onChange={(newValue) => setFechaSeleccionada(dayjs(newValue).format('D/M/YYYY'))} /> : <DatePicker className="Mes" views={['year', 'month']} value={dayjs(mesSeleccionado, 'M/YYYY')} onChange={(newValue) => setMesSeleccionado(dayjs(newValue).format('M/YYYY'))} label='Selecciona Mes' format='MMMM YYYY' />}</LocalizationProvider>
			</div>

			<h1 className='text-center'>{view === 'day' ? `Total de Ventas del Día: ${fechaSeleccionada} - $${total().toFixed(2)}` : `Total de Ventas del Mes: ${mesSeleccionado} - $${total().toFixed(2)}`}</h1>

			{/* Tabla de ventas */}
			{view === 'day' ? (
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
			) : null}
		</div>
	);
};

export default TotalForThePeriod;
