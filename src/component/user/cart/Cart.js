import React from 'react';
import { IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCartContext } from '../../context/CartContext';

const Cart = () => {
	const { cartItems, quantity, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice, clearCart } = useCartContext();

	cartItems.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar los productos por nombre

	return (
		<div>
			<Table striped bordered hover size='sm' responsive>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Cantidad</th>
						<th>Precio C/U</th>
						<th>Total</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map((producto) => (
						<tr key={producto.ID}>
							<td>{producto.nombre}</td>
							<td>
								<IconButton onClick={() => decreaseQuantity(producto.ID)} aria-label='Disminuir cantidad'>
									<RemoveIcon />
								</IconButton>
								{producto.cantidad}
								<IconButton onClick={() => increaseQuantity(producto.ID)} aria-label='Aumentar cantidad'>
									<AddIcon />
								</IconButton>
							</td>
							<td>{producto.precio.toFixed(2)}</td>
							<td>{(producto.precio * producto.cantidad).toFixed(2)}</td>
							<td>
								<IconButton onClick={() => removeFromCart(producto.ID)} aria-label='Eliminar producto'>
									<DeleteIcon />
								</IconButton>
							</td>
						</tr>
					))}
					<tr>
						<td colSpan={3} style={{ textAlign: 'right' }}>
							<strong>Total Productos:</strong>
						</td>
						<td>{quantity()}</td>
					</tr>
					<tr>
						<td colSpan={3} style={{ textAlign: 'right' }}>
							<strong>Precio Total:</strong>
						</td>
						<td>{totalPrice().toFixed(2)}</td>
					</tr>
				</tbody>
			</Table>
			<div className='Cart'>
				<Button variant='contained' color='secondary' onClick={clearCart}>
					Vaciar carrito
				</Button>
				<Button variant='contained' color='primary' component={Link} to='/realizarpedido'>
					Terminar pedido
				</Button>
			</div>
		</div>
	);
};

export default Cart;
