import { Folder } from '@mui/icons-material'
import { Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import RawDataTable from './RawDataTable'

const RawDataInfo = ({ folders }) => {
    const [foldersList,setFoldersList] = useState(folders)
    return (
        <Paper elevation={1}>
            <Stack spacing={2} p={1}>
                {
                    foldersList.map((folder) => (
                        <Paper elevation={1} key={folder.id}>
                            <Stack>
                                <Stack p={1}>
                                    <Stack p={1} alignItems="center" direction="row" spacing={0.5}>
                                        <Folder color='primary' />
                                        <Typography color="primary" variant='h6'>{folder.name}</Typography>
                                    </Stack>
                                    <RawDataTable rawData={folder.rawData}/>
                                </Stack>
                            </Stack>


                        </Paper>
                    ))
                }
            </Stack>
        </Paper>

    )
}

export default RawDataInfo