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
						<th>$ C/U</th>
						<th>Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map((producto) => (
						<tr key={producto.ID}>
							<td>{producto.nombre}</td>
							<td>
								<IconButton className="Restar" onClick={() => decreaseQuantity(producto.ID)}>
									<RemoveIcon />
								</IconButton>
								<span>{producto.cantidad}</span>
								<IconButton className="Sumar" onClick={() => increaseQuantity(producto.ID)}>
									<AddIcon />
								</IconButton>
							</td>
							<td>${producto.precio}</td>
							<td>${(producto.precio * producto.cantidad)}</td>
							<td>
								<IconButton className="Eliminar" onClick={() => removeFromCart(producto.ID)}>
									<DeleteIcon />
								</IconButton>
							</td>
						</tr>
					))}
					<tr>
						<td >
							<strong>T.Productos:</strong>
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
				<Button className="ConfirmaPedido" component={Link} to='/realizarpedido'>
					Terminar pedido
				</Button>
				<Button className="VaciarCarrito" onClick={clearCart}>
					Vaciar carrito
				</Button>
			</div>
		</div>
	);
};

export default Cart;
