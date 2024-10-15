import React, { useState, useEffect } from 'react';
import { Box, Tooltip, Dialog, IconButton, Paper, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PreviewImage = ({ imageUrl, alt }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>

            <Tooltip
                title={
                    imageUrl ? (
                        <Box width={100} height={100} component="img" src={imageUrl} alt={alt} />
                    ) : (
                        'Loading image...'
                    )
                }
            >
                <Paper elevation={3} sx={{width:30}}>
                    <Stack>
                        <Box
                            borderRadius={1}
                            width={30}
                            height={30}
                            component="img"
                            src={imageUrl}
                            alt={alt}
                            onClick={handleOpen}
                            style={{ cursor: 'pointer' }}
                        />
                    </Stack>
                </Paper>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <IconButton
                    onClick={handleClose}
                    edge="end"
                    color="inherit"
                    aria-label="close"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <img src={imageUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </Box>
            </Dialog>
        </>
    );
};

export default PreviewImage;
