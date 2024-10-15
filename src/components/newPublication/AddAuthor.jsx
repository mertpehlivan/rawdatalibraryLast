import { Grid, Paper, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import SearchAuthor from './SearchAuthor';
import ListAuthor from './ListAuthor';

const AddAuthor = () => {
 
  return (
    <Paper style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
      <Stack spacing={2}>

        <Grid container spacing={1}>
          <Grid item md={6} sm={12}>
            <SearchAuthor />
          </Grid>
          <Grid item md={6} sm={12}>
            <ListAuthor />
          </Grid>
        </Grid>



      </Stack>
    </Paper>
  );
};

export default AddAuthor;
