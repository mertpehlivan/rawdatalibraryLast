import {
    Avatar,
    Paper,
    Stack,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Divider,
    Button,
    Box,
    TextField,
    DialogActions,
    Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { getProfileImage } from '../../services/imageServices';
import { Close, ContentCopy, Edit } from '@mui/icons-material';
import ProfileEditDialog from './ProfileEditDialog'; // Import the ProfileEditDialog component
import UserProfileComponent from './UserProfileComponent';
import { useUserContext } from '../../auth/AuthProvider';
import { findByIdToGetUserResponse } from '../../services/userService';
import { useParams } from 'react-router-dom';

function ProfileBar({ user, currentUser, publicStatus = false }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading
    const [editedUser, setEditedUser] = useState({ ...user });
    const { userId } = useParams()
    const { token } = useUserContext()
    const handleRefresh = async () => {


        try {
            const userResponse = await findByIdToGetUserResponse(token, userId);
            console.log(userResponse);
            setEditedUser(userResponse); // Updated reference to new state name
        } catch (err) {

        } finally {

        }
        // Fetch user data when component mounts

    }

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };



    const handleSave = () => {
        // Here you can add logic to save the edited user data
        handleRefresh()

    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                setLoading(true); // Start loading
                const imageBlob = await getProfileImage(user.id);
                const imageObjectUrl = URL.createObjectURL(imageBlob);
                setImage(imageObjectUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchImage();

        // Cleanup function to revoke object URL if needed
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [user.id]);
    const handleCopy = () => {
        navigator.clipboard.writeText(user.id)
            .then(() => {
                // You can show a notification or alert here if needed
                console.log('ID copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy ID: ', err);
            });
    };
    return (
        <Paper elevation={6} sx={{ borderRadius: 3, p: 2, bgcolor: 'background.default' }}>
            <Stack direction="row" justifyContent="space-between">
                <UserProfileComponent user={editedUser} />
                {!publicStatus && (user.id == currentUser.id && <Stack direction="row" alignItems="end">
                    <Button variant="contained" startIcon={<Edit />} onClick={handleDialogOpen}>
                        Edit Profile
                    </Button>
                </Stack>)}
            </Stack>

            <Divider sx={{ borderBottomWidth: '2px', borderRadius: 5 }} />

            {/* Profile Edit Dialog */}
            <ProfileEditDialog
                image={image}
                editedUser={editedUser}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
                handleDialogClose={handleDialogClose}
                dialogOpen={dialogOpen}
            />
        </Paper>
    );
}

export default ProfileBar;
