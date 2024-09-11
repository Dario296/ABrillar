import { Routes, Route, Navigate } from 'react-router-dom';
import CreateProduct from '../component/admin/createProduct/CreateProduct';
import TotalForTheDayList from '../component/admin/totalSales/TotalForTheDayList';
import SalesOnCreditList from '../component/admin/totalSalesOnCredit/SalesOnCreditList';
import ProductsList from '../component/admin/Products/ProductsList';

const AdminRoutes = () => (
	<>
		<Routes>
			<Route path='/' element={<ProductsList />} />
			<Route path='/fiados' element={<ProductsList />} />
			<Route path='/editarproductos' element={<ProductsList />} />
			<Route path='/crearproducto' element={<CreateProduct />} />
			<Route path='/ventasdeldia' element={<TotalForTheDayList />} />
			<Route path='/listadefiados' element={<SalesOnCreditList />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	</>
);

export default AdminRoutes;
