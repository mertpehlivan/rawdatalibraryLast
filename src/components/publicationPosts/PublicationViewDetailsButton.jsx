import { Visibility } from '@mui/icons-material'; // Importing a more relevant icon
import { Button, Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function PublicationViewDetailsButton({ areYouACoAuthor,publicationId }) {  
    return (
        <Stack>
            {areYouACoAuthor && (
                <Link to={`/edit-publication/${publicationId}`}>
                    <Button variant="contained" startIcon={<Visibility />}>
                        View Details
                    </Button>
                </Link>

            )}
        </Stack>
    );
}

export default PublicationViewDetailsButton;
