import React, { useState, useEffect, useMemo } from 'react';
import {
  Stack,
  Chip,
  Avatar,
  Typography,
  Tooltip,
  AvatarGroup,
  CircularProgress,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { RemoveCircleOutline } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { getProfileImage } from '../../services/imageServices';

// Define a fallback image URL for failed image loads
const fallbackImage = '/path/to/fallback-avatar.png'; // Use a valid URL for your fallback image

const PostAuthors = ({ authors }) => {
  const [imageUrls, setImageUrls] = useState(Array(authors.length).fill(null));
  const [loadingIndices, setLoadingIndices] = useState(new Set());
  const [loadedCount, setLoadedCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [dialogAuthors, setDialogAuthors] = useState([]); // State to hold authors for the dialog

  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Media query for small screens
  const isMediumScreen = useMediaQuery('(max-width:960px)'); // Media query for medium screens

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
    const displayLimit = isSmallScreen ? 1 : isMediumScreen ? 2 : 3; // Adjust the number of authors to display based on screen size
    return {
      displayedAuthors: authors.slice(0, displayLimit),
      remainingAuthors: authors.slice(displayLimit),
    };
  }, [authors, isSmallScreen, isMediumScreen]);

  // Function to handle opening the dialog
  const handleDialogOpen = () => {
    setDialogAuthors(remainingAuthors); // Set the remaining authors in the dialog
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Stack spacing={1} direction={isSmallScreen ? 'column' : 'row'} alignItems="center">
      <Stack direction="row" spacing={isSmallScreen ? 1 : 2} alignItems="center">
        {displayedAuthors.map((author, index) => (
          <RouterLink to={`/researcher/${author.id}`} key={author.id} style={{ textDecoration: 'none' }}>
            <Chip
              avatar={
                loadingIndices.has(index) ? (
                  <CircularProgress size={24} />
                ) : (
                  <Avatar src={imageUrls[index]} alt={author.firstname.charAt(0)} />
                )
              }
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant={isSmallScreen ? 'body2' : 'body1'}>
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
              sx={{ fontSize: isSmallScreen ? '0.75rem' : '1rem' }} // Smaller text for smaller screens
              onClick={handleDialogOpen} // Open dialog on click
            />
          </RouterLink>
        ))}

        {remainingAuthors.length > 0 && (
          <AvatarGroup max={isSmallScreen ? 2 : 3}>
            <Tooltip title={`Show ${remainingAuthors.length} more authors`} onClick={handleDialogOpen}>
              <Avatar sx={{ cursor: 'pointer', width: isSmallScreen ? 24 : 30, height: isSmallScreen ? 24 : 30 }}>
                +{remainingAuthors.length}
              </Avatar>
            </Tooltip>
          </AvatarGroup>
        )}
      </Stack>

      {/* Dialog to show remaining authors */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Remaining Authors</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            {dialogAuthors.map((author) => (
              <RouterLink to={`/researcher/${author.id}`} key={author.id} style={{ textDecoration: 'none' }}>
                <Stack key={author.id} direction="row" alignItems="center" spacing={1}>
                  <Avatar src={imageUrls[authors.findIndex(a => a.id === author.id)]} alt={author.firstname.charAt(0)} />
                  <Typography variant="body1">
                    {author.firstname} {author.lastname}
                  </Typography>
                </Stack>
              </RouterLink>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default PostAuthors;
