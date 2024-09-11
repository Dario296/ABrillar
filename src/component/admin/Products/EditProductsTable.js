import React from 'react';
import Table from 'react-bootstrap/Table';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

const EditProductsTable = ({ products }) => {
	return (
		<>
			<h1>Editar Productos</h1>
			<Table striped bordered hover size='sm' responsive className='text-center'>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Costo</th>
						<th>%</th>
						<th>Precio Final</th>
						<th>Stock</th>
						<th colSpan={2}>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.ID}>
							<td>{product.nombre}</td>
							<td>{product.costo}</td>
							<td>{product.porcentaje}</td>
							<td>{Math.ceil((product.costo + (product.costo * product.porcentaje) / 100) / 50) * 50 || null}</td>
							<td>{product.stock}</td>
							<td>
								<EditProduct id={product.ID} />
							</td>
							<td>
								<DeleteProduct id={product.ID} />
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default EditProductsTable;
