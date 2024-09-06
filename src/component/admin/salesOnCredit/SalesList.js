import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import OnCreditProductSale from './ProductSale';
import useProductsList from '../../hooks/ProductsList';
import { CircularProgress, Fab, TextField, Box, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid2';

const SalesList = () => {
	const { productsList, loading } = useProductsList();
	const [searchTerm, setSearchTerm] = useState('');
	const [open, setOpen] = useState(false);

	const handleOpen = () => {setSearchTerm('');setOpen(true);}
	const handleClose = () => setOpen(false);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	const filteredProducts = productsList.filter((product) =>
		product.nombre.toLowerCase().includes(searchTerm)
	);

	productsList.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordena productos por nombre

	if (loading) {
		return (
			<Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
				<CircularProgress />
			</Grid>
		);
	} // Muestra indicador de carga mientras se cargan los productos

	return (
		<>
			<h1>Fiados</h1>
			<Table striped bordered hover size='sm' responsive>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Stock</th>
						<th>Precio C/U</th>
						<th>Cantidad</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{filteredProducts.map((product) => (
						<OnCreditProductSale key={product.ID} product={product} />
					))}
				</tbody>
			</Table>

			{/* Botón flotante */}
			<Fab color="primary" aria-label="search" onClick={handleOpen} style={{ position: 'fixed', bottom: 16, right: 16 }}>
				<SearchIcon />
			</Fab>

			{/* Modal de búsqueda */}
			<Modal open={open} onClose={handleClose}>
				<Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24 }}>
					<TextField
						autoFocus
						fullWidth
						label="Buscar Producto"
						variant="outlined"
						onChange={handleSearch}
						placeholder="Nombre del producto"
					/>
				</Box>
			</Modal>
		</>
	);
};

export default SalesList;
