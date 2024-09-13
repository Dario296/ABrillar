import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { CircularProgress, Fab, Box, Modal, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SalesTable from './SalesTable';
import EditProductsTable from './EditProductsTable';
import ProductsListDB from '../../../hooks/ProductsListDB';

const ProductsList = () => {
	const location = useLocation();
	const { productsList, loading } = ProductsListDB();
	const [searchTerm, setSearchTerm] = useState('');
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

	const filteredProducts = productsList.filter((product) => product.nombre.toLowerCase().includes(searchTerm));

	if (loading) {
		return (
			<Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
				<CircularProgress />
			</Grid>
		);
	}

	return (
		<>
			{location.pathname === '/editarproductos' ? <EditProductsTable products={filteredProducts} /> : <SalesTable products={filteredProducts} isFiados={location.pathname === '/fiados'} />}

			<Fab
				className='Confirmar'
				onClick={() => {
					handleOpen();
					setSearchTerm('');
				}}
				style={{ position: 'fixed', bottom: 16, right: 16 }}
			>
				<SearchIcon />
			</Fab>

			<Modal open={open} onClose={handleClose}>
				<Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24 }}>
					<TextField autoFocus fullWidth label='Buscar Producto' variant='outlined' onChange={handleSearch} placeholder='Nombre del producto' />
				</Box>
			</Modal>
		</>
	);
};

export default ProductsList;
