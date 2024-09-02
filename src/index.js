import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './component/context/AdminContext';
import { CartProvider } from './component/context/CartContext';
import { CartAdminProvider } from './component/context/CartAdminContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<CartProvider>
				<CartAdminProvider>
					<App />
				</CartAdminProvider>
			</CartProvider>
		</AuthProvider>
	</React.StrictMode>
);
