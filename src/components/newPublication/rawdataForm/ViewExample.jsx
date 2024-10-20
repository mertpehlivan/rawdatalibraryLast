import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { InsertDriveFile, Description, Download } from '@mui/icons-material';
import { Divider, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
const baseUrl = process.env.REACT_APP_BASE_URL;
const data = {
  "Experimental test result": [
    { name: "Stress-strain relationships-A1.xlsx", icon: <InsertDriveFile />, url: `${baseUrl}/api/v1/no-auth/file/public/Stress-strain relationships-A1.xlsx` },
  ],
  "Software": [
    { name: "python_code.ipynb", icon: <Description />, url: `${baseUrl}/api/v1/no-auth/file/public/python_code.ipynb` },
  ],
  "Questionnaire Survey": [
    { name: "Survey dataset.xlsx", icon: <InsertDriveFile />, url: `${baseUrl}/api/v1/no-auth/file/public/Survey dataset.xlsx` },
  ],
  "Guideline": [
    { name: "guideline.pdf", icon: <Description />, url: `${baseUrl}/api/v1/no-auth/file/public/guideline.pdf` },
  ],
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ViewExample({ handleClickOpen, handleClose, open, setOpen }) {
  const [loadingFile, setLoadingFile] = React.useState(null); // Track the loading file

  const handleDownload = async (file) => {
    setLoadingFile(file.name); // Set the loading file
    if (file) {
      try {
        // Request the file from the Spring Boot backend
        const response = await fetch(file.url);

        if (!response.ok) {
          throw new Error('Failed to download the file');
        }

        // Get the response as a blob
        const blob = await response.blob();

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Create a download link
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Release the URL
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoadingFile(null); // Reset loading state
      }
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          View Example
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div>
            {Object.keys(data).map((category, index) => (
              <div key={category}>
                <List subheader={<li>{category}</li>} style={{ marginBottom: '16px' }}>
                  {data[category].map((file, idx) => (
                    <ListItem
                      button
                      key={idx}
                      onClick={() => handleDownload(file)}
                      disabled={loadingFile === file.name} // Disable if currently loading
                    >
                      <ListItemIcon>
                        {file.icon}
                      </ListItemIcon>
                      <ListItemText primary={file.name} />
                      <ListItemIcon>
                        {loadingFile === file.name ? (
                          <CircularProgress size={24} />
                        ) : (
                          <Download />
                        )}
                      </ListItemIcon>
                    </ListItem>
                  ))}
                </List>
                {index < Object.keys(data).length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Okey
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
