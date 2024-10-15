import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Chip, Stack, Typography, Container, CircularProgress, Alert } from '@mui/material';
import { Add, ArrowBack, Close } from '@mui/icons-material';
import { getCurrentUserResearchInterests, createResearchInterests, deleteResearchInterest } from '../services/researchInterestServices'; // Update this path
import { motion } from 'framer-motion';
import { useUserContext } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

const ResearchInterestPage = () => {
    const { token } = useUserContext(); // Get the token from your auth context
    const [interest, setInterest] = useState('');
    const [interestsList, setInterestsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate()
    // Fetch current user's research interests on component mount
    useEffect(() => {
        const fetchResearchInterests = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getCurrentUserResearchInterests(token);
                setInterestsList(data); // Adjust this if necessary based on your API response structure
            } catch (error) {
                setError('Failed to fetch research interests.');
            } finally {
                setLoading(false);
            }
        };
        fetchResearchInterests();
    }, [token]);

    const handleAddInterest = async () => {
        if (interest.trim() && !interestsList.includes(interest.trim())) {
            setLoading(true);
            setError(null);
            try {
                const data = await createResearchInterests(token, [interest.trim()]);
                setInterestsList([...interestsList, ...data]); // Adjust based on your API response
                setInterest('');
                setSuccessMessage('Research interest added successfully!');
            } catch (error) {
                setError('Failed to add research interest.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteInterest = async (interestToDelete) => {
        console.log(interestToDelete)// Find the ID to delete; adjust this based on your logic
        setLoading(true);
        setError(null);
        try {
            const interestId = interestToDelete.id;

            await deleteResearchInterest(token, interestId);
            setInterestsList(interestsList.filter((i) => i !== interestToDelete));
            setSuccessMessage('Research interest deleted successfully!');
        } catch (error) {
            setError('Failed to delete research interest.');
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
                        <Icon width={20} height={20} icon="material-symbols:lab-research" />
                        <Typography variant="h5" fontWeight="bold">
                            Research Interests Edit
                        </Typography>
                    </Stack>
                    {/* Show loading spinner in the middle */}
                    {loading && (
                        <CircularProgress
                            size={30}
                            sx={{
                                display: 'block',
                                margin: 'auto',
                                mb: 2, // Margin below the spinner
                            }}
                        />
                    )}
                    {error && <Alert severity="error">{error}</Alert>}
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    <Stack direction="row" spacing={1} mb={2}>
                        <TextField
                            size='small'
                            label="Research Interest"
                            variant="outlined"
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                            sx={{ flexGrow: 1 }}
                        />
                        <Button
                            size='small'
                            variant="contained"
                            color="primary"
                            onClick={handleAddInterest}
                            startIcon={<Add />}
                            disabled={loading} // Disable button while loading
                        >
                            Add
                        </Button>
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {interestsList.map((interestItem) => (
                            <motion.div
                                key={interestItem.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Chip

                                    label={interestItem.interest}
                                    onDelete={() => handleDeleteInterest(interestItem)}
                                    deleteIcon={<Close sx={{ color: 'black !important' }} />} // Set the delete icon color to white
                                    variant="outlined"
                                    sx={{
                                        bgcolor: '#e1e1e1',
                                        color: 'black', mt: 1
                                    }} // Customize chip styles
                                />
                            </motion.div>
                        ))}
                    </Stack>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default ResearchInterestPage;
