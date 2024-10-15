import React, { useState } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useUserContext } from '../../auth/AuthProvider';
import { Link } from 'react-router-dom';

const settings = ['Account', 'Dashboard'];

const CurrentAccountAvatar = ({image}) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const {user} = useUserContext()
    const { logout } = useUserContext()
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogoutClick = () => {
        setOpenLogoutDialog(true);
        handleCloseUserMenu();
    };

    const handleLogoutConfirm = () => {
        localStorage.clear(); // Clear local storage
        window.location.reload(); // Refresh the page
    };

    const handleLogoutCancel = () => {
        logout() // Close the dialog without logging out
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src={image} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
            
                <Link style={{textDecoration:'none',color:'black'}} to={`/researcher/${user.id}`}>
                    <MenuItem>
                        <Typography>Profile</Typography>
                    </MenuItem>
                </Link>

                <MenuItem onClick={handleLogoutClick}>
                    <Typography>Logout</Typography>
                </MenuItem>
            </Menu>

            {/* Logout Confirmation Dialog */}
            <Dialog
                open={openLogoutDialog}
                onClose={handleLogoutCancel}
            >
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogoutCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogoutConfirm} color="primary">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CurrentAccountAvatar;
