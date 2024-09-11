import { Routes, Route, Navigate } from 'react-router-dom';
import HeroSec from '../component/user/hero/HeroSec';
import OrderForm from '../component/user/orderForm/OrderForm';
import ProductsListContainer from '../component/user/productsList/ProductsListContainer';
import Login from '../component/user/login/Login';
import WhatsappButton from '../component/user/whatsapp/WhatsappButton';
import { useCartContext } from '../context/CartContext';

const UserRoutes = () => {
	const { pedidos } = useCartContext();
	const cartData = pedidos;

	return (
		<>
			<Routes>
				{cartData.quantity() > 0 && <Route path='/realizarpedido' element={<OrderForm />} />}
				<Route path='/' element={<HeroSec />} />
				<Route path='/productos/:categoria' element={<ProductsListContainer />} />
				<Route path='/admin' element={<Login />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
			<WhatsappButton />
		</>
	);
};

export default UserRoutes;
