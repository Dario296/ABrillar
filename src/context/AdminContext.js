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
	}, []);

	const login = (name, pass) => {
		const admin = process.env.REACT_APP_ADMIN;
		const admin1 = process.env.REACT_APP_ADMIN1;
		const password = process.env.REACT_APP_PASSWORD;
		const password1 = process.env.REACT_APP_PASSWORD1;
		if ((name === admin && pass === password) || (name === admin1 && pass === password1)) {
			localStorage.setItem('admin', true);
			setIsAuthenticated(true);
		} else if ((name !== admin || name !== admin1) && (pass !== password || pass !== password1)) {
			Swal.fire({
				icon: 'error',
				text: 'Credenciales incorrectas',
			});
			return setIsAuthenticated(false);
		} else {
			setIsAuthenticated(false);
		}
	};

	const logout = () => {
		localStorage.removeItem('admin');
		setIsAuthenticated(false);
	};

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
