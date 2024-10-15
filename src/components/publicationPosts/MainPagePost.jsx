import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { Box, CircularProgress } from '@mui/material'; // Import CircularProgress
import { Autoplay, Pagination } from 'swiper/modules';

const baseUrl = process.env.REACT_APP_BASE_URL;

const MainPagePost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPublicationPublicPage = async (publicationId) => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(`${baseUrl}/api/v1/no-auth/publication/get-publication-page/${publicationId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching home page publications:', error);
            setError(error);
            throw error;
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const publicationIds = [
                'cf8b0434-a3a6-4eb3-9e6b-b165186aaeb5',
                '0c78a406-40e2-4796-8e8f-53f4aca75d9b',
                '51fc8536-f770-4dc6-91da-6902e7da8072'
            ];

            const allPosts = [];

            for (const publicationId of publicationIds) {
                try {
                    const data = await getPublicationPublicPage(publicationId);
                    allPosts.push(data);
                } catch (error) {
                    console.error(`Failed to fetch posts for publication ID ${publicationId}:`, error);
                }
            }

            setPosts(allPosts);
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress /> {/* Display loading spinner */}
            </Box>
        );
    }

    return (
        <div>
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }} // Set autoplay interval to 3 seconds
            >
                {posts.map((post, index) => (
                    <SwiperSlide key={index} style={{ borderRadius: 5 }}>
                        <Box borderRadius={5} height={700}>
                            <Post publicStatus ={true} data={post} />
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MainPagePost;
