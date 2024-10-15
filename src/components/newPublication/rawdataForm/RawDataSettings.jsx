import { ArrowDownward, ArrowUpward, Delete, Edit } from '@mui/icons-material'
import { Button, ButtonGroup, Divider, Grid, Stack } from '@mui/material'
import React from 'react'
import { useNewPublicationContext } from '../../../context/NewPublicationProvider'

const RawDataSettings = ({folderIndex,rawDataIndex}) => {
  const {removeRawData} =  useNewPublicationContext()
  return (
    <></>
  )
}

export default RawDataSettings