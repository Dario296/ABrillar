import { createContext, useContext, useEffect, useState } from 'react';

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
		if ((name === admin || name === admin1) && (pass === password || pass === password1)) {
			localStorage.setItem('admin', true);
			setIsAuthenticated(true);
		}
	};

	const logout = () => {
		localStorage.removeItem('admin');
		setIsAuthenticated(false);
	};

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

