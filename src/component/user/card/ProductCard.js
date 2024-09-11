import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductCard({ product, stock, price, onAdd, onRemove, onAgregar, quantity }) {
	return (
		<Card className='Card'>
			<CardHeader title={product.nombre} action={`$${price}`} />
			<CardMedia component='img' height='194' image={product.img} alt={`Imagen de ${product.nombre}`} />
			<CardContent>
				<Typography>{product.descripcion1}</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{stock > 0 ? (
					<>
						<IconButton className='Restar' onClick={onRemove}>
							<RemoveIcon />
						</IconButton>
						<Typography>{quantity}</Typography>
						<IconButton className='Sumar' onClick={onAdd}>
							<AddIcon />
						</IconButton>
						<IconButton className='Añadir' onClick={onAgregar}>
							<Typography>Añadir</Typography>
							<AddShoppingCartIcon />
						</IconButton>
					</>
				) : (
					<Typography>No hay stock de este producto</Typography>
				)}
			</CardActions>
		</Card>
	);
}
