import { Avatar, Paper, Stack, Typography, Link as MuiLink } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfileImage } from '../../services/imageServices';

const PostShareByUser = ({ shareByAuthor }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true); // Start loading
        const imageBlob = await getProfileImage(shareByAuthor.id);
        const imageObjectUrl = URL.createObjectURL(imageBlob);
        setImage(imageObjectUrl);
        console.log(imageObjectUrl)
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
  }, [shareByAuthor.id]); // Dependency on shareByAuthor.id

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Link to={`/researcher/${shareByAuthor.id}`} style={{ textDecoration: 'none' }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          p={1}
          borderRadius={2}
          bgcolor="#f5f5f5"
          sx={{
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': { bgcolor: '#e0e0e0' }, // Subtle hover effect
          }}
        >
          <Avatar
            src={loading ? undefined : image} // Show undefined while loading
            alt={`${shareByAuthor.firstname} ${shareByAuthor.lastname}`}
            sx={{ bgcolor: 'grey.300' }} // Placeholder background color
          />

          <Stack>
            <Typography color="primary.main" variant="subtitle1" fontWeight="bold">
              {shareByAuthor.firstname} {shareByAuthor.lastname}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ID: {shareByAuthor.id}
            </Typography>
          </Stack>
        </Stack>
      </Link>
    </Stack>
  );
};

export default PostShareByUser;
