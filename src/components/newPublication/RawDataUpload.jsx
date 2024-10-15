import { Stack } from '@mui/material'
import React from 'react'
import CreateFolder from './rawdataForm/CreateFolder'
import GetFolder from './rawdataForm/GetFolder'


const RawDataUpload = () => {
  return (
    <Stack spacing={2}>
        <GetFolder/>
        <CreateFolder/>
    </Stack>
  )
}

export default RawDataUpload