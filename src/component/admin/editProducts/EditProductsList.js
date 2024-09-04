import React from 'react';
import useProductsList from '../../hooks/ProductsList';
import EditProduct from './EditProduct';
import { Table } from 'react-bootstrap';
import { CircularProgress} from '@mui/material';
import Grid from '@mui/material/Grid2';
import DeleteProduct from "./DeleteProduct";

const EditProductsList = () => {
	const { productsList, loading } = useProductsList();
	productsList.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordena productos por nombre

	if (loading) {
		return (
			<Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
				<CircularProgress />
			</Grid>
		);
	} // Muestra indicador de carga mientras se cargan los productos

	return (
		<Table striped bordered hover size="sm" responsive>
			<thead>
				<tr>
					<th>Nombre</th>
					<th>costo</th>
					<th>Porcentaje</th>
					<th>Precio Final</th>
					<th>Stock</th>
					<th colSpan={2}>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{productsList.map((product) => (
					<tr key={product.ID}>
						<td>{product.nombre}</td>
						<td>{product.costo}</td>
						<td>{product.porcentaje}</td>
						<td>{product.costo? Math.ceil((product.costo + (product.costo * product.porcentaje)/100)/50)*50: null}</td>
						<td>{product.stock? product.stock : null}</td>
						<td>
							<EditProduct id={product.ID} />
						</td>
						<td>
							<DeleteProduct id={product.ID}/>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default EditProductsList;
