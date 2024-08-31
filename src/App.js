import { BrowserRouter } from 'react-router-dom';
import './styles/styles.scss';
import { useAuth } from './component/context/AdminContext';
// import AdminRoutes from './component/routes/AdminRoutes';
import UserRoutes from './component/routes/UserRoutes';

function App() {
	const { isAuthenticated } = useAuth();

	return (
		<div>
			<BrowserRouter>{isAuthenticated ? //<AdminRoutes /> 
			<div>hola</div>: <UserRoutes />}</BrowserRouter>
		</div>
	);
}

export default App;
