import { Divider, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import PostRawDataDetail from './PostRawDataDetail'
const PostFolderDetail = ({ folders }) => {
    return (
        <Stack spacing={1}>
            {
                folders.map(folder => (
                    <Paper key={folder.id}>
                        <Stack padding={2}>
                            <Typography fontWeight="bold" variant='h6'> {folder.name}</Typography>
                            <Divider/>
                            <PostRawDataDetail rawData={folder.rawData}/>
                        </Stack>
                    </Paper>
                ))

            }
        </Stack>

    )
}

export default PostFolderDetail