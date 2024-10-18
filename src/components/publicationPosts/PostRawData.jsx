import React, { useEffect, useState } from 'react';
import { Grid, Typography, Stack, Box, Tooltip, Paper, Chip, Dialog, IconButton, Divider } from '@mui/material';
import { FileIcon } from 'react-file-icon';
import { useTheme } from '@emotion/react';
import { fileExtensions } from './fileExtentionType';
import { getRawDataImage } from '../../services/imageServices';
import CloseIcon from '@mui/icons-material/Close';

const truncateName = (name, maxLength) => {
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + '...';
  }
  return name;
};

const PostRawData = ({ rawData, onDataCountChange, publicStatus = false }) => {
  const maxLength = 16;
  const theme = useTheme();
  const [imageUrls, setImageUrls] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Function to map file extension to category
  const findCategoryByExtension = (extension) => {
    for (const [category, extensions] of Object.entries(fileExtensions)) {
      if (extensions.includes(extension)) {
        return category;
      }
    }
    return 'document';
  };

  // rawData sayısını dışarıya iletmek için useEffect kullanıyoruz
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
    rawData.slice(0, 3).forEach((data) => {
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
      <Grid container spacing={1}>
        <Stack width="100%" spacing={1}>
          {publicStatus ?(rawData.slice(0, 1).map((data) => (
            <Grid item xs={12} key={data.id} p={1} borderRadius={3} sx={{":hover":{bgcolor:"#e1e1e1"}}}>
              <Stack alignItems="center" justifyContent="space-between" spacing={1.5} direction="row">
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
                  <Typography color="secondary">
                    {truncateName(data.name, maxLength)}
                  </Typography>
                </Tooltip>

                <Paper elevation={5}>
                  <Stack direction="row" spacing={1} p={0.2}>
                    <Tooltip
                      title={
                        imageUrls[data.id] ? (
                          <Box width={100} height={100} component="img" src={imageUrls[data.id]} alt={data.name} />
                        ) : (
                          'Loading image...'
                        )
                      }
                    >
                      <Box
                        borderRadius={1}
                        width={30}
                        height={30}
                        component="img"
                        src={imageUrls[data.id]}
                        alt={data.name}
                        onClick={() => handleOpen(imageUrls[data.id])}
                        style={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </Stack>
                </Paper>

              </Stack>
              <Divider sx={{mt:1}}/>
            </Grid>

          ))) :  (rawData.slice(0, 3).map((data) => (
            <Grid item xs={12} key={data.id} p={1} borderRadius={3} sx={{":hover":{bgcolor:"#e1e1e1"}}}>
              <Stack alignItems="center" justifyContent="space-between" spacing={1.5} direction="row">
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
                  <Typography color="secondary">
                    {truncateName(data.name, maxLength)}
                  </Typography>
                </Tooltip>

                <Paper elevation={5}>
                  <Stack direction="row" spacing={1} p={0.2}>
                    <Tooltip
                      title={
                        imageUrls[data.id] ? (
                          <Box width={100} height={100} component="img" src={imageUrls[data.id]} alt={data.name} />
                        ) : (
                          'Loading image...'
                        )
                      }
                    >
                      <Box
                        borderRadius={1}
                        width={30}
                        height={30}
                        component="img"
                        src={imageUrls[data.id]}
                        alt={data.name}
                        onClick={() => handleOpen(imageUrls[data.id])}
                        style={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </Stack>
                </Paper>

              </Stack>
              <Divider sx={{mt:1}}/>
            </Grid>

          )))}
        </Stack>
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

export default PostRawData;
