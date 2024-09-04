import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Cart from "../cart/Cart";

const AppHeader = ({ open, handleDrawerOpen }) => {

	return (
		<AppBar className='NavBar' position='fixed' open={open}>
			<Toolbar className='Flex'>
				<IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' sx={{ mr: 2, ...(open && { display: 'none' }) }}>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' noWrap component={Link} to='/'>
					***ABrillar***
				</Typography>
				<Cart/>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
