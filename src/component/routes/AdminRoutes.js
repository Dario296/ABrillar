import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '../admin/navBar/ResponsiveDrawer';
import OnCreditList from '../admin/salesOnCredit/SalesList';
import EditProductsList from '../admin/editProducts/EditProductsList';
import CreateProduct from '../admin/createProduct/CreateProduct';
import SalesList from "../admin/sales/SalesList";
import TotalForTheDayList from "../admin/totalSales/TotalForTheDayList";
import TotalForTheMonth from "../admin/totalSales/TotalForTheMonth";
import SalesOnCreditList from "../admin/totalSalesOnCredit/SalesOnCreditList";

const AdminRoutes = () => {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path='/' element={<SalesList />} />
				<Route path='/fiados' element={<OnCreditList />} />
				<Route path='/ventasdeldia' element={<TotalForTheDayList />} />
				<Route path='/listadefiados' element={<SalesOnCreditList />} />
				<Route path='/totaldelmes' element={<TotalForTheMonth />} />
				<Route path='/editarproductos' element={<EditProductsList />} />
				<Route path='/crearproducto' element={<CreateProduct />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</>
	);
};

export default AdminRoutes;
