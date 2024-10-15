import React from 'react';
import { Paper, Stack, Typography, Divider, IconButton } from '@mui/material';
import { PictureAsPdf, Download, Public, PublicOff, Error, Edit } from '@mui/icons-material';

const PDFInfo = ({ publication, handleDownload, setStep, edit = false,handleEdit }) => {
    const pdfStatus = publication?.pdfFileResponse?.only || publication?.pdf?.only;

    return (
        <Paper>
            <Stack spacing={2} sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5" color="primary.main"><b>PDF Info</b></Typography>
                   
                        <IconButton onClick={edit ? ()=>{handleEdit("PDF_INFO")} : () => setStep(3)}>
                            <Edit />
                        </IconButton>
                    
                </Stack>
                <Stack width="100%">
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderRadius={3}
                        padding={2}
                        spacing={3}
                        bgcolor="background.paper"
                        boxShadow={3}
                    >
                        {pdfStatus === "NOT_PDF" ? (
                            <Stack alignItems="center">
                                <Error color='error' sx={{ fontSize: 40 }} />
                                <Typography color="error">
                                    <b>No PDF available. Your PDF file has not been uploaded. Uploading it is entirely up to you.</b>
                                </Typography>
                            </Stack>
                        ) : (
                            <>
                                <Stack width="50%" alignItems="center" justifyContent="center" spacing={1}>
                                    <Typography color="text.primary" variant="h6" align="center"><b>Status:</b></Typography>
                                    {pdfStatus === "PUBLIC" ? (
                                        <Stack width="100%" alignItems="center" justifyContent="center">
                                            <Public sx={{ color: "success.main", fontSize: 36 }} />
                                            <Typography color="success.main">Public</Typography>
                                        </Stack>
                                    ) : (
                                        <Stack width="100%" alignItems="center" justifyContent="center">
                                            <PublicOff sx={{ color: "error.main", fontSize: 36 }} />
                                            <Typography color="error.main">Private</Typography>
                                        </Stack>
                                    )}
                                </Stack>
                                <Divider orientation="vertical" flexItem />
                                <Stack
                                    onClick={handleDownload}
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={1}
                                    sx={{ cursor: 'pointer', color: 'primary.main' }}
                                >
                                    <PictureAsPdf sx={{ fontSize: 36 }} />
                                    <Typography variant="body1" align="center">
                                        {publication?.pdfFileResponse?.name || publication?.pdf?.file?.name}
                                    </Typography>
                                    <Download sx={{ fontSize: 24 }} />
                                </Stack>
                            </>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default PDFInfo;
