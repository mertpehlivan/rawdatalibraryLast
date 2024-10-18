import React from 'react';
import { Avatar, CircularProgress, Box } from '@mui/material';

const PreviewImage = ({ imageUrl, alt }) => {
    if (!imageUrl) {
        // Show a loading spinner while the image is being fetched
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={80}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Avatar
            src={imageUrl}
            alt={alt}
            variant="square"
            sx={{ width: 80, height: 80 }}
        />
    );
};

export default PreviewImage;
