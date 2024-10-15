import { ExpandLess, ExpandMore, More, ReadMore, ReadMoreOutlined } from '@mui/icons-material';
import { Typography, Button, Box, Stack } from '@mui/material';
import React, { useState } from 'react';

export const PostComment = ({ comment, maxLength = 155, variant = 'h6' }) => {
  const [expanded, setExpanded] = useState(false);

  // Truncate comment if it exceeds maxLength
  const displayComment = comment.length > maxLength
    ? `${comment.substring(0, maxLength)}...`
    : comment;

  return (
    <Stack>
      <Typography
        variant={variant}
        color="gray"
      >
        {expanded ? comment : displayComment}
        {comment.length > maxLength && (
          <Button
            startIcon={expanded ? <ExpandLess /> : <ExpandMore />}
            onClick={() => setExpanded(!expanded)}
            variant='text'
            color='primary'
          >
            {expanded ? 'Show Less' : 'Read More'}
          </Button>
        )}
      </Typography>

    </Stack>
  );
};
