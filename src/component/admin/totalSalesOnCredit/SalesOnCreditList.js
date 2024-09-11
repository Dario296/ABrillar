import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../../../config/firebase';
import SaleOnCredit from './SaleOnCredit';

const db = getFirestore(app);

const SalesOnCreditList = () => {
	const [ventas, setVentas] = useState([]);
	const [recargar, setRecargar] = useState(true);
	const [cargando, setCargando] = useState(false);

	useEffect(() => {
		const obtenerFiados = async () => {
			setCargando(true);
			const ProductosRef = collection(db, 'Fiados');
			const q = query(ProductosRef);
			const resp = await getDocs(q);
			const ventasDelDia = resp.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));

			ventasDelDia.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
			setVentas(ventasDelDia);
			setCargando(false);
		};

		obtenerFiados();
	}, [recargar]);

	return (
		<>
			{!cargando ? (
				<div>
					<h1 className='text-center'>Fiados</h1>
					<table className='table table-striped mt-4 text-center'>
						<thead>
							<tr>
								<th scope='col'>Persona</th>
								<th scope='col'>Monto total</th>
								<th scope='col'>Fecha</th>
								<th scope='col'>Hora</th>
								<th scope='col'>Acción</th>
							</tr>
						</thead>
						<tbody>
							{ventas.length > 0 ? (
								ventas.map((vta) => <SaleOnCredit key={vta.ID} id={vta.ID} venta={vta} total={vta.total} fecha={vta.fecha} hora={vta.hora} nombre={vta.nombre} recargar={recargar} setRecargar={setRecargar} setCargando={setCargando} />)
							) : (
								<tr>
									<td colSpan='5'>No hay registros para mostrar</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			) : (
				<h1 className='text-center'>Cargando...</h1>
			)}
		</>
	);
};

export default SalesOnCreditList;
