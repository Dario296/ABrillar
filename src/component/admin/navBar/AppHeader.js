import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AdminContext';

const AppHeader = ({ open, handleDrawerOpen }) => {
	const { logout } = useAuth();

	return (
		<AppBar className='NavBar' position='fixed' open={open}>
			<Toolbar className='Flex'>
				<IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' sx={{ mr: 2, ...(open && { display: 'none' }) }}>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' noWrap component={Link} to='/' onClick={handleDrawerOpen}>
					***ABrillar***
				</Typography>
				<IconButton color='inherit' onClick={logout}>
					Salir
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
