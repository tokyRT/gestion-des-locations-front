import React from 'react';
import * as styles from '../../styles/variables';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export default function UserAvatarMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <>
            <Button
                id="avatar-button"
                aria-controls={open ? 'avatar-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    borderRadius: '30px',
                    padding: '0',
                    minWidth: 'initial'
                }}
            >
                <Avatar sx={{
                    background: styles.colors.drawerBg
                }}>JM</Avatar>
            </Button>
            <Menu
                id="avatar-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'avatar-button'
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </>
    );
}
