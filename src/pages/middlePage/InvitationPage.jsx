import React, { useState } from 'react';
import { Paper, Stack, Button, ButtonGroup, useTheme, Container, Typography } from '@mui/material';
import { GroupAdd, MailOutline } from '@mui/icons-material';
import CoAuthorRequestList from '../../components/invitations/CoAuthorRequestList';
import CoAuthorInvitationList from '../../components/invitations/CoAuthorInvitationList';

const InvitationPage = () => {
  const [selected, setSelected] = useState('request');
  const theme = useTheme(); // Tema nesnesini almak için

  const handleButtonClick = (type) => {
    setSelected(type);
  };

  return (

    <Stack spacing={1}>
      <Paper elevation={4} style={{ padding: '10px', borderRadius: '8px' }}>
        <Stack direction="row" spacing={1}>
          <ButtonGroup variant="contained" fullWidth>
            <Button
              startIcon={<GroupAdd />}
              style={{
                backgroundColor: selected === 'request' ? theme.palette.primary.main : theme.palette.grey[300],
                color: selected === 'request' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                borderRadius: '8px 0 0 8px',
              }}
              onClick={() => handleButtonClick('request')}
            >
              Co-author Request
            </Button>
            <Button
              startIcon={<MailOutline />}
              style={{
                backgroundColor: selected === 'invitation' ? theme.palette.primary.main : theme.palette.grey[300],
                color: selected === 'invitation' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                borderRadius: '0 8px 8px 0',
              }}
              onClick={() => handleButtonClick('invitation')}
            >
              Co-author Invitation
            </Button>
          </ButtonGroup>
        </Stack>
      </Paper>
      <Paper elevation={4} style={{ padding: '20px', borderRadius: '8px' }}>
        {
          selected === 'request' ? (
            <CoAuthorRequestList />
          ) : selected === 'invitation' ? <CoAuthorInvitationList /> : (
            <Typography variant="body1" color="textSecondary">
              No invitations at the moment.
            </Typography>
          )
        }
      </Paper>
    </Stack>

  );
};

export default InvitationPage;
