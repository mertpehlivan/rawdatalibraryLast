import React, { useEffect, useState } from 'react';
import { Stack, Typography, Paper, Divider, Button, TextField, IconButton } from '@mui/material';
import { ArrowDownward, ArrowUpward, CheckBox, Delete, Edit, Folder, Save } from '@mui/icons-material';
import { useNewPublicationContext } from '../../../context/NewPublicationProvider';
import ViewExample from './ViewExample';
import GetRawData from './GetRawData';
import { Link } from 'react-router-dom';

const GetFolder = ({ onlyShow = false }) => {
    const { folders, deleteFolder, moveFolderUp, moveFolderDown, editFolderMode, setEditFolderMode, updateFolderName } = useNewPublicationContext();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (folders && folders.length > 0) {
            const hasEmptyFolder = folders.some(folder => !folder.name);
            setEditFolderMode(hasEmptyFolder);
        } else {
            setEditFolderMode(false);
        }
    }, [folders, setEditFolderMode]);

    const handleClickOpen = () => setOpen(true);

    const handleDeleteFolder = (index) => deleteFolder(index);

    const handleFolderNameChange = (index, newName) => {
        updateFolderName(index, newName);
    };

    const handleClose = () => setOpen(false);

    const handleMoveFolderDown = (folderOrder) => moveFolderDown(folderOrder);

    const handleMoveFolderUp = (folderOrder) => moveFolderUp(folderOrder);
    return (
        <Stack spacing={2}>
            <ViewExample handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} setOpen={setOpen} />
            {folders && folders.length > 0 ? (
                folders.map((folder, index) => (
                    <Paper key={index} elevation={3} sx={{ padding: 2 }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                <Folder sx={{ color: "primary.main" }} />
                                {onlyShow ?
                                    <Stack>
                                        <Typography >
                                            {folder.name}
                                        </Typography>
                                    </Stack>

                                    : <Stack direction="row">
                                        <TextField
                                            size='small'
                                            label="Type the name of the data"
                                            value={folder.name}
                                            onChange={(e) => handleFolderNameChange(index, e.target.value)}
                                        />
                                        <Stack direction="row">
                                            <CheckBox />
                                            <Typography>Manage file visibility</Typography>
                                        </Stack>

                                    </Stack>}
                            </Stack>

                            {!onlyShow && <Stack direction="row">
                                <Stack>
                                    <Button onClick={() => handleMoveFolderUp(index)} disabled={index === 0} size='small'>
                                        <ArrowUpward />
                                    </Button>
                                    <Button onClick={() => handleMoveFolderDown(index)} disabled={index === folders.length - 1} size='small'>
                                        <ArrowDownward />
                                    </Button>
                                </Stack>
                                <Button onClick={() => handleDeleteFolder(index)} startIcon={<Delete />}></Button>
                            </Stack>}
                        </Stack>
                        <Divider />
                        <GetRawData onlyShow={onlyShow} order={index} />
                    </Paper>
                ))
            ) : (
                <Paper sx={{ borderRadius: 3 }}>
                    <Stack p={2} spacing={1}>
                        <Typography color="primary.main" variant='h5' fontWeight="bold">Upload Raw Data</Typography>
                        <Typography variant='h6'>
                            Firstly, to maintain your work in an organized and systematic manner, it is essential to create different folders within your project scope.
                            Each folder should cover a specific area or file type of your project, allowing you to collect and store your data under specific headings.
                            This method makes your data more easily accessible and provides order.
                        </Typography>
                        <Typography variant='h6'>
                            Raw data can be uploaded in different formats (e.g., Excel, Sap 2000, Matlab, Java, Abaqus, SPSS files ext.). <b>If it is a questionary survey</b>, upload all the forms as a merged pdf file.
                            If it is a software modelling upload it as a zip file.
                        </Typography>
                        <Typography variant='h6'>
                            Preview images for raw data are needed to be uploaded by authors.
                            It would be useful to upload an image that gives an idea of what other researchers will have if the corresponding data or model are purchased. The images to be uploaded can sometimes be a graphic image, sometimes an image of software code on a computer, and sometimes an image showing a single page of an entire survey.
                            For questionary survey, upload the first page of the survey form as a jpg image : <b><Link onClick={handleClickOpen}>view example</Link></b>
                        </Typography>
                    </Stack>
                </Paper>
            )}
        </Stack>
    );
};

export default GetFolder;
