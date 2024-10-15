import { Container, Grid, MenuItem, Select, ListItemIcon, ListItemText, Paper, Stack, Typography, Button } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import React, { useState } from 'react'
import { ArrowRight, Search } from '@mui/icons-material';
import SelectPublicationType from '../components/newPublication/SelectPublicationType';
import NewPublicationProvider, { useNewPublicationContext } from '../context/NewPublicationProvider';
import PublicationForm from '../components/newPublication/PublicationForm'
import PublicationStepper from '../components/newPublication/PublicationStepper';
import PublicationStepperController from '../components/newPublication/PublicationStepperController';
import PdfUpload from '../components/newPublication/PdfUpload';
import RawDataUpload from '../components/newPublication/RawDataUpload';
import AddAuthor from '../components/newPublication/AddAuthor';
import UploudPublication from '../components/newPublication/UploudPublication';
const NewPublicationPage = () => {
    const { step } = useNewPublicationContext()

    return (

        <Container >
            <Grid container mt={3} spacing={2}>
                <Grid item xs={12}>
                    <PublicationStepper/>
                </Grid>
                {step == 0 && <Grid item xs={12}>
                    <SelectPublicationType />
                </Grid>}
                {step == 1 && <Grid item xs={12}>
                    <PublicationForm />
                    
                </Grid>}
                {step == 2 && <Grid item xs={12}>
                    <AddAuthor/>
                    
                </Grid>}
                {step == 3 && <Grid item xs={12}>
                    <PdfUpload/>
                    
                </Grid>}
                {step == 4 && <Grid item xs={12}>
                    <RawDataUpload/>
                    
                </Grid>}
                {step == 5 && <Grid item xs={12}>
                    <UploudPublication/>
                    
                </Grid>}
                {(step > 0 && step < 5) && <Grid item xs={12}>
                    <PublicationStepperController/>
                </Grid>}
            </Grid>
        </Container>

    )
}

export default NewPublicationPage
