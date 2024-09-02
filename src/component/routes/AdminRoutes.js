import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '../admin/navBar/ResponsiveDrawer';
// import SalesList from '../component/sales/SalesList';
// import OnCreditList from '../component/onCredit/OnCreditList';
// import TotalForTheDayList from '../component/totalForTheDay/TotalForTheDayList';
// import OnCreditTotalForTheDayList from '../component/onCreditTotalForTheDay/OnCreditTotalForTheDayList';
// import TotalForTheMonth from '../component/totalForTheMonth/TotalForTheMonth';
import EditProductsList from '../admin/editProducts/EditProductsList';
import CreateProduct from '../admin/createProduct/CreateProduct';

const AdminRoutes = () => {
	return (
		<>
			<NavBar />
			<Routes>
				{/* <Route path='/' element={<SalesList />} />
				<Route path='/fiados' element={<OnCreditList />} />
				<Route path='/ventasdeldia' element={<TotalForTheDayList />} />
				<Route path='/listadefiados' element={<OnCreditTotalForTheDayList />} />
				<Route path='/totalmes' element={<TotalForTheMonth />} /> */}
				<Route path='/' element={<EditProductsList />} />
				<Route path='/editarproductos' element={<EditProductsList />} />
				<Route path='/crearproducto' element={<CreateProduct />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</>
	);
};

export default AdminRoutes;
