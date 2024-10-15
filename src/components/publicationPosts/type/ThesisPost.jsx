import { DateRange, HistoryEdu, Language, School } from '@mui/icons-material';
import { Box, Chip, Divider, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import { getPublicationTypeDetails } from './getPublicationTypeDetails';

const ThesisPost = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is small (mobile)
  const { label, icon } = getPublicationTypeDetails(data.type); // Get label and icon based on the type

  // Format Month and Year "2023-01-03"
  const formatMonthAndYear = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // Return empty string for invalid date
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  // Format Thesis Degree
  const formatThesisDegree = (degree) => {
    if (!degree) return '';
    return degree
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Stack spacing={1} p={isMobile ? 1 : 0} sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        {/* Publication Type */}
        {label && icon && (
          <Chip
            sx={{ bgcolor: 'primary.main', color: 'background.default', borderRadius: 2 }}
            label={label}
            icon={icon}
          />
        )}

        {/* Month and Year */}
        {data.publication?.month && (
          <Chip
            sx={{ borderRadius: 2 }}
            icon={<DateRange />}
            label={formatMonthAndYear(data.publication.month)}
          />
        )}

        {/* Language */}
        {data.publication?.language && (
          <Chip
            sx={{ borderRadius: 2 }}
            icon={<Language />}
            label={data.publication.language}
          />
        )}

        {/* Thesis Degree */}
        {data.publication?.degree && (
          <Chip
            sx={{ borderRadius: 2 }}
            label={formatThesisDegree(data.publication.degree)}
            icon={< HistoryEdu/>}
          />
        )}
      </Stack>

      <Divider />
    </Stack>
  );
};

export default ThesisPost;
