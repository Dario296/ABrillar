import { Routes, Route, Navigate } from 'react-router-dom';
import Particle from '../user/particles/particles';
import NavBar from '../user/navBar/ResponsiveDrawer';
import HeroSec from '../user/hero/HeroSec';
import Cart from '../user/cart/Cart';
import OrderForm from '../user/orderForm/OrderForm';
import ProductsListContainer from '../user/productsList/ProductsListContainer';
import Login from '../user/login/Login';
import WhatsappButton from '../user/whatsapp/WhatsappButton';
import { useCartContext } from '../context/CartContext';

const UserRoutes = () => {
	const { quantity } = useCartContext();

	return (
		<>
			<Particle id='particles-js' />
			<NavBar />
			<Routes>
				{quantity() > 0 && (
					<>
						<Route path='/carrito' element={<Cart />} />
						<Route path='/realizarpedido' element={<OrderForm />} />
					</>
				)}
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
