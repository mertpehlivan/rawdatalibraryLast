import { Box, Container, Grid, Paper, Stack, CircularProgress, Menu, MenuItem, List, Accordion, AccordionSummary, AccordionDetails, Typography, Divider, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CurretUserBox from '../components/homePage/CurretUserBox'
import { Outlet } from 'react-router-dom';
import { BusinessCenter, DeveloperMode, Info } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';

const HomePage = () => {
    return (

        <Container maxWidth>
            <Stack pt={1} >
                <Grid container spacing={1}>
                    <Grid item sm={12} md={2.5}>
                        <CurretUserBox />
                    </Grid>
                    <Grid item sm={12} md={7}>
                        <Outlet />
                    </Grid>
                    <Grid item sm={12} md={2.5}>
                        <Paper sx={{ borderRadius: 3, p: 2 }}>
                            <Stack>
                                <Typography variant='h6' color={"primary.main"} textAlign="center">SUMMARY OF DATA OWNER SAVING PANEL</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                    <BusinessCenter sx={{ width: 35, height: 35, color: "primary.main" }} />
                                    <Typography variant='h5' justifyContent="center">0$</Typography>
                                    <Info text="Current Balance" />
                                    <Divider />
                                </Stack>
                                <Stack p={1}>
                                    <Stack spacing={1}>
                                        <Button>See Detail</Button>
                                    </Stack>
                                </Stack>
                                <Divider sx={{mb:1}}/>
                                <Stack direction="row" spacing={1}>
                                    <DeveloperMode color='info'/>
                                    <Typography>
                                        We are working on a comprehensive payment system for RDL members. We are so sorry for the delay. The payment system is planned to be online end of December.
                                        Please note that researchers can upload their raw data during the improvement of the payment system.
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Stack>
        </Container>

    );
}

export default HomePage;
