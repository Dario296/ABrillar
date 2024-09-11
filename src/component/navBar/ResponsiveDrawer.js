import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Main, DrawerHeader } from './NavBarStyles'; // Componentes estilizados
import AppHeader from './AppHeader'; // Componente del encabezado
import NavDrawer from './NavDrawer'; // Componente del Drawer

export default function ResponsiveDrawer() {
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppHeader open={open} handleDrawerOpen={handleDrawerOpen} />
			<NavDrawer open={open} handleDrawerClose={handleDrawerClose} />
			<Main open={open}>
				<DrawerHeader />
			</Main>
		</Box>
	);
}
