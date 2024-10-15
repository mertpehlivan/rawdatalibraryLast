import React, { useEffect, useState } from 'react';
import { Grid, Typography, Stack, Box, Tooltip, Paper, Button, Dialog, IconButton } from '@mui/material';
import { FileIcon } from 'react-file-icon';
import { useTheme } from '@emotion/react';
import { fileExtensions } from './fileExtentionType';
import { getRawDataImage } from '../../services/imageServices';
import CloseIcon from '@mui/icons-material/Close';
import { PostComment } from './PostComment';
import { ShoppingBasket, ZoomIn } from '@mui/icons-material';

const truncateName = (name, maxLength) => {
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + '...';
  }
  return name;
};

const PostRawDataDetail = ({ rawData, onDataCountChange }) => {
  const maxLength = 16;
  const theme = useTheme();
  const [imageUrls, setImageUrls] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [hoveredImageId, setHoveredImageId] = useState(null); // Track which image is being hovered over

  // Function to map file extension to category
  const findCategoryByExtension = (extension) => {
    for (const [category, extensions] of Object.entries(fileExtensions)) {
      if (extensions.includes(extension)) {
        return category;
      }
    }
    return 'document';
  };

  useEffect(() => {
    if (onDataCountChange) {
      onDataCountChange(rawData.length);
    }
  }, [rawData]);

  // Fetch image and store it as a blob URL
  const fetchImage = async (id) => {
    try {
      const imageBlob = await getRawDataImage(id);
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setImageUrls((prev) => ({ ...prev, [id]: imageObjectUrl }));
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  // Fetch images when rawData changes
  useEffect(() => {
    rawData.forEach((data) => {
      if (!imageUrls[data.id]) {
        fetchImage(data.id);
      }
    });

    // Cleanup blob URLs when component unmounts
    return () => {
      Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [rawData]);

  const handleOpen = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  return (
    <>
      <Grid container spacing={1} p={1}>
        {rawData.map((data) => (
          <Grid
            item
            md={3}
            sm={12}
            key={data.id}
            p={2}
            borderRadius={3}
            sx={{ ":hover": { bgcolor: "#e1e1e1" } }}
          >
            <Paper sx={{ p: 1, borderRadius: 3 }} elevation={3}>
              <Stack direction="row" p={1} alignItems="center" spacing={1}>
                <Box width={30} height={30}>
                  <FileIcon
                    extension={data.rawDataEx}
                    color={theme.palette.primary.main}
                    foldColor={theme.palette.secondary.main}
                    glyphColor="white"
                    type={findCategoryByExtension(`.${data.rawDataEx}`)}
                  />
                </Box>

                <Tooltip title={data.name}>
                  <Typography color="secondary" fontWeight="bold">
                    {truncateName(data.name, maxLength)}
                  </Typography>
                </Tooltip>
              </Stack>

              <Stack direction="row" spacing={1} p={1}>
                <Box
                  position="relative"
                  onMouseEnter={() => setHoveredImageId(data.id)} // Set hover state for the specific image
                  onMouseLeave={() => setHoveredImageId(null)} // Reset hover state
                >
                  <Box
                    width={"100%"}
                    height={200}
                    component="img"
                    src={imageUrls[data.id]}
                    alt={data.name}
                    onClick={() => handleOpen(imageUrls[data.id])}
                    style={{
                      cursor: 'pointer',
                      filter: hoveredImageId === data.id ? 'brightness(50%)' : 'none', // Darkens only when hovered
                      transition: 'filter 0.3s ease',
                    }}
                  />

                  {/* Magnifying Glass Icon */}
                  {hoveredImageId === data.id && (
                    <Box
                      position="absolute"
                      top="30%"
                      left="30%"
                      transform="translate(-50%, -50%)"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1
                      }}
                    >
                      <IconButton  onClick={() => handleOpen(imageUrls[data.id])}>
                        <ZoomIn sx={{ width: 100, height: 100, color: 'white'}} />
                      </IconButton>

                    </Box>
                  )}
                </Box>
              </Stack>

              <PostComment variant="body1" maxLength={30} comment={data.comment} />
              <Paper elevation={3} sx={{ p: 1 }}>
                <Stack direction="row" spacing={1} justifyContent="space-around">
                  <Typography variant="h4">{data.priceSuggestion}$</Typography>
                  <Button variant="contained">
                    <ShoppingBasket />
                  </Button>
                </Stack>
              </Paper>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Modal to display the full image */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <IconButton
          onClick={handleClose}
          edge="end"
          color="inherit"
          aria-label="close"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </Box>
      </Dialog>
    </>
  );
};

export default PostRawDataDetail;
