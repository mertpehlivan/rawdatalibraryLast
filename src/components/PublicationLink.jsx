import React from 'react';
import { Link, Tooltip, Typography } from '@mui/material';

// Define the truncate function
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const PublicationLink = ({ title,id }) => {
  // Truncate the title to 24 characters
  const truncatedTitle = truncateText(title, 24);

  return (
    <Tooltip title={title} arrow>
      <Typography display="inline" color="primary.main">
      <Link
       
        href={`/publication/${id}`}
        style={{
          textDecoration: 'none',
          fontWeight: 'bold', // Make text bold
        }}
        underline="none" // Ensure no default underline
        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
      >
        {truncatedTitle}
      </Link>
      </Typography>
    </Tooltip>
  );
};

export default PublicationLink;
