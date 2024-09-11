import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DrawerHeader } from './NavBarStyles';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AdminContext';

const drawerWidth = 240;

const NavDrawer = ({ open, handleDrawerClose }) => {
	const { logout, isAuthenticated } = useAuth();

	const adminLinks = [
		{ text: 'Ventas', to: '/' },
		{ text: 'Ventas Del Dia/Mes', to: '/ventasdeldia' },
		{ text: 'Fiados', to: '/fiados' },
		{ text: 'Lista de Fiados', to: '/listadefiados' },
		{ text: 'Editar productos', to: '/editarproductos' },
		{ text: 'Crear producto', to: '/crearproducto' },
	];

	const userLinks = [
		{ text: 'Ofertas', to: '/productos/ofertas' },
		{ text: 'Autos', to: '/productos/autos' },
		{ text: 'Bolsas', to: '/productos/bolsas' },
		{ text: 'Baños', to: '/productos/baños' },
		{ text: 'Cocina', to: '/productos/cocina' },
		{ text: 'Insecticidas', to: '/productos/insecticidas' },
		{ text: 'Otros', to: '/productos/otros' },
		{ text: 'Pisos', to: '/productos/pisos' },
		{ text: 'Ropa', to: '/productos/ropa' },
		{ text: 'Gato', to: '/productos/gato' },
		{ text: 'Perro', to: '/productos/perro' },
	];

	const renderLinks = (links) => (
		<List>
			{links.map(({ text, to }) => (
				<ListItem key={text} disablePadding>
					<ListItemButton as={Link} to={to} onClick={handleDrawerClose}>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			))}
			{isAuthenticated && (
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => {
							handleDrawerClose();
							logout();
						}}
					>
						<ListItemText>Salir</ListItemText>
					</ListItemButton>
				</ListItem>
			)}
		</List>
	);

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
			variant='persistent'
			anchor='left'
			open={open}
		>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					<CloseIcon />
				</IconButton>
			</DrawerHeader>
			{renderLinks(isAuthenticated ? adminLinks : userLinks)}
		</Drawer>
	);
};

export default NavDrawer;
