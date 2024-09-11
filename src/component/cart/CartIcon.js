import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

const CartIcon = ({ handleOpen, quantity }) => {
	return (
		<IconButton onClick={handleOpen} disabled={quantity() === 0} color='inherit'>
			<Badge badgeContent={quantity()} color='secondary'>
				<ShoppingCartIcon fontSize='large' />
			</Badge>
		</IconButton>
	);
};

export default CartIcon;
