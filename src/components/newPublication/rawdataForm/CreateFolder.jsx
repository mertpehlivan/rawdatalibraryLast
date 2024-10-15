import { CreateNewFolder } from '@mui/icons-material'
import { Button, Paper, Stack } from '@mui/material'
import React from 'react'
import { useNewPublicationContext } from '../../../context/NewPublicationProvider'

const CreateFolder = () => {
    const {addFolder,editFolderMode, editRawDataMode, folders} = useNewPublicationContext()
    const handleAddFolder = () =>{
        addFolder()
    }
    return (
        <Paper>
            <Stack>
                <Button disabled={editFolderMode || editRawDataMode } onClick={handleAddFolder} size='large' startIcon={<CreateNewFolder />}> {folders?.length > 0  
        ? "Upload another raw data variable for the same sample or study." 
        : "Upload raw data"}</Button>
            </Stack>
        </Paper>

    )
}

export default CreateFolder