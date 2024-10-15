import { CheckCircle, CloudUpload, Delete, PictureAsPdf, Public, PublicOff } from '@mui/icons-material';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Stack, styled, Switch, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useNewPublicationContext } from '../../context/NewPublicationProvider';
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
const PdfUpload = () => {
    const [checked, setChecked] = useState(true)
    const { updatePdfFile, updatePdfOnly, publication } = useNewPublicationContext()
    const [value, setValue] = useState('PUBLIC');
    const [fileUploaded, setFileUploaded] = useState(false);
    const inputRef = useRef(null);

    const deleteFile = () => {
        setFileUploaded(false)
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        updatePdfFile(null)
    }
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setFileUploaded(true);
            updatePdfFile(file)
        }
    };
    const handleDownload = () => {

        const file = publication.pdf.file;
        if (file) {
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };
    const handleChangeOnly = (event) => {
        setValue(event.target.value);
        updatePdfOnly(event.target.value);
    };
    const handleChange = (event) => {
        updatePdfOnly(event.target.checked ? "PUBLIC" : "NOT_PDF");
        setChecked(event.target.checked)
    };
    return (
        <Paper>
            <Stack p={3} spacing={1}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <PictureAsPdf sx={{ fontSize: 50, color: "primary.main" }} />
                    <Typography variant='h5' color="primary.main">
                        <b>
                            Upload PDF
                        </b>
                    </Typography>
                </Stack>

                <Typography>
                    If you want to upload the document you wish to publish in PDF format, please use the upload
                    button below. This will ensure that your document is securely
                    transmitted to our system and can be accessed from anywhere. Additionally, you can choose to publish your document as either public or private.
                </Typography>
                <Stack direction="row" alignItems="center">
                    <Switch

                        checked={publication.pdf.only == "NOT_PDF" ? false : true}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Typography>Do you want to upload a pdf?</Typography>
                </Stack>
                {publication.pdf.only != "NOT_PDF" && <Paper elevation={3}>
                    <Stack p={2} justifyContent="center" direction="row" >
                        <Grid container>
                            <Grid item md={6} sm={12}>
                                <Stack>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={value}
                                            onChange={handleChangeOnly}
                                        >
                                            <FormControlLabel sx={{ mb: 1 }} value="PUBLIC" control={<Radio />} label={<Stack>
                                                <Stack spacing={0.5} direction="row" alignItems="center">
                                                    <Public sx={{ color: "primary.main" }} />
                                                    <Typography color="primary.main"><b>Add only a public file</b></Typography>
                                                </Stack>
                                                <Typography variant='body2' color="gray">Upload a public file which everyone can access and read.</Typography>
                                                <Typography variant='body2' color="gray">Upload as a public file which everyone can download.</Typography>
                                            </Stack>} />
                                            <FormControlLabel value="PRIVATE" control={<Radio />} label={<Stack>
                                                <Stack spacing={0.5} direction="row" alignItems="center">
                                                    <PublicOff sx={{ color: "primary.main" }} />
                                                    <Typography color="primary.main"><b>Add only a private file</b></Typography>
                                                </Stack>
                                                <Typography variant='body2' color="gray">Save a private file as back up which only you and the co-authors can access.</Typography>
                                                <Typography variant='body2' color="gray">Upload as a private file which only you and the co-auhtors can download</Typography>
                                            </Stack>} />
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item md={6} sm={12}>
                                <Stack spacing={1} justifyContent={'center'} alignItems={'center'} height="100%" width="100%">
                                    {publication.pdf.file && <Typography
                                        name='previewImage'
                                        variant="body2"
                                        onClick={(e) => handleDownload()}
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                    >
                                        {publication.pdf.file.name}
                                    </Typography>}
                                    {!publication.pdf.file && <Button
                                        fullWidth
                                        sx={{ height: "60%" }}
                                        size='large'
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={fileUploaded ? <CheckCircle sx={{ fontSize: 100 }} /> : <CloudUpload />}
                                        disabled={fileUploaded}
                                    >
                                        {fileUploaded ? "PDF uploaded" : "Upload Pdf"}
                                        <VisuallyHiddenInput ref={inputRef} type="file" accept="application/pdf" onChange={handleFileUpload} />
                                    </Button>}
                                    {publication.pdf.file && <Button fullWidth onClick={deleteFile} variant='contained' color='error' startIcon={<Delete />}></Button>}
                                </Stack>

                            </Grid>
                        </Grid>
                    </Stack>

                </Paper>}
            </Stack>
        </Paper >
    )
}

export default PdfUpload