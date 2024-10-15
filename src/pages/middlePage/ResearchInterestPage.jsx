import React, { useState, useEffect } from 'react';
import {
    Paper,
    Chip,
    Stack,
    Typography,
    IconButton,
    CircularProgress,
    Alert,
    Button,
    Box,
    Skeleton,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useUserContext } from '../../auth/AuthProvider';
import { getUserResearchInterests } from '../../services/researchInterestServices'; // Ensure this path is correct
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
import PublonsIcon from '../../assets/publons.png';
import { getUserWebOfScienceCategories } from '../../services/webOfScienceCategoryServices';

const ResearchInterestPage = () => {
    const { token, user } = useUserContext();
    const { userId } = useParams();
    const [interestsList, setInterestsList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch user's research interests
    useEffect(() => {
        const fetchResearchInterests = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getUserResearchInterests(token, userId);
                setInterestsList(data.map(item => item.interest)); // Adjust based on your API response

                // Fetch categories after interests
                const categoryData = await getUserWebOfScienceCategories(token, userId);
                setCategories(categoryData); // Ensure this is an array
            } catch (error) {
                setError('Failed to fetch research interests or categories.');
            } finally {
                setLoading(false);
            }
        };

        fetchResearchInterests();
    }, [token, userId]);

    return (
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Stack direction="row" spacing={0.5} color="primary.main" alignItems="center">
                    <Icon width={20} height={20} icon="material-symbols:lab-research" />
                    <Typography variant="h5" fontWeight="bold">
                        Research Interests
                    </Typography>
                </Stack>

                {user?.id === userId && (
                    <Link to={`/research-interest-edit`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" startIcon={<Add />}>
                            Add Research Interest
                        </Button>
                    </Link>
                )}
            </Stack>
            {error && <Alert severity="error">{error}</Alert>}
            <Box mt={2}>
                {loading &&
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                        <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                        <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                        <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                        <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                        <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                        <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                    </Stack>
                }
                {!loading && <Stack direction="row" spacing={1} flexWrap="wrap">
                    {interestsList.length === 0 ? (
                        <Typography variant="body1" color="text.secondary">
                            No research interests added yet.
                        </Typography>
                    ) : (
                        interestsList.map((interestItem) => (
                            <motion.div
                                key={interestItem}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Chip
                                    label={interestItem}
                                    sx={{
                                        bgcolor: '#e1e1e1',
                                        color: 'black',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                            cursor: 'pointer',
                                        },
                                        '&:focus': {
                                            outline: 'none',
                                            boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.3)',
                                        },
                                        mt: 1
                                    }}
                                />
                            </motion.div>
                        ))
                    )}
                </Stack>}
            </Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Stack direction="row" alignItems="center" mt={3}>
                    <img width={40} height={40} src={PublonsIcon} alt="Publons Logo" />
                    <Typography color="primary" variant="h5" fontWeight="bold">
                        Web of Science Categories
                    </Typography>
                </Stack>
                {user?.id === userId && (
                    <Link to={`/web-of-science-category-edit`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" startIcon={<Add />}>
                            Add Web of Science Category
                        </Button>
                    </Link>
                )}
            </Stack>
            {loading &&
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                    <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                    <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                    <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                    <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                    <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                    <Skeleton width={100} height={50} sx={{ borderRadius: 5 }} />
                </Stack>
            }
            {!loading && <Box mt={2}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {categories.length === 0 ? (
                        <Typography variant="body1" color="text.secondary">
                            No Web of Science categories added yet.
                        </Typography>
                    ) : (
                        categories.map((categoryItem) => (
                            <motion.div
                                key={categoryItem.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Chip
                                    label={categoryItem.webOfScienceCategoryName}
                                    sx={{
                                        bgcolor: '#e1e1e1',
                                        color: 'black',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                            cursor: 'pointer',
                                        },
                                        '&:focus': {
                                            outline: 'none',
                                            boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.3)',
                                        },
                                        mt: 1
                                    }}
                                />
                            </motion.div>
                        ))
                    )}
                </Stack>
            </Box>}
        </Paper>
    );
};

export default ResearchInterestPage;
