import { DateRange, Language, LinkOutlined, LocationCity } from '@mui/icons-material';
import { Box, Chip, Divider, Stack, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPublicationTypeDetails } from './getPublicationTypeDetails';

const ChapterInABookPost = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is small (mobile)
  const { label, icon } = getPublicationTypeDetails(data.type); // Get label and icon based on the type

  return (
    <Stack spacing={1} p={isMobile ? 1 : 0} sx={{ width: '100%' }}>
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

        {/* Publisher Chip */}
        {data.publication.publisher && (
          <Chip
            sx={{ borderRadius: 2 }}
            icon={<LocationCity />}
            label={data.publication.publisher}
          />
        )}

        {/* Link to Chapter Chip */}
        {data.publication.linkOfTheChapter && (
          <Chip
            sx={{ borderRadius: 2 }}
            component={Link}
            to={data.publication.linkOfTheChapter}
            target='_blank'
            label={"Link of the chapter"}
            clickable
            icon={<LinkOutlined />}
          />
        )}
      </Stack>

      <Divider />
    </Stack>
  );
};

export default ChapterInABookPost;
