import { Paper, Stack, Divider, useMediaQuery, useTheme, Box, Typography } from '@mui/material';
import React from 'react';
import { PostHeader } from './PostHeader';
import { PostComment } from './PostComment';
import PostShareByUser from './PostShareByUser';
import PostAuthors from './PostAuthors';
import PostActionButton from './PostActionButton';
import PostFolders from './PostFolders';
import PostChip from './PostChip';

const Post = ({ data, publicStatus = false }) => {
  const { publication } = data;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getTimeElapsed = (time) => {
    if (!time || isNaN(new Date(time))) {
        return null; // Geçersiz zaman durumunda uygun bir geri dönüş
    }

    const now = new Date();
    const createdAt = new Date(time);
    const elapsedSeconds = Math.floor((now - createdAt) / 1000);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (elapsedSeconds < 60) {
        return rtf.format(-elapsedSeconds, 'second');
    }
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    if (elapsedMinutes < 60) {
        return rtf.format(-elapsedMinutes, 'minute');
    }
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) {
        return rtf.format(-elapsedHours, 'hour');
    }
    const elapsedDays = Math.floor(elapsedHours / 24);
    return rtf.format(-elapsedDays, 'day');
};


  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 4,
        p: isSmallScreen ? 2 : 3, // Adjust padding based on screen size
        backgroundColor: 'background.default',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out',
        '&:hover': {
          transform: 'scale(1.026)',
          boxShadow: '0px 12px 36px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction={isSmallScreen ? 'column' : 'row'} // Change direction based on screen size
          justifyContent="space-between"
          alignItems="center"
        >
          <PostShareByUser shareByAuthor={data.shareByAuthor} />
          <PostActionButton data={data} />
        </Stack>

        <PostHeader variant={publicStatus ? 'h6' : 'h5'} title={publication.title} id={publication.id} />
        <PostComment variant={publicStatus && 'body1'} comment={publication.comment} />

        <Stack
          direction={isSmallScreen ? 'column' : 'row'} // Change direction based on screen size
          spacing={1}
          justifyContent="space-between"
        >
          <PostChip data={data} />
        </Stack>
        <PostFolders publicStatus ={publicStatus}  folders={data.folders} />
        {data.type !== "THESIS" && <PostAuthors authors={data.authors} />}
        <Divider />
        <Stack direction="row" alignContent="end">
          {getTimeElapsed(data.creationTime) && <Typography>{getTimeElapsed(data.creationTime)}</Typography>}
        </Stack>
      </Stack>

    </Paper>
  );
};

export default Post;
