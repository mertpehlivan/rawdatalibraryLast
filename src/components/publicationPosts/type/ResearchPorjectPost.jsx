import { DateRange, Language } from '@mui/icons-material';
import { Chip, Divider, Stack, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { getPublicationTypeDetails } from './getPublicationTypeDetails';

const ResearchProjectPost = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // For responsive behavior
  const { label, icon } = getPublicationTypeDetails(data.type); // Get label and icon based on the type

  // Date formatting function
  function formatDateToDayMonthYear(dateString) {
    if (!dateString) return ''; // Return empty string if date is not available

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return ''; // Return empty string if invalid date

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Example: "May 15, 2023"
  }

  return (
    <Stack spacing={isMobile ? 1 : 1.5} p={isMobile ? 1 : 0} sx={{ width: '100%' }}>
      <Stack direction="row" spacing={isMobile ? 0.5 : 1} alignItems="center" flexWrap="wrap">
        {/* Project Type and Icon */}
        {label && icon && (
          <Chip
            sx={{ bgcolor: 'primary.main', color: 'background.default', borderRadius: 2 }}
            label={label}
            icon={icon}
          />
        )}

        {/* Project Start and End Dates */}
        {(data.publication.beginningDate || data.publication.completedDate) && (
          <Chip
            sx={{ borderRadius: 2 }}
            icon={<DateRange />}
            label={`${formatDateToDayMonthYear(data.publication.beginningDate)} - ${formatDateToDayMonthYear(data.publication.completedDate) || 'Continues'}`}
          />
        )}

        {/* Language */}
        {data.publication.language && (
          <Chip
            sx={{ borderRadius: 2 }}
            icon={<Language />}
            label={data.publication.language}
          />
        )}
      </Stack>

      <Divider />
    </Stack>
  );
};

export default ResearchProjectPost;
