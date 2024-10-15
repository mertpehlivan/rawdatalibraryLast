import { Stack } from '@mui/material'
import React from 'react'
import PublicationTable from '../../components/profile/PublicationTable'

const PublicationPage = () => {
  return (
    <Stack spacing={1}>
      <PublicationTable /> {/* Pass publications to the table */}
    </Stack>
  )
}

export default PublicationPage