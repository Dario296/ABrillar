import React from 'react';
import useProductsList from '../productsList/ProductsList';
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
					<th>Precio</th>
					<th>Stock</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{productsList.map((product) => (
					<tr key={product.ID}>
						<td>{product.nombre}</td>
						<td>${product.precio}</td>
						<td>{product.stock}</td>
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
