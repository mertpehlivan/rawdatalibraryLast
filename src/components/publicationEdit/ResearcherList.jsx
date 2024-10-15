import { ArrowDownward, ArrowUpward, Delete, Save } from '@mui/icons-material';
import { Avatar, Button, CircularProgress, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Stack, Typography } from '@mui/material';
import React, { useEffect, useState, useMemo } from 'react';
import { useUserContext } from '../../auth/AuthProvider';
import { updateAuthor } from '../../services/publicationService';
import { useParams } from 'react-router-dom';
import { getProfileImage } from '../../services/imageServices';

const fallbackImage = 'path_to_fallback_image'; // Replace with your fallback image path

const ResearcherList = ({ authors, type, moveAuthorUp, moveAuthorDown, onDelete, handleRoleChange }) => {
    const { user, token } = useUserContext();
    const { publicationId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState({}); // Store image URLs by author ID

    // Fetch profile images only when authors change
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const urls = await Promise.all(
                    authors.map(async (author) => {
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
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [authors]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await updateAuthor(token, publicationId, authors);
            console.log('Researchers saved successfully:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error saving researchers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack spacing={3} style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Researcher List</Typography>
            <List>
                {authors.length > 0 ? (
                    authors.map((author, index) => (
                        <React.Fragment key={author.id}>
                            <ListItem
                                secondaryAction={
                                    <Stack direction="row" spacing={1}>
                                        <IconButton onClick={() => moveAuthorUp(index)} disabled={index === 0}>
                                            <ArrowUpward />
                                        </IconButton>
                                        <IconButton onClick={() => moveAuthorDown(index)} disabled={index === authors.length - 1}>
                                            <ArrowDownward />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => onDelete(index)}
                                            disabled={author.id === user.id} // Prevent deletion of the current user
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Stack>
                                }
                                style={{ backgroundColor: '#f9f9f9', borderRadius: 8 }}
                            >
                                <ListItemAvatar>
                                    <Avatar src={imageUrls[author.id] || null} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${author.firstname} ${author.lastname}`}
                                    secondary={`ID: ${author.id}`}
                                />
                            </ListItem>

                            {type === "RESEARCH_PROJECT" && (
                                <ListItem>
                                    <Select
                                        fullWidth
                                        size="small"
                                        value={author.authorRole || "RESEARCHER"}
                                        onChange={(e) => handleRoleChange(author.id, e.target.value)}
                                    >
                                        <MenuItem value="ADVISOR">Advisor</MenuItem>
                                        <MenuItem value="PROJECT_MANAGER">Project Manager</MenuItem>
                                        <MenuItem value="RESEARCHER">Researcher</MenuItem>
                                        <MenuItem value="STUDENT">Student</MenuItem>
                                    </Select>
                                </ListItem>
                            )}

                            <Divider variant="middle" style={{ margin: '10px 0' }} />
                        </React.Fragment>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="No authors available" />
                    </ListItem>
                )}
            </List>
            <Stack direction="row" spacing={3} style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
                <Button color='error' variant='outlined' onClick={() => window.location.reload()}>
                    Cancel
                </Button>
                <Button variant='contained' startIcon={<Save />} disabled={isLoading} onClick={handleSave}>
                    {isLoading ? 'Loading...' : 'Save'}
                </Button>
                {isLoading && <CircularProgress />}
            </Stack>
        </Stack>
    );
};

export default ResearcherList;
