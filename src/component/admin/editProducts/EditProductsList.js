import React from 'react';
import useProductsList from '../../hooks/ProductsList';
import EditProduct from './EditProduct';
import { Table } from 'react-bootstrap';

const EditProductsList = () => {
	const { productsList, loading, error } = useProductsList();

	if (loading) return <div>Cargando productos...</div>;
	if (error) return <div>{error}</div>;

	return (
		<Table striped bordered hover size="sm" responsive>
			<thead>
				<tr>
					<th>Nombre</th>
					<th>costo</th>
					<th>Porcentaje</th>
					<th>Precio Final</th>
					<th>Stock</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{productsList.map((product) => (
					<tr key={product.ID}>
						<td>{product.nombre}</td>
						<td>{product.costo}</td>
						<td>{product.porcentaje}</td>
						<td>{product.costo? Math.ceil(product.costo + (product.costo * (product.porcentaje /100))): null}</td>
						<td>{product.stock? product.stock : null}</td>
						<td>
							<EditProduct id={product.ID} />
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default EditProductsList;
