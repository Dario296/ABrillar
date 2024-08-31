import { createContext, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		let isAuthenticated = JSON.parse(localStorage.getItem('admin'));
		if (isAuthenticated) {
			setIsAuthenticated(true);
		}
	}, []); // Cargar el inicio del admin desde localStorage al iniciar.

	const login = (name, pass) => {
		const admin = process.env.REACT_APP_ADMIN;
		const admin1 = process.env.REACT_APP_ADMIN1;
		const password = process.env.REACT_APP_PASSWORD;
		const password1 = process.env.REACT_APP_PASSWORD1;
		if ((name === admin || name === admin1) && (pass === password || pass === password1)) {
			localStorage.setItem('admin', true);
			setIsAuthenticated(true);
		} // Comparo que las credenciales sean iguales que las variables de entorno presentes.
		else if ((name !== admin || name !== admin1) && (pass !== password || pass !== password1)) {
			Swal.fire({
				icon: 'error',
				text: 'Credenciales incorrectas',
			}); // Muestra un mensaje de alerta si las credenciales no son válidas.
			return setIsAuthenticated(false);
		} // Detiene la ejecución del login para evitar que el usuario se autentique si las credenciales no son válidas.
		else {
			setIsAuthenticated(false);
		} // Devuelve false para evitar que el usuario se autentique si las credenciales no son válidas.
	};

	const logout = () => {
		localStorage.removeItem('admin');
		setIsAuthenticated(false);
	}; // Cierra la sección del administrador

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
