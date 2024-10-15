import { Avatar, Chip, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useUserContext } from '../../auth/AuthProvider'
import UserProfileComponent from '../profile/UserProfileComponent'

const CurretUserBox = () => {
    const { user } = useUserContext()
    return (
        <Paper sx={{borderRadius:3}}>
            <Stack px={2} >
                <UserProfileComponent avatarSize={65} user={user} nameVariant='body1' bioSize='body2' />
            </Stack>
        </Paper>

    )
}

export default CurretUserBox