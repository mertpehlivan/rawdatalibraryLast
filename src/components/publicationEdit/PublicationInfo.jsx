import React from 'react';
import { Paper, Stack, Typography, Grid, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

const PublicationInfo = ({ publication, comment, references, setStep, edit = false, handleEdit }) => {
    return (
        <Paper>
            <Stack spacing={2} sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5" color="primary.main"><b>Publication Info</b></Typography>
                    <IconButton onClick={edit ? () => handleEdit("PUBLICATION_EDIT") : () => setStep(1)}>
                        <Edit />
                    </IconButton>
                </Stack>
                <Grid container>
                    {Object.keys(publication.data).map((key, index) => {
                        const formattedKey = key
                            .replace(/([a-z])([A-Z])/g, '$1 $2')  // Split CamelCase
                            .toLowerCase()                        // Convert to lowercase
                            .replace(/^\w/, c => c.toUpperCase()); // Capitalize first letter

                        if (key !== "comment" && key !== "references") {
                            return (
                                <Grid item md={6} sm={12} key={index}>
                                    <Stack>
                                        <Typography color="primary.main"><b>{formattedKey}:</b></Typography>
                                        <Typography>{` ${publication.data[key]}`}</Typography>
                                    </Stack>
                                </Grid>
                            );
                        }
                        return null;
                    })}
                    <Grid item md={12} sm={12} mt={2}>
                        <Stack>
                            <Typography color="primary.main"><b>Abstract</b></Typography>
                            <Typography>{comment}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item md={12} sm={12} mt={2}>
                        <Stack>
                            <Typography color="primary.main"><b>References</b></Typography>
                            <Typography>{references}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    );
};

export default PublicationInfo;