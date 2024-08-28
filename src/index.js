import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './component/context/AdminContext';
import { CartProvider } from './component/context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<CartProvider>
				<App />
			</CartProvider>
		</AuthProvider>
	</React.StrictMode>
);
