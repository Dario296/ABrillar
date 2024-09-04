import React from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartIcon = ({ handleOpen, cartItems, quantity }) => {
    return (
        <IconButton color='inherit' onClick={handleOpen}  disabled={cartItems.length === 0}>
            <Badge badgeContent={quantity()} color="secondary">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    );
};

export default CartIcon;
