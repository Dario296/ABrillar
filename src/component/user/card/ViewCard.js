import React, { useState } from 'react';
import { useCartContext } from '../../../context/CartContext';
import ProductCard from './ProductCard';

// Función para calcular precio redondeado
const calculatePrice = (cost, porcentaje, unidades = 1) => Math.ceil((cost * unidades + (cost * unidades * porcentaje) / 100) / 50) * 50;

// Componente para productos sin oferta
export default function ViewCard({ product }) {
	const [quantity, setQuantity] = useState(0);
	const { pedidos } = useCartContext();
	const cartData = pedidos;

	const price = calculatePrice(product.costo, product.porcentaje);

	const handleAdd = () => quantity < product.stock && setQuantity(quantity + 1);
	const handleRemove = () => quantity > 0 && setQuantity(quantity - 1);
	const handleAgregar = () => {
		if (quantity > 0) {
			const productToAdd = {
				ID: product.ID,
				nombre: product.nombre,
				precio: price,
				cantidad: quantity,
				stock: product.stock,
			};
			cartData.addToCart(productToAdd);
			setQuantity(0);
		}
	};

	return <ProductCard product={product} stock={product.stock} price={price} onAdd={handleAdd} onRemove={handleRemove} onAgregar={handleAgregar} quantity={quantity} />;
}
