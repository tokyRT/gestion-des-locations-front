import React from 'react';
import * as styles from '../../styles/variables';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'

export default function DrawerToggler(props) {
    return (
        <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{
                mr: 2,
                display: { lg: 'none' },
                color: styles.colors.aeeniMain
            }}
        >
            <MenuIcon />
        </IconButton>
    );
}
