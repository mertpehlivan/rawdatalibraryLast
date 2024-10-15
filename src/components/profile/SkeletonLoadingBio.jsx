import { Skeleton, Paper, Typography } from '@mui/material';

const SkeletonLoadingBio = () => {
    return (
        <Paper elevation={6} sx={{ p: 2, bgcolor: 'background.default' }}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="60%" />
        </Paper>
    );
};

export default SkeletonLoadingBio;
