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
								<IconButton onClick={() => decreaseQuantity(producto.ID)}>
									<RemoveIcon />
								</IconButton>
								<span>{producto.cantidad}</span>
								<IconButton onClick={() => increaseQuantity(producto.ID)}>
									<AddIcon />
								</IconButton>
							</td>
							<td>${producto.precio}</td>
							<td>${(producto.precio * producto.cantidad)}</td>
							<td>
								<IconButton onClick={() => removeFromCart(producto.ID)}>
									<DeleteIcon />
								</IconButton>
							</td>
						</tr>
					))}
					<tr>
						<td >
							<strong>Total Productos:</strong>
						</td>
						<td colSpan={4}>{quantity()}</td>
					</tr>
					<tr>
						<td colSpan={3}>
							<strong>Precio Total:</strong>
						</td>
						<td colSpan={2}>${totalPrice()}</td>
					</tr>
				</tbody>
			</Table>
			<div className='Cart'>
				<Button onClick={clearCart}>
					Vaciar carrito
				</Button>
				<Button component={Link} to='/realizarpedido'>
					Terminar pedido
				</Button>
			</div>
		</div>
	);
};

export default Cart;
