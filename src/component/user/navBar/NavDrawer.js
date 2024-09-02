import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DrawerHeader } from './NavBarStyles';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const NavDrawer = ({ open, handleDrawerClose }) => {
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
				{['Ofertas', 'Autos', 'Baños', 'Bolsas', 'Cocina', 'Insecticidas', 'Otros', 'Pisos', 'Ropa', 'Gato', 'Perro'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton as={Link} to={`/productos/${text.toLowerCase().replace(/\s/g, '')}`} onClick={handleDrawerClose}>
							<ListItemText>{text}</ListItemText>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default NavDrawer;
