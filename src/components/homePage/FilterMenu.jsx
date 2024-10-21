import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Paper, Stack } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../auth/AuthProvider';
import { DeveloperMode, Explore } from '@mui/icons-material';

function FilterMenu() {
    const { user } = useUserContext()
    return (
        <Paper elevation={3} sx={{ padding: 2, borderRadius: '10px' }}>
            <List>
                <Link style={{ textDecoration: "none" }} to={`/`}>
                    <ListItem button>
                        <ListItemIcon sx={{ color: 'primary.main' }}>
                            <Explore />
                        </ListItemIcon>
                        <ListItemText primary="Explore" primaryTypographyProps={{ sx: { color: 'primary.main' } }} />
                    </ListItem>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/invitation"}>
                    <ListItem button>
                        <ListItemIcon sx={{ color: 'primary.main' }}>
                            <MailOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mail Box" primaryTypographyProps={{ sx: { color: 'primary.main' } }} />
                    </ListItem>
                </Link>

                <ListItem button disabled={true}>
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                        <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Stack direction="row" alignItems="center" spacing={2}>Library<DeveloperMode fontSize='small' />
                        being developed</Stack>} primaryTypographyProps={{ sx: { color: 'primary.main' } }} />
                </ListItem>
                <ListItem button disabled={true}>
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                        <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Stack direction="row" alignItems="center" spacing={2}>Notification<DeveloperMode fontSize='small' />
                        being developed</Stack>} primaryTypographyProps={{ sx: { color: 'primary.main' } }} />
                </ListItem>
                <Link style={{ textDecoration: "none" }} to={`/researcher/${user.id}`}>
                    <ListItem button>
                        <ListItemIcon sx={{ color: 'primary.main' }}>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" primaryTypographyProps={{ sx: { color: 'primary.main' } }} />
                    </ListItem>
                </Link>
                <Link style={{ textDecoration: "none" }} to={`/search`}>
                    <ListItem button>
                        <ListItemIcon sx={{ color: 'primary.main' }}>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Search" primaryTypographyProps={{ sx: { color: 'primary.main' } }} />
                    </ListItem>
                </Link>
            </List>
        </Paper>
    );
}

export default FilterMenu;
