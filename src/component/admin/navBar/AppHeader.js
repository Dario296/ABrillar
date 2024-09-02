import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useCartAdminContext } from '../../context/CartAdminContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AppHeader = ({ open, handleDrawerOpen }) => {
	const { quantity } = useCartAdminContext();

	return (
		<AppBar className='NavBar' position='fixed' open={open}>
			<Toolbar className='Flex'>
				<IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' sx={{ mr: 2, ...(open && { display: 'none' }) }}>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' noWrap component={Link} to='/' onClick={handleDrawerOpen}>
					***ABrillar***
				</Typography>
				<IconButton color='inherit' component={Link} to='/carrito'>
					<Badge badgeContent={quantity()}>
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
