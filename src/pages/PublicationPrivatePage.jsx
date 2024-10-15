import { Container, Paper, Typography, CircularProgress, Alert, Stack, Button, Divider, useMediaQuery } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPublicationPage } from '../services/publicationService';
import { useUserContext } from '../auth/AuthProvider';
import { PostHeader } from '../components/publicationPosts/PostHeader';
import { PostComment } from '../components/publicationPosts/PostComment';
import PostShareByUser from '../components/publicationPosts/PostShareByUser';
import PostActionButton from '../components/publicationPosts/PostActionButton';
import { Details, ExitToApp } from '@mui/icons-material';
import PostChip from '../components/publicationPosts/PostChip';
import PostAuthors from '../components/publicationPosts/PostAuthors';
import PostFolderDetail from '../components/publicationPosts/PostFolderDetail';
import { useTheme } from '@emotion/react';
import PublicationViewDetailsButton from '../components/publicationPosts/PublicationViewDetailsButton';


const PublicationPrivatePage = () => {
    const { id } = useParams();
    const [publication, setPublication] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token, user } = useUserContext()
    const navigate = useNavigate(); // Initialize the navigate hook
    const handleBackClick = () => {
      navigate(-1); // This will go back to the previous page
    };
    const isAuthor = () =>{
        let id = user.id;
        publication.authors.map((author)=>{
            if(author.id === id){

            }
        })
    }
    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const data = await getPublicationPage(token, id);
                console.log(data)
                setPublication(data);
            } catch (error) {
                setError('Failed to fetch publication data');
            } finally {
                setLoading(false);
            }
        };

        fetchPublication();
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ mt: 1 }}>
                <Paper sx={{ padding: 2, textAlign: 'center' }}>
                    <CircularProgress />
                    <Typography>Loading...</Typography>
                </Paper>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 1 }}>
                <Paper sx={{ padding: 2, textAlign: 'center' }}>
                    <Alert severity="error">{error}</Alert>
                </Paper>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 1 }}>
            <Paper sx={{ padding: 2, borderRadius: 3 }}>
                <Stack spacing={2}>
                    <Stack direction="row" p={1} justifyContent="space-between" alignItems="center">
                        <Button onClick={handleBackClick} variant='outlined' startIcon={<ExitToApp />}>Back</Button>

                    </Stack>
                    <Divider />
                    <Stack
                        direction={isMobile ? 'column' : 'row'} // Stack vertically on mobile, horizontally on larger screens
                        justifyContent={isMobile ? 'center' : 'space-between'}
                        alignItems={isMobile ? 'flex-start' : 'center'}
                        spacing={2} // Add spacing between items
                    >
                        <PostShareByUser shareByAuthor={publication.shareByAuthor} />
                        <PostActionButton data={publication} />
                    </Stack>
                    <Stack spacing={1}>
                        <PostHeader variant='h4' title={publication.publication.title} id={publication.publication.id} />
                        <PostComment comment={publication.publication.comment} />
                        <PostChip data={publication} />
                        <Typography color="gray">{publication.publication.summary}</Typography>
                    </Stack>
                    <PostAuthors authors={publication.authors} />
                    <PostFolderDetail folders={publication.folders} />
                </Stack>
            </Paper>
        </Container>
    );
};

export default PublicationPrivatePage;
