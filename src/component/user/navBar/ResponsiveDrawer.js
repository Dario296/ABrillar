import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer, CssBaseline, Toolbar, List, Typography, IconButton, ListItem, ListItemButton, ListItemText, Badge } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

const navItems = [
	{ text: 'Ofertas', to: '/productos/ofertas' },
	{ text: 'Autos', to: '/productos/autos' },
	{ text: 'Baños', to: '/productos/baños' },
	{ text: 'Bolsas', to: '/productos/bolsas' },
	{ text: 'Cocina', to: '/productos/cocina' },
	{ text: 'Insecticidas', to: '/productos/insecticidas' },
	{ text: 'Otros', to: '/productos/otros' },
	{ text: 'Pisos', to: '/productos/pisos' },
	{ text: 'Ropa', to: '/productos/ropa' },
	{ text: 'Gato', to: '/productos/gato' },
	{ text: 'Perro', to: '/productos/perro' },
];

export default function PersistentDrawerLeft() {
	const [open, setOpen] = React.useState(false);
	const { quantity } = useCartContext();

	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar className='NavBar' position='fixed' open={open}>
				<Toolbar className='Flex'>
					<IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' sx={{ mr: 2, ...(open && { display: 'none' }) }}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component={Link} to='/' onClick={handleDrawerClose}>
						***ABrillar***
					</Typography>
					<div>
						{quantity() > 0 && (
							<IconButton color='inherit' component={Link} to='/carrito'>
								<Badge badgeContent={quantity()}>
									<ShoppingCartIcon />
								</Badge>
							</IconButton>
						)}
					</div>
				</Toolbar>
			</AppBar>
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
					{navItems.map((item, index) => (
						<ListItem key={index} disablePadding>
							<ListItemButton component={Link} to={item.to} onClick={handleDrawerClose}>
								<ListItemText>{item.text}</ListItemText>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
			</Main>
		</Box>
	);
}
