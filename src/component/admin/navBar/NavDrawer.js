import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DrawerHeader } from './NavBarStyles';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AdminContext';

const drawerWidth = 240;

const NavDrawer = ({ open, handleDrawerClose }) => {
	const { logout } = useAuth();
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
			<List>
				<ListItem disablePadding>
					<ListItemButton as={Link} to={`/`} onClick={handleDrawerClose}>
						<ListItemText>Ventas</ListItemText>
					</ListItemButton>
				</ListItem>
				{[ 'Ventas Del Dia', 'Fiados', 'Lista de Fiados', 'Total del mes', 'Editar productos', 'Crear producto'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton as={Link} to={`/${text.toLowerCase().replace(/\s/g, '')}`} onClick={handleDrawerClose}>
							<ListItemText>{text}</ListItemText>
						</ListItemButton>
					</ListItem>
				))}
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
			</List>
		</Drawer>
	);
};

export default NavDrawer;
