import { DateRange, Language, LinkOutlined } from '@mui/icons-material';
import { Box, Chip, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPublicationTypeDetails } from './getPublicationTypeDetails';

const ConferencePaperPost = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if it's a mobile screen
  const { label, icon } = getPublicationTypeDetails(data.type); // Get label and icon based on the type

  // Date formatting function
  function formatDateToEnglish(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Example: "May 15, 2023"
  }

  // Capitalize the first letter of the string
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <Stack spacing={1} p={isMobile ? 1 : 0} sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        {/* Type and Icon Chip */}
        {label && icon && (
          <Chip
            sx={{ bgcolor: 'primary.main', color: 'background.default', borderRadius: 2 }}
            label={label}
            icon={icon}
          />
        )}

        {/* Date Chip */}
        {data.publication.date && (
          <Chip
            sx={{ borderRadius: 2 }}
            icon={<DateRange />}
            label={formatDateToEnglish(data.publication.date)}
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

        {/* Conference Link Chip */}
        {data.publication.linkOfTheConference && (
          <Chip
            sx={{ borderRadius: 2 }}
            component={Link}
            to={data.publication.linkOfTheConference}
            target='_blank'
            label={"Link of the conference"}
            clickable
            icon={<LinkOutlined />}
          />
        )}
      </Stack>

      {/* Conference Type */}
      {data.publication.conferenceType && (
        data.publication.conferenceType != "NOT_TYPE" && 
          <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Conference type: {capitalizeFirstLetter(data.publication.conferenceType)}
          </Typography>
        </Box>
      )}

      <Divider />
    </Stack>
  );
};

export default ConferencePaperPost;
