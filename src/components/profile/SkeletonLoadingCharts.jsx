import { Skeleton, Box } from '@mui/material';

const SkeletonLoadingCharts = () => {
    return (
        <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton variant="rectangular" height={200} sx={{ mt: 2 }} />
        </Box>
    );
};

export default SkeletonLoadingCharts;
