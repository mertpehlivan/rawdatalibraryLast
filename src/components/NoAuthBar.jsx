import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box, Stack, ButtonGroup, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const NoAuthBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <List>
        <ListItem button component={Link} to="/aboutUs">
          <ListItemText primary="About us" />
        </ListItem>
        <Divider/>
        <ListItem button component={Link} to="/whatIs">
          <ListItemText primary="What is a journal page? and Who we are?" />
        </ListItem>
        <Divider/>
        <ListItem button component={Link} to="/accuracy">
          <ListItemText primary="Accuracy of Purchased Data" />
        </ListItem>
        <Divider/>
        <ListItem button component={Link} to="/login">
          <Button variant='contained'>
            <ListItemText primary="LOG IN" />
          </Button>
        </ListItem>
        <ListItem button component={Link} to="/signup">
          <Button variant='contained'>
            <ListItemText primary="Join for free" />
          </Button>
        </ListItem>

      </List>
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        {isSmallScreen ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
              {drawer}
            </Drawer>
          </>
        ) : (
          <Stack direction="row" justifyContent="space-between" p={1} sx={{ width: '100%' }}>
            <Stack justifyContent="start" direction="row" spacing={1}>
              <Button component={Link} to="/aboutUs">
                <Typography fontFamily="Times New Roman, sans-serif" variant="h6" fontWeight="bold" color="white">
                  About us
                </Typography>
              </Button>
              <Button component={Link} to="/whatIs">
                <Typography fontFamily="Times New Roman, sans-serif" variant="h6" fontWeight="bold" color="white">
                  What is a journal page? and Who we are?
                </Typography>
              </Button>
              <Button component={Link} to="/accuracy">
                <Typography fontFamily="Times New Roman, sans-serif" variant="h6" fontWeight="bold" color="white">
                  Accuracy of Purchased Data
                </Typography>
              </Button>
            </Stack>
            <ButtonGroup variant="text">
              <Button component={Link} to="/login" startIcon={<LoginIcon />} >
                <Typography fontFamily="Times New Roman, sans-serif" variant="h6" fontWeight="bold" color="white">
                  LOG IN
                </Typography>
              </Button>
              <Button variant='outlined' sx={{
                bgcolor: "white", ":hover": {
                  color: "white"
                }
              }} component={Link} to="/signup" startIcon={<PersonAddIcon />}>
                <Typography fontFamily="Times New Roman, sans-serif" variant="h6" fontWeight="bold" >
                  Join for free
                </Typography>
              </Button>
            </ButtonGroup>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NoAuthBar;
