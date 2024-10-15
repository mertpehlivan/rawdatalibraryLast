import React from 'react';
import { MenuItem, Select, ListItemIcon, ListItemText, Paper, Stack, Typography, Button, Grid, Divider, useMediaQuery, useTheme } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { ArrowRight, Science } from '@mui/icons-material';
import { useNewPublicationContext } from '../../context/NewPublicationProvider';

const SelectPublicationType = () => {
    const publications = [
        { id: 0, key: "Article", value: "Article", icon: <ArticleIcon /> },
        { id: 1, key: "Thesis", value: "Thesis", icon: <SchoolIcon /> },
        { id: 2, key: "Chapter in a book", value: "Chapter in a book", icon: <BookIcon /> },
        { id: 3, key: "Conference paper", value: "Conference paper", icon: <AssignmentIcon /> },
        { id: 4, key: "Research project", value: "Research project", icon: <Science /> },
        { id: 5, key: "Company test report", value: "Company test report", icon: <BusinessCenterIcon /> }
    ];

    const { setStep, updateData, updateType, publication } = useNewPublicationContext();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (value) => {
        if (value === publication.type) {
            updateData({})
            updateType("");
        } else {
            updateType(value);
            updateData({})    
        }
    };

    return (
        <Paper elevation={3} sx={{ borderRadius: 3 }}>
            <Stack p={2} spacing={2}>
                <Typography color="primary.main" variant='h4'><b>New publications</b></Typography>
                <Typography variant='h6'>First, carefully select the type of publication you wish to upload, and then click the 'Continue' button to proceed to the next step.</Typography>
                <Divider />

                <Grid container spacing={1}>
                    {publications.map((publicationItem) => (
                        <Grid item xs={12} sm={6} md={6} key={publicationItem.id}>
                            <Button
                                sx={{ border: publicationItem.value === publication.type ? "2px solid" : "none" }}
                                onClick={() => handleChange(publicationItem.value)}
                                fullWidth
                                startIcon={publicationItem.icon}
                            >
                                {publicationItem.value}
                            </Button>
                        </Grid>
                    ))}
                </Grid>

                <Stack direction="row" justifyContent="flex-end">
                    <Button
                        disabled={publication.type === ""}
                        onClick={() => setStep(1)}
                        startIcon={<ArrowRight />}
                        variant='contained'
                    >
                        Continue
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default SelectPublicationType;
