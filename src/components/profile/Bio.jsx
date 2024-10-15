import React, { useEffect, useRef, useState } from 'react';
import {
    Typography,
    Paper,
    Stack,
    TextField,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useUserContext } from '../../auth/AuthProvider';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import BioEditDialog from './BioEditDialog';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Bio = ({ initialBio, publicStatus = false }) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [bio, setBio] = React.useState('');
    const [showMore, setShowMore] = useState(false);
    const textAreaRef = useRef(null);
    const { token, user } = useUserContext();
    const { userId } = useParams();

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    // Fetch initial bio on component mount
    useEffect(() => {
        setBio(initialBio);
    }, [initialBio]);

    const handleEditDialogOpen = () => {
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleSaveBio = async () => {
        try {
            await axios.put(`${baseUrl}/api/v1/user/update-bio`, { bio }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            window.location.reload();
            handleEditDialogClose();
        } catch (error) {
            console.error('Error updating bio:', error);
        }
    };

    // Shorten the bio if it exceeds 150 characters
    const shortenedBio = initialBio?.length > 150 ? `${initialBio.slice(0, 150)}...` : initialBio;

    return (
        <Paper elevation={6} sx={{ padding: 2, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" color="primary.main">
                    <IconButton size="small" sx={{ alignSelf: 'center' }}>
                        <Icon width={30} height={30} color='primary.main' icon="mdi:biography" />
                    </IconButton>
                    <Typography variant="h6" color="primary.main">Bio</Typography>
                </Stack>

                {!publicStatus && ( user.id === userId && (
                    <IconButton onClick={handleEditDialogOpen} size="small" sx={{ marginLeft: 1 }}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                ))}
            </Stack>

            <Typography
                sx={{ cursor: "pointer", color: 'primary.main', marginTop: 1 }}
                tabIndex={0}
                role="button"
                aria-label="Show full bio"
            >
                {/* Render the bio with optional expansion */}
                {showMore ? (
                    bio?.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            {index < bio.split('\n').length - 1 && <br />}
                        </span>
                    ))
                ) : (
                    shortenedBio?.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            {index < shortenedBio.split('\n').length - 1 && <br />}
                        </span>
                    ))
                )}
            </Typography>

            {/* Show more button */}
            {initialBio && (
                <Button
                    onClick={() => setShowMore(prev => !prev)}
                    sx={{ marginTop: 2 }}
                    color="primary"
                >
                    {showMore ? 'Show Less' : 'Show More'}
                </Button>
            )}

            {/* Edit Dialog */}
            <BioEditDialog handleSaveBio={handleSaveBio} editDialogOpen={editDialogOpen} handleEditDialogClose={handleEditDialogClose} setBio={setBio} bio={bio} />
        </Paper>
    );
};

export default Bio;
