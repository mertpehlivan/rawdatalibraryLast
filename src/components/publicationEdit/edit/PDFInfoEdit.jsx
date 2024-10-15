import { CheckCircle, CloudUpload, Delete, PictureAsPdf, Public, PublicOff, Save } from '@mui/icons-material';
import { Button, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Stack, styled, Switch, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'; // Import Axios
import { useUserContext } from '../../../auth/AuthProvider';
import { uploadPdfFile } from '../../../services/publicationService';
import { LoadingButton } from '@mui/lab';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const PDFInfoEdit = ({ pdfFileResponse, pdfFileId, pdfDownload }) => {
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfStatus, setPdfStatus] = useState(pdfFileResponse.only);
  const [isPdfEnabled, setIsPdfEnabled] = useState(true);
  const [name, setName] = useState(pdfFileResponse.name);
  const [hasChanges, setHasChanges] = useState(false); // Track changes
  const inputRef = useRef(null);
  const { token } = useUserContext();

  useEffect(() => {
    if (!isPdfEnabled) {
      setPdfStatus("NOT_PDF");
    } else {
      setPdfStatus("PUBLIC");
    }
  }, [isPdfEnabled]);
  useEffect(() => {
    console.log(pdfFileResponse.only); // Check the initial value
    setPdfStatus(pdfFileResponse.only || "PUBLIC"); // Default to "PUBLIC" if no value
  }, [pdfFileResponse.only]); 
  useEffect(() => {
    // Check if there are any changes
    setHasChanges(fileUploaded || pdfStatus !== pdfFileResponse.only || !isPdfEnabled);
  }, [fileUploaded, pdfStatus, pdfFileResponse.only, isPdfEnabled]);

  const deleteFile = () => {
    setName(null);
    setFileUploaded(false);
    setPdfFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setHasChanges(true); // Deleting a file is a change
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFileUploaded(true);
      setPdfFile(file);
      setHasChanges(true); // File upload is a change
    }
  };

  const handleDownload = () => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleChangeOnly = (event) => {
    setPdfStatus(event.target.value);
    setHasChanges(true); // Changing status is a change
  };

  const handleChange = (event) => {
    setIsPdfEnabled(event.target.checked);
    if (!event.target.checked) {
      setPdfFile(null);
      setFileUploaded(false);
    }
    setHasChanges(true); // Toggling PDF upload state is a change
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const statusCode = await uploadPdfFile(token, pdfFileResponse.id, pdfFile, pdfStatus);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper>
      <Stack p={3} spacing={1}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <PictureAsPdf sx={{ fontSize: 50, color: 'primary.main' }} />
          <Typography variant="h5" color="primary.main">
            <b>Edit PDF</b>
          </Typography>
        </Stack>

        <Typography>
          If you want to upload the document you wish to publish in PDF format, please use the upload button below.
        </Typography>

        <Stack direction="row" alignItems="center">
          <Switch
            checked={isPdfEnabled}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography>Do you want to upload a PDF?</Typography>
        </Stack>

        {isPdfEnabled && (
          <Paper elevation={3}>
            <Stack p={2} justifyContent="center" direction="row">
              <Grid container>
                <Grid item md={6} sm={12}>
                  <Stack>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="pdf-status"
                        name="pdf-status"
                        value={pdfStatus} // Ensure this is being set correctly
                        onChange={handleChangeOnly}
                      >
                        <FormControlLabel
                          sx={{ mb: 1 }}
                          value="PUBLIC"
                          checked={pdfStatus == "PUBLIC"}
                          control={<Radio />}
                          label={
                            <Stack>
                              <Stack spacing={0.5} direction="row" alignItems="center">
                                <Public sx={{ color: 'primary.main' }} />
                                <Typography color="primary.main">
                                  <b>Add only a public file</b>
                                </Typography>
                              </Stack>
                              <Typography variant="body2" color="gray">
                                Upload a public file which everyone can access and read.
                              </Typography>
                            </Stack>
                          }
                        />
                        <FormControlLabel
                          value="PRIVATE"
                          checked={pdfStatus == "PRIVATE"}
                          control={<Radio />}
                          label={
                            <Stack>
                              <Stack spacing={0.5} direction="row" alignItems="center">
                                <PublicOff sx={{ color: 'primary.main' }} />
                                <Typography color="primary.main">
                                  <b>Add only a private file</b>
                                </Typography>
                              </Stack>
                              <Typography variant="body2" color="gray">
                                Save a private file as backup which only you and the co-authors can access.
                              </Typography>
                            </Stack>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid item md={6} sm={12}>
                  <Stack spacing={1} justifyContent="center" alignItems="center" height="100%" width="100%">
                    {pdfFile && (
                      <Typography
                        name="previewImage"
                        variant="body2"
                        onClick={name ? pdfDownload : handleDownload}
                        style={{ cursor: 'pointer', color: 'blue' }}
                      >
                        {pdfFile.name ? pdfFile.name : name}
                      </Typography>
                    )}
                    {!pdfFile && (
                      <Button
                        fullWidth
                        sx={{ height: '60%' }}
                        size="large"
                        component="label"
                        role={undefined}
                        variant="contained"
                        startIcon={fileUploaded ? <CheckCircle sx={{ fontSize: 100 }} /> : <CloudUpload />}
                        disabled={fileUploaded}
                      >
                        {fileUploaded ? 'PDF uploaded' : 'Upload PDF'}
                        <VisuallyHiddenInput ref={inputRef} type="file" accept="application/pdf" onChange={handleFileUpload} />
                      </Button>
                    )}
                    {pdfFile && (
                      <Button fullWidth onClick={deleteFile} variant="contained" color="error" startIcon={<Delete />}>
                        Delete PDF
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        )}
      </Stack>
      <Stack direction="row" spacing={1} p={1}>
        <Button onClick={() => window.location.reload()} fullWidth>Cancel</Button>
        <LoadingButton
          fullWidth
          disabled={!hasChanges} // Enable button only if there are changes
          variant='contained'
          startIcon={<Save />}
          loading={loading}
          onClick={handleSave}
        >
          Save
        </LoadingButton>
      </Stack>
    </Paper>
  );
};

export default PDFInfoEdit;
