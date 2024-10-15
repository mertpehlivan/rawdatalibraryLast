import React, { useEffect, useState } from 'react';
import { findByIdToGetUserPublicResponse, findByIdToGetUserResponse } from '../services/userService';
import { useUserContext } from '../auth/AuthProvider';
import { Outlet, useParams } from 'react-router-dom';
import { Typography, Container, Grid, Stack } from '@mui/material';
import ProfileBar from '../components/profile/ProfileBar';
import Bio from '../components/profile/Bio';
import PieChartBox from '../components/profile/PieChartBox';
import ResearcherContact from '../components/profile/ResearcherContact';
import SkeletonLoadingProfileBar from '../components/profile/SkeletonLoadingProfileBar';
import SkeletonLoadingBio from '../components/profile/SkeletonLoadingBio';
import PublicationTable from '../components/profile/PublicationTable';
import ProfilePageViewRouter from '../components/profile/ProfilePageViewRouter';

const ProfilePage = () => {
    const [profileUser, setProfileUser] = useState(null); // Renamed state
    const [profileBarLoading, setProfileBarLoading] = useState(true);
    const [bioLoading, setBioLoading] = useState(true);
    const [publicationsLoading, setPublicationsLoading] = useState(true);
    const [publications, setPublications] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useParams();
    const [selectedOption, setSelectedOption] = useState('publication');

    useEffect(() => {
        const fetchUserData = async () => {
            setProfileBarLoading(true);
            try {
                const userResponse = await findByIdToGetUserPublicResponse(userId);
                console.log(userResponse);
                setProfileUser(userResponse); // Updated reference to new state name
            } catch (err) {
                setError("Failed to fetch user data.");
            } finally {
                setProfileBarLoading(false); // End loading for ProfileBar
                setBioLoading(false); // Start loading for Bio
            }
        };

        fetchUserData(); // Fetch user data when component mounts
    }, [ userId]);

    if (error) {
        return (
            <Typography color="error" align="center">
                {error}
            </Typography>
        );
    }

    const handleToggle = (event, newOption) => {
        if (newOption !== null) {
            setSelectedOption(newOption); // Update the selected option
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 1 }}>
            <Grid container spacing={1}>
                <Grid item md={8}>
                    <Stack spacing={1}>
                        {profileBarLoading ? (
                            <SkeletonLoadingProfileBar />
                        ) : profileUser ? ( // Updated reference to new state name
                            <ProfileBar publicStatus={true}  currentUser ={null} user={profileUser} /> // Updated reference to new state name
                        ) : (
                            <Typography align="center">User not found.</Typography>
                        )}
                        <ProfilePageViewRouter publicStatus={true}/>
                    </Stack>
                </Grid>
                <Grid item md={4}>
                    <PieChartBox publicStatus={true}/>
                </Grid>
                <Grid item md={4} sm={12}>
                    <Stack spacing={1}>
                        {bioLoading ? ( // Updated condition to reflect loading state
                            <SkeletonLoadingBio />
                        ) : (
                            <Bio publicStatus={true}  initialBio={profileUser.bio} /> // Updated reference to new state name
                        )}
                        <ResearcherContact publicStatus={true}/>
                    </Stack>
                </Grid>
                <Grid item md={8} sm={12}>
                    <Stack spacing={1}>
                        <Outlet/>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;
