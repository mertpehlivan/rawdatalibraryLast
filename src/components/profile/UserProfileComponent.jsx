import React, { useState, useEffect } from 'react';
import { Stack, Avatar, Typography, IconButton } from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { getProfileImage } from '../../services/imageServices';
const UserProfileComponent = ({ user, avatarSize = 90, nameVariant = 'h6', bioSize = 'body1'}) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading
    const [editedUser, setEditedUser] = useState({ ...user });
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
    const sliceTre = (string) => {
        if (string) {
            const parts = string.split("-");
            if (parts.length > 1) {
                const result = parts[1].toLowerCase();
                console.log(result);
                return result;
            }
        }
        return "";
    }
    return (
        <Stack height={140} direction="row" alignItems="center" spacing={2}>
            <Avatar
                alt={`${user.firstname} ${user.lastname}`}
                src={image}
                sx={{ width: avatarSize, height: avatarSize, boxShadow: 5, border: '3px solid', borderColor: 'primary.main' }}
            />
            <Stack>

                <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography variant={nameVariant} sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        {user.firstname} {user.lastname}
                    </Typography>
                    <Typography variant={nameVariant} sx={{ color: 'text.secondary', marginRight: 1 }}>
                        ID:
                    </Typography>
                    <IconButton onClick={handleCopy} size="small">
                        <ContentCopy fontSize="small" />
                    </IconButton>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                    {user.academicDegree &&
                        <Typography variant={bioSize} fontStyle="italic" color="gray">
                            {user.academicDegree}
                        </Typography>}
                    {user.department &&
                        <Typography variant={bioSize} fontStyle="italic" color="gray">
                            in {user.department}
                        </Typography>}
                </Stack>
                <Stack direction="row" spacing={0.5}>
                    {user.position &&
                        <Typography variant={bioSize} fontStyle="italic" color="gray">
                            {user.position}
                        </Typography>}
                    {user.institution &&
                        <Typography variant={bioSize} fontStyle="italic" color="gray">
                            at {user.institution}
                        </Typography>}
                </Stack>

                <Stack direction="row" spacing={0.5} alignItems="center">
                    <img
                        loading="lazy"
                        width={bioSize}
                        height={bioSize - 5}
                        srcSet={`https://flagcdn.com/w40/${sliceTre(user.country).toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${sliceTre(user.country).toLowerCase()}.png`}
                        alt=""
                    />
                    <Typography variant={bioSize} color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        {user.country}
                    </Typography>
                </Stack>

            </Stack>
        </Stack>
    )
}

export default UserProfileComponent