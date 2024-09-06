import { HashRouter } from 'react-router-dom';
import './styles/styles.scss';
import { useAuth } from './component/context/AdminContext';
import AdminRoutes from './component/routes/AdminRoutes';
import UserRoutes from './component/routes/UserRoutes';

function App() {
	const { isAuthenticated } = useAuth();

	return (
		<div>
			<HashRouter>{isAuthenticated ? <AdminRoutes /> : <UserRoutes />}</HashRouter>
		</div>
	);
}

export default App;
