import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../auth/AuthProvider';
import { getHomePagePublications } from '../../services/publicationService';
import { CircularProgress, Stack, Typography, Pagination, Skeleton, Paper } from '@mui/material';
import Post from '../../components/publicationPosts/Post';

const ExplorePage = () => {
    const { token } = useUserContext();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [page, setPage] = useState(1);  
    const [totalPages, setTotalPages] = useState(1);  
    const itemsPerPage = 5;

    useEffect(() => {
        const getHomePagePublicationsFetch = async () => {
            setLoading(true);
            try {
                const response = await getHomePagePublications(token, page, itemsPerPage);
                console.log(response);
                setPosts(response.content || []);
                setTotalPages(response.totalPages || 1);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };
        getHomePagePublicationsFetch();
    }, [page]);  

    const handlePageChange = (event, value) => {
        setPage(value);
        setLoading(true); 
        
        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling for a better user experience
        });
    };

    return (
        <Stack spacing={1}>
            {loading ? (
                <>
                    {Array.from(new Array(itemsPerPage)).map((_, index) => (
                        <Paper sx={{ height: 400, width: "96%", padding: 2, borderRadius: 3 }} key={index}>
                            <Stack spacing={1}>
                                <Skeleton variant="rectangular" height={118} sx={{ mb: 1, borderRadius: 3 }} />
                                <Skeleton variant="rectangular" height={50} width={700} sx={{ mb: 1, borderRadius: 3 }} />
                                <Skeleton variant="rectangular" height={38} width={400} sx={{ mb: 1, borderRadius: 3 }} />
                                <Skeleton variant="rectangular" height={38} width={400} sx={{ mb: 1, borderRadius: 3 }} />
                                <Skeleton variant="rectangular" height={38} width={600} sx={{ mb: 1, borderRadius: 3 }} />
                                <Skeleton variant="rectangular" height={38} width={400} sx={{ mb: 1, borderRadius: 3 }} />
                                <Stack direction="row" spacing={1}>
                                    <Skeleton variant="rectangular" height={28} width={100} sx={{ mb: 1, borderRadius: 3 }} />
                                    <Skeleton variant="rectangular" height={28} width={100} sx={{ mb: 1, borderRadius: 3 }} />
                                    <Skeleton variant="rectangular" height={28} width={100} sx={{ mb: 1, borderRadius: 3 }} />
                                    <Skeleton variant="rectangular" height={28} width={100} sx={{ mb: 1, borderRadius: 3 }} />
                                    <Skeleton variant="rectangular" height={28} width={100} sx={{ mb: 1, borderRadius: 3 }} />
                                    <Skeleton variant="rectangular" height={28} width={100} sx={{ mb: 1, borderRadius: 3 }} />
                                </Stack>
                            </Stack>
                        </Paper>
                    ))}
                </>
            ) : posts.length > 0 ? (
                <>
                    {posts.map((post, index) => (
                        <Post key={index} data={post} />
                    ))}
                    <Stack direction="row" alignItems="center" justifyContent="center">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            sx={{ mt: 2 }}
                        />
                    </Stack>
                </>
            ) : (
                <Typography>No posts available</Typography>
            )}
        </Stack>
    );
};

export default ExplorePage;
