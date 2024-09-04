import React from 'react';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const CartTable = ({ cartItems, handleRemoveFromCart, quantity, totalPrice }) => {
	return (
		<Table striped bordered hover size='sm' responsive>
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Cantidad</th>
					<th>Total</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{cartItems.map((producto) => (
					<tr key={producto.ID}>
						<td>{producto.nombre}</td>
						<td>{producto.cantidad}</td>
						<td>${producto.precio}</td>
						<td>
							<IconButton onClick={() => handleRemoveFromCart(producto.ID)}>
								<DeleteIcon />
							</IconButton>
						</td>
					</tr>
				))}
				<tr>
					<td>
						<strong>Total Productos:</strong>
					</td>
					<td>{quantity()}</td>
				</tr>
				<tr>
					<td colSpan={2}>
						<strong>Precio Total:</strong>
					</td>
					<td>${totalPrice()}</td>
				</tr>
			</tbody>
		</Table>
	);
};

export default CartTable;
