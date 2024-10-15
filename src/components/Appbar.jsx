import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { useUserContext } from '../auth/AuthProvider';
import { Avatar, Button, Paper, Stack, Drawer, IconButton, Typography } from '@mui/material';
import CurrentAccountAvatar from './appbar/CurrentAccountAvatar';
import Logo from '../assets/logo 1.svg';
import { Add, Email, LibraryBooks, Notifications, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getProfileImage } from '../services/imageServices';
import { useState } from 'react';

// Styled components for the search input
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Appbar() {
    const { authenticated,user } = useUserContext();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [loading, setLoading] = useState(true); // State to track loading
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };
    React.useEffect(() => {
        const fetchImage = async () => {
            try {
                setLoading(true); // Start loading
                const imageBlob = await getProfileImage(user.id);
                const imageObjectUrl = URL.createObjectURL(imageBlob);
                setImage(imageObjectUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };
    
        fetchImage();
    
        // Cleanup function to revoke object URL if needed
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [user.id]);
    return (
        <Box width="100%" sx={{ height: 'auto' }}>
            {!authenticated ? (
                <Box height={70} position="static" bgcolor="primary.main" px={1}>
                    <Stack height="100%" width="100%" direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1}>
                            <Button size="small" sx={{ color: "white", fontSize: '0.875rem' }}>Login</Button>
                            <Button size="small" sx={{ bgcolor: "white", fontSize: '0.875rem' }}>Join for free</Button>
                        </Stack>
                    </Stack>
                </Box>
            ) : (
                <>
                    <Box height={80} width="100%">
                        <Paper elevation={2}>
                            <Stack
                                px={2}
                                direction="row"
                                height={80}
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Link to="/"><Box component="img" src={Logo} width={{ xs: 100, sm: 150 }} height="auto" /></Link>
                                    <Stack alignItems="center" justifyContent="center" display={{ xs: 'none', sm: 'flex' }}>
                                        <Link to="/new-publication">
                                            <Button
                                                startIcon={<Add />}
                                                size='small'
                                                variant='contained'
                                            >
                                                Add new publication
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" spacing={2} alignItems="center" display={{ xs: 'none', sm: 'flex' }}>
                                    <LibraryBooks sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 20 } }} />
                                    <Link  to="/invitation">
                                        <Email sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 20 } }}/>
                                    </Link>

                                    <Notifications sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 20 } }} />
                                    <CurrentAccountAvatar image={image}/>
                                </Stack>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ display: { xs: 'block', sm: 'none' } }}
                                    onClick={handleDrawerToggle}
                                >
                                    <Menu />
                                </IconButton>
                            </Stack>
                        </Paper>
                    </Box>
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={handleDrawerToggle}
                        variant="temporary"
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                width: 250,
                                boxSizing: 'border-box',
                            },
                        }}
                    >
                        <Stack
                            spacing={2}
                            p={2}
                            sx={{ width: 250 }}
                        >
                            <Button
                                startIcon={<Add />}
                                size='small'
                                variant='contained'
                                fullWidth
                                component={Link}
                                to="/new-publication"
                            >
                                Add new publication
                            </Button>
                            <Button
                                component={Link}
                                to="/invitation"
                                startIcon={<Email />}
                                fullWidth
                            >
                                Invitations
                            </Button>
                            <Button
                                startIcon={<LibraryBooks />}
                                fullWidth
                            >
                                Library
                            </Button>
                            <Button
                                startIcon={<Notifications />}
                                fullWidth
                            >
                                Notifications
                            </Button>
                            <Button
                                fullWidth
                                startIcon={<Avatar />}
                            >
                                Account
                            </Button>
                        </Stack>
                    </Drawer>
                </>
            )}
        </Box>
    );
}
