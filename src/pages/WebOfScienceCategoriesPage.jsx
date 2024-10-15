import React, { useState, useEffect } from 'react';
import {
    Paper,
    TextField,
    Button,
    Chip,
    Stack,
    Typography,
    Container,
    CircularProgress,
    Alert,
    Autocomplete,
    Box
} from '@mui/material';
import { Add, ArrowBack, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useUserContext } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import categories from '../components/categories';
import { createWebOfScienceCategories, deleteWebOfScienceCategory, getCurrentUserWebOfScienceCategories } from '../services/webOfScienceCategoryServices';

const WebOfScienceCategories = () => {
    const { token } = useUserContext();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentCategory, setCurrentCategory] = useState(null); // New state for the current category
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResearchInterests = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch current user's web of science categories
                const data = await getCurrentUserWebOfScienceCategories(token); // Await the data fetching
                setSelectedCategories(data);
            } catch (error) {
                setError('Failed to fetch web of science categories.');
            } finally {
                setLoading(false);
            }
        };
        fetchResearchInterests();
    }, [token]);

    const handleAddCategory = async () => {
        if (currentCategory && !selectedCategories.some((c) => c.id === currentCategory.id)) {
            setLoading(true);
            setError(null);
            try {
                await createWebOfScienceCategories(token, [currentCategory.label]);
                setSelectedCategories((prev) => [...prev, currentCategory]);
                setSuccessMessage('Web of Science Category added successfully!');

                // Reset currentCategory to clear the Autocomplete field
                setCurrentCategory(null); // Clear current category after adding

                // Clear success message after 2 seconds
                setTimeout(() => setSuccessMessage(''), 2000);
            } catch (error) {
                setError('Failed to add web of science category.');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Category already added or invalid.'); // Additional error handling
        }
    };

    const handleDeleteCategory = async (categoryToDelete) => {
        setLoading(true);
        setError(null);
        try {
            await deleteWebOfScienceCategory(token, categoryToDelete.id);
            setSelectedCategories((prev) =>
                prev.filter((c) => c.id !== categoryToDelete.id)
            );
            setSuccessMessage('Web of Science Category deleted successfully!');

            // Clear success message after 2 seconds
            setTimeout(() => setSuccessMessage(''), 2000);
        } catch (error) {
            setError('Failed to delete web of science category.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Paper sx={{ p: 4, borderRadius: 5, mt: 2, boxShadow: 3, backgroundColor: '#f9f9f9' }}>
                    <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 4 }}>
                        Back
                    </Button>
                    <Stack direction="row" spacing={0.5} color="primary.main" alignItems="center" p={1}>
                        <Typography variant="h5" fontWeight="bold">
                            Web of Science Categories
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} mb={2}>
                        <Autocomplete
                            size="small"
                            style={{ width: "100%" }}
                            options={categories}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => (
                                <Box component="li" {...props}>
                                    {option.label}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Choose a category"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                            value={currentCategory}
                            onChange={(event, value) => {
                                setCurrentCategory(value); // Set the selected category to currentCategory
                            }}
                        />
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleAddCategory} // Call handleAddCategory on button click
                            disabled={loading || !currentCategory} // Disable button while loading or if no category is selected
                        >
                            Add
                        </Button>
                    </Stack>
                    {loading && (
                        <CircularProgress
                            size={30}
                            sx={{
                                display: 'block',
                                margin: 'auto',
                                mb: 2,
                            }}
                        />
                    )}
                    {error && <Alert severity="error">{error}</Alert>}
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {selectedCategories.map((category) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Chip
                                    label={category.label || category.webOfScienceCategoryName}
                                    onDelete={() => handleDeleteCategory(category)}
                                    deleteIcon={<Close sx={{ color: 'black !important' }} />}
                                    variant="outlined"
                                    sx={{
                                        bgcolor: '#e1e1e1',
                                        color: 'black',
                                        mt: 1
                                    }}
                                />
                            </motion.div>
                        ))}
                    </Stack>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default WebOfScienceCategories;
