import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

export default function ImageDialog({ open, handleClose, selectedImage }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Full size"
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
      </Box>
    </Dialog>
  );
}
