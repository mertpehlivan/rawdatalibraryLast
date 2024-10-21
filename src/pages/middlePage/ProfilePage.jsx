import { Stack } from '@mui/material'
import React from 'react'
import PublicationTable from '../../components/profile/PublicationTable'
import BarChartBox from '../../components/profile/BarChartBox'

const ProfilePage = () => {
  return (
    <Stack spacing={1}>
      <BarChartBox/>
      <PublicationTable /> {/* Pass publications to the table */}
    </Stack>
  )
}

export default ProfilePage