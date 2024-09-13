import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useCartContext } from '../../../context/CartContext';
import app from '../../../config/firebase';
import ProductCard from './ProductCard';

const db = getFirestore(app);

const calculatePrice = (cost, porcentaje, unidades = 1) => Math.ceil((cost * unidades + (cost * unidades * porcentaje) / 100) / 50) * 50;
export default function ViewCardOfert({ product }) {
	const [productRef, setProductRef] = useState(null);
	const [quantity, setQuantity] = useState(0);
	const { pedidos } = useCartContext();
	const cartData = pedidos;

	useEffect(() => {
		const fetchProductRef = async () => {
			try {
				const productDoc = await getDoc(doc(db, 'ListadoProductos', product.referencia));
				setProductRef(productDoc.data());
			} catch (err) {
				console.error('Error fetching product reference:', err);
			}
		};

		fetchProductRef();
	}, [product.referencia]);

	if (!productRef) return null;

	const stockAvailable = Math.floor(productRef.stock / product.unidades);
	const price = calculatePrice(productRef.costo, product.porcentaje, product.unidades);

	const handleAdd = () => quantity < stockAvailable && setQuantity(quantity + 1);
	const handleRemove = () => quantity > 0 && setQuantity(quantity - 1);
	const handleAgregar = () => {
		if (quantity > 0) {
			const productoAgregar = {
				ID: product.ID,
				nombre: product.nombre,
				precio: price,
				cantidad: quantity,
				stock: stockAvailable,
			};
			cartData.addToCart(productoAgregar);
			setQuantity(0);
		}
	};

	return <ProductCard product={product} stock={stockAvailable} price={price} onAdd={handleAdd} onRemove={handleRemove} onAgregar={handleAgregar} quantity={quantity} />;
}
