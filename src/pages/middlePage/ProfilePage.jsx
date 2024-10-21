import { Stack } from '@mui/material'
import React from 'react'
import PublicationTable from '../../components/profile/PublicationTable'

const ProfilePage = () => {
  return (
    <Stack spacing={1}>
      <PublicationTable /> {/* Pass publications to the table */}
    </Stack>
  )
}

export default ProfilePage