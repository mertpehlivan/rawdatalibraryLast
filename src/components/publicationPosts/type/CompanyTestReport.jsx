import { DateRange, Language } from '@mui/icons-material';
import { Box, Chip, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { getPublicationTypeDetails } from './getPublicationTypeDetails';

const CompanyTestReportPost = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // To detect mobile screens
  const { label, icon } = getPublicationTypeDetails(data.type);

  // Date formatting function
  function formatDateToDayMonthYear(dateString) {
    if (!dateString) {
      return ''; // Return empty if no date
    }

    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return ''; // Return empty for invalid date
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <Stack spacing={isMobile ? 1 : 1.5} p={isMobile ? 1 : 0} sx={{ width: '100%' }}>
      <Stack direction="row" spacing={isMobile ? 0.5 : 1} alignItems="center" flexWrap="wrap">
        {/* Label Chip */}
        {label && icon && (
          <Chip sx={{ bgcolor: "primary.main", color: "background.default", borderRadius: 2 }} label={label} icon={icon} />
        )}

        {/* Date Chip */}
        {data.publication.date && (
          <Chip
            sx={{ borderRadius: 2 }}
            icon={<DateRange />}
            label={formatDateToDayMonthYear(data.publication.date)}
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
      </Stack>

      {/* Company Name */}
      {data.publication.companyName && (
        <Box sx={{ mt: isMobile ? 0.5 : 1 }}>
          <Typography variant="body2" color="text.secondary">
            Company name: {data.publication.companyName}
          </Typography>
        </Box>
      )}

      <Divider />
    </Stack>
  );
};

export default CompanyTestReportPost;
