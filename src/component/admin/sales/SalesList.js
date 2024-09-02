import React from 'react';
import Table from 'react-bootstrap/Table';
import ProductSale from './ProductSale';
import useProductsList from '../../hooks/ProductsList';
import { CircularProgress} from '@mui/material';
import Grid from '@mui/material/Grid2';

const SalesList = () => {
	const { productsList, loading} = useProductsList();
	productsList.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordena productos por nombre

	if (loading) {
		return (
			<Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
				<CircularProgress />
			</Grid>
		);
	} // Muestra indicador de carga mientras se cargan los productos

	return (
		<>
			<h1>Ventas</h1>
			<Table striped bordered hover size='sm' responsive>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Stock</th>
						<th>Precio C/U</th>
						<th>Cantidad</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{productsList.map((product) => (
						<ProductSale key={product.ID} product={product}/>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default SalesList;
