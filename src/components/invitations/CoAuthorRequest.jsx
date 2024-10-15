import React, { useState } from 'react';
import { Button, Stack, Typography, Paper, useTheme, Avatar, Snackbar, Alert } from '@mui/material';
import { Check, Clear, Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { confirmCoAuthorInvitation, rejectCoAuthorInvitation } from '../../services/invitationServices';
import PublicationLink from '../PublicationLink'

const CoAuthorRequest = ({setRefresh, data, token }) => {
  const theme = useTheme(); // Get theme object
  const [open, setOpen] = useState(false); // Snackbar open state
  const [message, setMessage] = useState(''); // Snackbar message




  const handleConfirm = async () => {
    try {
      await confirmCoAuthorInvitation(token, data.id);
      // Show success message
      setMessage('Co-author invitation confirmed successfully.');
      setOpen(true);
      setRefresh(prev=>!prev)
    } catch (error) {
      // Show error message
      console.error('Error confirming co-author invitation:', error);
      setMessage('Failed to confirm co-author invitation.');
      setOpen(true);
    }
  };

  const handleReject = async () => {
    try {
      await rejectCoAuthorInvitation(token, data.id);
      // Show success message
      setMessage('Co-author invitation rejected successfully.');
      setOpen(true);
      setRefresh(prev=>!prev)
    } catch (error) {
      // Show error message
      console.error('Error rejecting co-author invitation:', error);
      setMessage('Failed to reject co-author invitation.');
      setOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  // Calculate time elapsed
  const getTimeElapsed = () => {
    const now = new Date();
    const createdAt = new Date(data.createdOn);
    const elapsedSeconds = Math.floor((now - createdAt) / 1000);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (elapsedSeconds < 60) {
      return rtf.format(-elapsedSeconds, 'second');
    }
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    if (elapsedMinutes < 60) {
      return rtf.format(-elapsedMinutes, 'minute');
    }
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) {
      return rtf.format(-elapsedHours, 'hour');
    }
    const elapsedDays = Math.floor(elapsedHours / 24);
    return rtf.format(-elapsedDays, 'day');
  };
  return (
    <>
      <Paper
        elevation={3}
        style={{
          padding: '30px',
          margin: '2px 0',
          borderRadius: '8px',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          position: 'relative', // Add position relative to the Paper for absolute positioning of time
        }}
      >

        <Avatar
          alt="Sender"
          src="/path/to/avatar.jpg" // Replace with the correct path to the avatar
          style={{
            width: 40,
            height: 40,
            marginRight: '16px',
          }}
        />
        <Stack flexGrow={1} spacing={2}>
         {data.type == "COAUTHOR_REQUEST" && <Typography>
            Dear {data.receiverUser.lastname}, <Link to={`/researcher/${data.senderUser.id}`}>{data.senderUser.firstname} {data.senderUser.lastname}</Link> requests to add the <PublicationLink id ={data.publication.id} title={data.publication.title} /> study as a co-author.
          </Typography>}
          {data.type == "COAUTHOR_INVITATION" && <Typography>
            Dear {data.receiverUser.lastname}, <Link>{data.senderUser.firstname} {data.senderUser.lastname}</Link> would like to add you as a co-author in the publication titled  <PublicationLink id ={data.publication.id} title={data.publication.title} />.
          </Typography>}
          {
            data.status === "PENDING" ? (
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  style={{ flexGrow: 1 }}
                  startIcon={<Check />}
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  style={{ flexGrow: 1 }}
                  startIcon={<Close />}
                  onClick={handleReject}
                >
                  Reject
                </Button>
              </Stack>
            ) : data.status === "REJECTED" ? (
              <Stack direction="row" alignItems="center" spacing={0.5} color="red">
                <Clear />
                <Typography >
                  This invitation has been rejected.
                </Typography>
              </Stack>
            ) : data.status === "CONFIRMED" ? (
              <Stack direction="row" alignItems="center" spacing={0.5} color="green">
                <Check />
                <Typography>
                  This invitation has been confirmed.
                </Typography>
              </Stack>

            ) : null
          }

        </Stack>
        <Stack direction="row" justifyContent="end" alignItems="end">
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ position: 'absolute', bottom: '10px', right: '10px' }} // Position the time in the top-right corner
          >
            {getTimeElapsed()}
          </Typography>
        </Stack>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CoAuthorRequest;
