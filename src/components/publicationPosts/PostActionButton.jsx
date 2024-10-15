import { MenuBook, More, PictureAsPdfTwoTone, ShoppingBasket } from '@mui/icons-material';
import { Button, ButtonGroup, Stack, Snackbar, Alert, IconButton } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import PostMoreToggleButton from './PostMoreToggleButton';
import { LoadingButton } from '@mui/lab';
import { useUserContext } from '../../auth/AuthProvider';
import PublicationViewDetailsButton from './PublicationViewDetailsButton';
import { Link } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_BASE_URL;

const PostActionButton = ({ data, publicStatus = false }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { token } = useUserContext(); // Get token from context

    const { id, only } = data.pdfFileResponse;

    const downloadPdf = async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch the pre-signed URL for the PDF file
            const response = await axios.get(`${baseUrl}/api/v1/no-auth/file/pdf-file/${id}`);
            const pdfFileUrl = response.data;

            if (!pdfFileUrl || pdfFileUrl.startsWith('PDF file not found')) {
                throw new Error('Failed to fetch PDF file URL.');
            }

            // Redirect to the pre-signed URL
            window.location.href = pdfFileUrl;

        } catch (err) {
            setError(`Download failed: ${err.message}`);
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Stack direction="row" spacing={1} alignItems="center">
                <ButtonGroup variant="contained" size="small">
                    <PublicationViewDetailsButton publicationId={data.publication.id} areYouACoAuthor={data.areYouACoAuthor} />
                    {only === "PUBLIC" ? (publicStatus ?

                        <Link to="/login">
                            <LoadingButton
                                size="small"

                                variant="outlined"
                                startIcon={<PictureAsPdfTwoTone />}

                                disabled={loading}
                            >View PDF</LoadingButton>
                        </Link>
                        :
                        <LoadingButton
                            size="small"
                            onClick={downloadPdf}
                            variant="outlined"
                            startIcon={<PictureAsPdfTwoTone />}
                            loading={loading}
                            loadingPosition="start"
                            disabled={loading}
                        >
                            {loading ? 'Downloading...' : 'View PDF'}
                        </LoadingButton>
                    ) : !(only == "PRIVATE") && (
                        <Button size="small" variant="outlined" startIcon={<MenuBook />}>
                            Request Full-text
                        </Button>
                    )}
                    {publicStatus ?<Button href='/login' size="small" variant="contained" startIcon={<ShoppingBasket />}>
                        Purchase Data
                    </Button>: <Button size="small" variant="contained" startIcon={<ShoppingBasket />}>
                        Purchase Data
                    </Button>}

                </ButtonGroup>
                {publicStatus ?<IconButton href='/login'>
                    <More/>
                </IconButton> : <PostMoreToggleButton
                    data={data}
                    userCoAuthorInvitation={data.userCoAuthorInvitation}
                    publicationId={data.publication.id}
                />}
            </Stack>

            {/* Snackbar for error handling */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
};

export default PostActionButton;
