import { Add } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import React from 'react'
import { useNewPublicationContext } from '../../../context/NewPublicationProvider'

const CreateRawData = ({order}) => {
  const {addRawData,editRawDataMode} = useNewPublicationContext()
  return (
    <Stack justifyContent="center" alignItems="center" direction="row" >
        <Button disabled={editRawDataMode} onClick={()=>addRawData(order)} variant='outlined' startIcon={<Add/>}>Add Raw data</Button>
    </Stack>
  )
}

export default CreateRawData