import { Box, Container, IconButton, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import Figure from '../assets/A1.png'
import Figure2 from '../assets/Resim4.png'
import Figure3 from '../assets/AdobeStock_234491775.png'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo 1.svg';
import { ArrowBack } from '@mui/icons-material'
const AccuracyPage = () => {
    return (
        <Container maxWidth="md">
            <Stack spacing={3} >
                <Paper>
                    <Stack spacing={2} p={4}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            {/* Back Button */}
                            <IconButton href="/" color="primary">
                                <ArrowBack />
                            </IconButton>
                            {/* Logo */}
                            <Box component="img" width={300} src={Logo} />
                            {/* Empty space to balance the layout */}
                            <Box width={48} />
                        </Stack>

                        <Stack >
                            <Typography variant='h4' color="primary.main" fontFamily="Times New Roman,sans-serif">Accuracy of Purchased Data</Typography>
                            <Typography variant='h6' fontFamily="Times New Roman,sans-serif">
                                In addition to being an academic platform, RDL company protects the rights of researchers
                                for sold and purchased raw data. In this regard, if there is a contradiction in the purchased raw
                                data:
                            </Typography>
                        </Stack>
                        <Typography textAlign="center" variant='h5' color="primary.main" fontFamily="Times New Roman,sans-serif">Mismatch</Typography>
                        <Stack direction="row" justifyContent="space-evenly" >
                            <Stack>
                                <Typography variant='h6' fontFamily="Times New Roman,sans-serif">Figure given in an article                     </Typography>
                                <Box width={400} component="img" src={Figure} />
                            </Stack>
                            <Stack>
                                <Typography variant='h6' fontFamily="Times New Roman,sans-serif">Preview image presented in RDL platform</Typography>
                                <Box width={400} component="img" src={Figure} />
                            </Stack>
                        </Stack>

                        <Typography textAlign="center" variant='h5' color="primary.main" fontFamily="Times New Roman,sans-serif">Purchased data</Typography>
                        <Stack direction="row" justifyContent="space-evenly" >

                            <Box width={400} component="img" src={Figure2} />


                            <Box width={400} component="img" src={Figure3} />

                        </Stack>
                        <Stack>

                        </Stack>
                        <Typography variant='h6' fontFamily="Times New Roman,sans-serif">
                            If there is a contradiction between the uploaded Raw Data and the purchased data file, please contact with us.

                        </Typography>
                        <Typography variant='h6' fontFamily="Times New Roman,sans-serif">
                            The relevant contradiction is examined within 72 hours by expert academicians who advise the Raw Data Library company. In case of inconsistency, correction or recommendation is requested from the data owner.
                        </Typography>
                        <Typography variant='h6' fontFamily="Times New Roman,sans-serif">
                            If the necessary correction cannot be provided within 7 business days, the researcher who purchased the data will be contacted to proceed with the refund.
                        </Typography>
                        <Typography textAlign="end" variant='h6' fontFamily="Times New Roman,sans-serif">
                            <a href="mailto:info@rawdatalibrary.net" style={{ color: 'inherit' }} target="_blank" rel="noopener noreferrer">
                                Contact with us
                            </a>
                        </Typography>



                    </Stack>
                </Paper>
            </Stack>
        </Container>
    )
}

export default AccuracyPage