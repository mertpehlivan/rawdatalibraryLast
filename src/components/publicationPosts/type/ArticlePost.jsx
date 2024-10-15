import { Article, DateRange, Language, LinkOutlined } from '@mui/icons-material';
import { Box, Chip, Divider, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPublicationTypeDetails } from './getPublicationTypeDetails';

const ArticlePost = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is small (mobile)
  const { label, icon } = getPublicationTypeDetails(data.type); // Get label and icon based on the type

  return (
    <Stack spacing={1} p={isMobile ? 0 : 0} sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        {/* Type Chip */}
        {label && icon && (
          <Chip
            sx={{ bgcolor: 'primary.main', color: 'background.default', borderRadius: 2 }}
            label={label}
            icon={icon}
          />
        )}

        {/* Year Chip */}
        {data.publication.year && (
          <Chip
            sx={{ borderRadius: 2 }}
            icon={<DateRange />}
            label={data.publication.year}
          />
        )}

        {/* Language Chip */}
        {data.publication.language && (
          <Chip
            sx={{ borderRadius: 2 }}
            icon={<Language />}
            label={data.publication.language}
          />
        )}

        {/* Link Chip */}
        {data.publication.linkOfThePaper && (
          <Chip
            sx={{ borderRadius: 2}}
            component={Link}
            to={data.publication.linkOfThePaper}
            target="_blank"
            label={"Link of the paper"}
            clickable
            icon={<LinkOutlined />}
          />
        )}
      </Stack>

      {/* Indexing Information */}
      {data.publication.indexing && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Indexing information: {data.publication.indexing}
          </Typography>
        </Box>
      )}
      
      <Divider />
    </Stack>
  );
};

export default ArticlePost;
