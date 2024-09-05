import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../../config/firebase';

const db = getFirestore(app);

const TotalForTheMonth = () => {
	const [ventas, setVentas] = useState([]);

	useEffect(() => {
		const fechaActual = new Date();
		const mesActual = fechaActual.getMonth() + 1;
		const anioActual = fechaActual.getFullYear();

		const obtenerVentasDelMes = async () => {
			const q = query(collection(db, 'Ventas'));
			const snapshot = await getDocs(q);
			

			// Filtrar ventas que pertenezcan al mes y año actual
			const ventasDelMes = snapshot.docs
				.map((doc) => ({ ID: doc.id, ...doc.data() }))
				.filter((venta) => {
					const [ , mes, anio] = venta.fecha.split('/');
					return parseInt(mes) === mesActual && parseInt(anio) === anioActual;
				});
				

			setVentas(ventasDelMes);
		};

		obtenerVentasDelMes();
	}, []);

	const total = () => ventas.reduce((acc, venta) => acc + parseFloat(venta.total), 0);

	return (
		<div>
			<h1 className='text-center'>Total de Ventas del Mes: ${total().toFixed(2)}</h1>
		</div>
	);
};

export default TotalForTheMonth;
