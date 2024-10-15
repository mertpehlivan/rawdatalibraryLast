import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, Box, Divider, Stack, Tooltip, Paper, Button } from '@mui/material';
import PostRawData from './PostRawData';

const truncateName = (name, maxLength) => {
    if (name.length > maxLength) {
        return name.substring(0, maxLength) + '...';
    }
    return name;
};

const PostFolders = ({ folders,publicStatus }) => {
    const maxLength = 25;
    const [rawDataCount, setRawDataCount] = useState(0)
    const [folderCount, setFolderCount] = useState(folders.length || 0);
    if (!folders || folders.length === 0) {
        return (
            <>
            </>
        );
    }
    const onDataCountChange = (count) => {
        setRawDataCount(prev => prev + count)
    }
    return (

        <Paper elevation={3} sx={{ padding: 2, borderRadius: 3 }}>
            <Grid container spacing={2} justifyContent="center">
                {folders.slice(0,3).map((folder) => (
                    <Grid item key={folder.id} xs={12} sm={12} md={4}>
                        <Stack spacing={0.5}>
                            <Tooltip title={folder.name} arrow>
                                <Typography variant={publicStatus ? 'body1' : 'h6'}>
                                    {truncateName(folder.name, maxLength)}
                                </Typography>
                            </Tooltip>
                            <Divider />
                            <PostRawData publicStatus={publicStatus} onDataCountChange={onDataCountChange} rawData={folder.rawData} />
                        </Stack>
                    </Grid>
                ))}

            </Grid>

            <Divider  sx={{my:1}}/>
            
            <Typography color="gray">There are <b>{folderCount}</b> different data variables and a total of <b>{rawDataCount}</b> raw data.</Typography>
        </Paper>
    );
};

export default PostFolders;
