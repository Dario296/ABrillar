import React from 'react';
import { HashRouter } from 'react-router-dom';
import './styles/styles.scss';
import { useAuth } from './context/AdminContext';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import ResponsiveDrawer from './component/navBar/ResponsiveDrawer';
import Particle from './component/particles/particles';

function App() {
	const { isAuthenticated } = useAuth();

	return (
		<div>
			<HashRouter>
				<Particle id='particles-js' />
				<ResponsiveDrawer />
				{/* Condicional para las rutas */}
				{isAuthenticated ? <AdminRoutes /> : <UserRoutes />}
			</HashRouter>
		</div>
	);
}

export default App;
