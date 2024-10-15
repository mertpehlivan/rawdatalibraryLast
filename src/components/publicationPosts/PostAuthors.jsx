import React, { useState, useEffect, useMemo } from 'react';
import { Stack, Chip, Avatar, Typography, Tooltip, AvatarGroup, CircularProgress } from '@mui/material';
import { RemoveCircleOutline } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { getProfileImage } from '../../services/imageServices';

// Define a fallback image URL for failed image loads
const fallbackImage = '/path/to/fallback-avatar.png'; // Use a valid URL for your fallback image

const PostAuthors = ({ authors }) => {
  const [imageUrls, setImageUrls] = useState(Array(authors.length).fill(null));
  const [loadingIndices, setLoadingIndices] = useState(new Set());
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const fetchImage = async (author, index) => {
      try {
        setLoadingIndices((prev) => new Set(prev).add(index)); // Mark as loading
        const imageBlob = await getProfileImage(author.id);
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrls((prevUrls) => {
          const newUrls = [...prevUrls];
          newUrls[index] = imageUrl;
          return newUrls;
        });
      } catch (error) {
        console.error(`Error fetching image for author ${author.id}:`, error);
        setImageUrls((prevUrls) => {
          const newUrls = [...prevUrls];
          newUrls[index] = fallbackImage; // Use fallback image if fetching fails
          return newUrls;
        });
      } finally {
        setLoadingIndices((prev) => {
          const newIndices = new Set(prev);
          newIndices.delete(index); // Remove from loading state
          return newIndices;
        });
        setLoadedCount((prev) => prev + 1); // Increase the count of loaded images
      }
    };

    authors.forEach((author, index) => {
      // Load images sequentially
      if (imageUrls[index] === null) {
        fetchImage(author, index);
      }
    });
  }, [authors, imageUrls]);

  // Memoize displayed and remaining authors to avoid re-calculation on each render
  const { displayedAuthors, remainingAuthors } = useMemo(() => {
    return {
      displayedAuthors: authors.slice(0, 3),
      remainingAuthors: authors.slice(3),
    };
  }, [authors]);

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={2} alignItems="center">
        {displayedAuthors.map((author, index) => (
          <RouterLink to={`/researcher/${author.id}`} key={author.id} style={{ textDecoration: 'none' }}>
            <Chip
              avatar={
                loadingIndices.has(index) ? ( // Show loading indicator if loading
                  <CircularProgress size={24} />
                ) : (
                  <Avatar src={imageUrls[index]} alt={author.firstname.charAt(0)} />
                )
              }
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2">
                    {author.firstname} {author.lastname}
                  </Typography>
                  {!author.accepted && (
                    <Tooltip title="This researcher is not on the RDL or has not yet approved this study.">
                      <RemoveCircleOutline
                        sx={{ cursor: 'pointer', color: 'red' }}
                        aria-label={`Remove ${author.firstname} ${author.lastname}`}
                      />
                    </Tooltip>
                  )}
                </Stack>
              }
              variant="outlined"
              color="primary"
            />
          </RouterLink>
        ))}

        {remainingAuthors.length > 0 && (
          <AvatarGroup max={3}>
            {remainingAuthors.map((author) => (
              <Tooltip key={author.id} title={`${author.firstname} ${author.lastname}`}>
                <Avatar sx={{ cursor: 'pointer', width: 30, height: 30 }}>
                  {author.firstname.charAt(0)}
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        )}
      </Stack>
    </Stack>
  );
};

export default PostAuthors;
