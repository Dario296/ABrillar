import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import app from '../../../config/firebase';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useCartContext } from '../../../context/CartContext';
import { useLocation } from 'react-router-dom';

const db = getFirestore(app);

const ProductSale = ({ product }) => {
	const location = useLocation();
	const [quantity, setQuantity] = useState('');
	const [quantityMoney, setQuantityMoney] = useState('');
	const [productRef, setProductRef] = useState([]);
	const { ventas, fiados } = useCartContext();
	const cartData = location.pathname === '/fiados' ? fiados : ventas;

	useEffect(() => {
		if (product.referencia) {
			const ProducRefDB = doc(db, 'ListadoProductos', product.referencia);
			getDoc(ProducRefDB).then((resp) => {
				const produc = resp.data();
				setProductRef(produc);
			});
		}
	}, [product.referencia]);

	const cost = product.referencia ? productRef.costo * product.unidades : product.costo;
	const porcent = product.porcentaje;
	const price = Math.ceil((cost + (cost * porcent) / 100) / 50) * 50;
	const stockDisponible = product.referencia ? Math.floor(productRef.stock / product.unidades) : product.stock.toFixed(2);

	const handleChangeQuantity = (e) => {
		const value = Number(e.target.value);
		const roundedQuantity = parseFloat(value.toFixed(2));
		setQuantity(roundedQuantity);
		setQuantityMoney(parseFloat((roundedQuantity * price).toFixed(2)));
	};

	const handleChangeQuantityMoney = (e) => {
		const value = Number(e.target.value);
		const result = parseFloat((value / price).toFixed(2));
		setQuantity(result);
		setQuantityMoney(parseFloat(value.toFixed(2)));
	};

	const productSale = {
		ID: product.ID,
		nombre: product.nombre,
		cantidad: quantity,
		precio: quantityMoney,
		IDRef: product.referencia || null,
		unidades: product.unidades || null,
	};

	const isAgregarDisabled = () => {
		return stockDisponible === 0 || quantity <= 0 || quantityMoney <= 0 || stockDisponible < quantity;
	};

	return (
		<tr>
			<td>{product.nombre}</td>
			<td>{stockDisponible}</td>
			<td>{price}</td>
			<td>
				<input className='InputVentas' onChange={handleChangeQuantity} type='number' name='cantidad' value={quantity} />
			</td>
			<td>
				<input className='InputVentas' onChange={handleChangeQuantityMoney} type='number' name='precio' value={quantityMoney} disabled={product.categoria === 'ofertas'} />
			</td>
			<Button
				className='Confirmar'
				onClick={() => {
					cartData.addToCart(productSale);
					setQuantity('');
					setQuantityMoney('');
				}}
				disabled={isAgregarDisabled()}
			>
				<AddShoppingCartIcon />
			</Button>
		</tr>
	);
};

export default ProductSale;
