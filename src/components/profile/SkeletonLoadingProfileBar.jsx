import { Avatar, Paper, Stack, Skeleton, Typography } from '@mui/material';
import React from 'react';

function SkeletonLoadingProfileBar() {
    return (
        <Paper elevation={6} sx={{ borderRadius: 3, p: 2, bgcolor: 'background.default' }}>
            <Stack direction="row" justifyContent="space-between">
                <Stack height={120} direction="row" alignItems="center" spacing={2}>
                    <Skeleton variant="circular" width={90} height={90} />
                    <Stack spacing={1}>
                        <Skeleton variant="text" width={100} />
                        <Skeleton variant="text" width={40}/>
                        <Skeleton variant="text" width={30} />
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default SkeletonLoadingProfileBar;
