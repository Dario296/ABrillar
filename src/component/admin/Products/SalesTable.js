import React from 'react';
import Table from 'react-bootstrap/Table';
import ProductSale from './ProductSale';

const SalesTable = ({ products, isFiados }) => {
	return (
		<>
			<h1>{isFiados ? 'Fiados' : 'Ventas'}</h1>
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
					{products.map((product) => (
						<ProductSale key={product.ID} product={product} />
					))}
				</tbody>
			</Table>
		</>
	);
};

export default SalesTable;
