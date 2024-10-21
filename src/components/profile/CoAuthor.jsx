import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, CircularProgress, Button, Stack, Avatar } from '@mui/material';
import { getCoAuthorLastPublications } from '../../services/publicationService';
import { useUserContext } from '../../auth/AuthProvider';
import { Link, useParams } from 'react-router-dom';
import { getProfileImage } from '../../services/imageServices';

const fallbackImage = 'path_to_fallback_image'; // Update with the actual fallback image path

const CoAuthor = () => {
    const { token } = useUserContext();
    const { userId } = useParams();
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [imageUrls, setImageUrls] = useState({});
    const itemsPerPage = 4; // Number of items to display at a time

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const data = await getCoAuthorLastPublications(token, userId);
                console.log("CoAuthor", data);
                setPublications(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, [userId, token]);

    useEffect(() => {
        const fetchImages = async () => {
            const urls = await Promise.all(
                publications.map(async (author) => {
                    if (!imageUrls[author.id]) {
                        try {
                            const imageBlob = await getProfileImage(author.id);
                            return { id: author.id, url: URL.createObjectURL(imageBlob) };
                        } catch (error) {
                            return { id: author.id, url: fallbackImage }; // Fallback on error
                        }
                    }
                    return { id: author.id, url: imageUrls[author.id] };
                })
            );

            const newImageUrls = urls.reduce((acc, img) => ({ ...acc, [img.id]: img.url }), {});
            setImageUrls((prev) => ({ ...prev, ...newImageUrls }));
        };

        if (publications.length > 0) {
            fetchImages();
        }
    }, [publications]);

    if (loading) {
        return (
            <Box
                sx={{
                    position: 'relative',
                    height: '100vh', // Full height for loading
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Loading Co-Authors Publications...
                </Typography>
            </Box>
        );
    }

    if (error) return <div>Error: {error}</div>;

    // Filter out publications with the same author ID
    const uniquePublications = publications.filter((pub, index, self) =>
        index === self.findIndex((p) => p.id === pub.id)
    );

    // Calculate the current items to display
    const startIndex = currentPage * itemsPerPage;
    const currentItems = uniquePublications.slice(startIndex, startIndex + itemsPerPage);

    // Handle pagination
    const handleNext = () => {
        if ((currentPage + 1) * itemsPerPage < uniquePublications.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Paper sx={{ p: 3,borderRadius:5 }}>
            <Typography color="primary.main" variant="h6" gutterBottom>
                Co-Authors Last Publications
            </Typography>
            <Grid container spacing={2}>
                {currentItems.map((publication) => (
                    <Grid item xs={12} sm={6} md={6} key={publication.id}>
                        <Link style={{ textDecoration: "none" }} to={`/researcher/${publication.id}`}>
                            <Paper elevation={5} style={{ padding: 10, borderRadius: 5 }}>
                                <Stack alignItems="center">
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar
                                            sx={{ width: 50, height: 50 }}
                                            alt={`${publication.firstname} ${publication.lastname}`}
                                            src={imageUrls[publication.id] || fallbackImage} // Use fetched URL or fallback image
                                        />
                                        <Typography variant="h6">{publication.title}</Typography>
                                    </Stack>
                                    <Typography variant="subtitle1">
                                        {publication.firstname} {publication.lastname}
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                    variant="contained"
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={(currentPage + 1) * itemsPerPage >= uniquePublications.length}
                    variant="contained"
                >
                    Next
                </Button>
            </Box>
        </Paper>
    );
};

export default CoAuthor;
