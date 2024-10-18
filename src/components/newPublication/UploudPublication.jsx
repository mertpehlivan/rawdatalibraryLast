import { Avatar, Box, Button, Divider, Grid, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../auth/AuthProvider';
import { useNewPublicationContext } from '../../context/NewPublicationProvider';
import { createPublication } from '../../services/publicationService';
import { Download, Edit, Error, EventAvailable, Person, PictureAsPdf, Public, PublicOff, Publish, Share } from '@mui/icons-material';
import GetRawData from './rawdataForm/GetRawData';
import GetFolder from './rawdataForm/GetFolder';
import { upload } from '@testing-library/user-event/dist/upload';
import Logo from '../../assets/logo 1.svg'
import { getProfileImage } from '../../services/imageServices';
const UploadPublication = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const { user, token } = useUserContext();
    const { publication, folders, setStep, authors, addAuthor } = useNewPublicationContext();
    const [comment, setComment] = useState("")
    const [references, setReferences] = useState("")
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchImages = async () => {
            const urls = await Promise.all(
                authors.map(async (author) => {
                    try {
                        const imageBlob = await getProfileImage(author.id);
                        return { id: author.id, url: URL.createObjectURL(imageBlob) };
                    } catch (error) {
                        return { id: author.id, url: null };
                    }
                })
            );
            const newImageUrls = urls.reduce((acc, img) => ({ ...acc, [img.id]: img.url }), {});
            setImageUrls(newImageUrls);
        };

        fetchImages();
    }, [authors]);
    useEffect(() => {
        if (publication.type === "Thesis" && authors.length === 0) {
            addAuthor(user);
        }
    }, [publication.type, authors, user, addAuthor]);
    useEffect(() => {
        // Iterate over the publication data and set the comment state if the key is "comment"
        Object.keys(publication.data).forEach((value) => {
            if (value === "comment") {
                setComment(publication.data[value]);
            }
            if (value === "references") {
                setReferences(publication.data[value]);
            }
        });
    }, [publication.data]);

    const formatLabel = (label) => {
        return label
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Add a space between camelCase words
            .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
    }
    const handleSubmit = async () => {



        const formData = new FormData();

        // Eklenen alanlar
        formData.append('publicationType', publication.type);

        Object.keys(publication.data).forEach(key => {
            formData.append(`publication.${key}`, publication.data[key]);
        });
        authors.forEach((author, index) => {
            Object.keys(author).forEach(key => {
                formData.append(`authors[${index}].${key}`, author[key]);
            });
        });


        // PDF dosyası ekleme
        formData.append('pdf.only', publication.pdf.only);
        if (publication.pdf.file) {
            formData.append('pdf.file', publication.pdf.file);
        }

        // Klasör ve rawData ekleme
        folders.forEach((folder, folderIndex) => {
            formData.append(`folders[${folderIndex}].name`, folder.name);
            folder.rawDatas.forEach((rawData, rawDataIndex) => {
                formData.append(`folders[${folderIndex}].rawData[${rawDataIndex}].name`, rawData.name);
                formData.append(`folders[${folderIndex}].rawData[${rawDataIndex}].comment`, rawData.comment);
                formData.append(`folders[${folderIndex}].rawData[${rawDataIndex}].previewImage`, rawData.previewImage);
                formData.append(`folders[${folderIndex}].rawData[${rawDataIndex}].rawData`, rawData.rawdata);
                formData.append(`folders[${folderIndex}].rawData[${rawDataIndex}].priceSuggestion`, rawData.price_suggestion);
            });
        });

        console.log(publication)

        try {
            await createPublication(token, formData, publication.type, (progress) => {
                setUploadProgress(progress);
            });
            setCompleted(true)
            console.log('Publication created successfully');
        } catch (error) {
            console.error('Error creating publication:', error);
        }
    };
    const normalizeText = (text) =>
        text
            ? text
                .toLowerCase()
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            : '';

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
    return (
        <Stack spacing={2}>
            {!uploadProgress > 0 && <>
                <Paper>
                    <Stack spacing={2} sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h5" color="primary.main"><b>Publication Info</b></Typography>
                            <IconButton onClick={() => setStep(1)}>
                                <Edit />
                            </IconButton>
                        </Stack>
                        <Grid container>
                            {Object.keys(publication.data).map((key, index) => {
                                const formattedKey = key
                                    .replace(/([a-z])([A-Z])/g, '$1 $2')  // CamelCase'i ayır
                                    .toLowerCase()                        // Tamamını küçük harf yap
                                    .replace(/^\w/, c => c.toUpperCase()); // İlk harfi büyük yap

                                if (key !== "comment" && key !== "references") {
                                    return (
                                        <Grid item md={6} sm={12} key={index}>
                                            <Stack>
                                                <Typography color="primary.main"><b>{formattedKey}:</b></Typography>
                                                <Typography>{` ${publication.data[key]}`}</Typography>
                                            </Stack>
                                        </Grid>
                                    );
                                }
                                return null; // This ensures that nothing is returned for "comment" and "references"
                            })}
                            <Grid item md={12} sm={12} mt={2}>
                                <Stack>
                                    <Typography color="primary.main"><b>Abstract</b></Typography>
                                    <Typography>{comment}</Typography>
                                </Stack>
                            </Grid>
                            <Grid item md={12} sm={12} mt={2}>
                                <Stack>
                                    <Typography color="primary.main"><b>References</b></Typography>
                                    <Typography>{references}</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Paper>
                {publication.type != "Thesis" && <Paper>
                    <Stack spacing={2} sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h5" color="primary.main" ><b> Researchers list</b></Typography>
                            <IconButton onClick={() => setStep(2)}>
                                <Edit />
                            </IconButton>
                        </Stack>
                        <List>
                            {authors.map((author, index) => (
                                <React.Fragment key={index}>
                                    {publication.type === "Research project" && (
                                        <Typography>
                                            <b>{normalizeText(author.authorRole)}:</b>
                                        </Typography>
                                    )}
                                    <ListItem style={{ backgroundColor: '#f9f9f9', borderRadius: 8 }}>
                                        <ListItemAvatar>
                                            <Avatar src={imageUrls[author.id] || null} alt={author.firstname} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${author.firstname} ${author.lastname}`}
                                            secondary={`ID: ${author.id}`}
                                        />
                                    </ListItem>
                                    <Divider style={{ margin: '10px 0' }} />
                                </React.Fragment>
                            ))}
                        </List>
                    </Stack>
                </Paper>}
                <Paper>
                    <Stack spacing={2} sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h5" color="primary.main" ><b> PDF info</b></Typography>
                            <IconButton onClick={() => setStep(3)}>
                                <Edit />
                            </IconButton>
                        </Stack>

                        <Stack width="100%" >
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
                                {publication.pdf.only === "NOT_PDF" ?
                                    <Stack alignItems="center">
                                        <Error color='error' sx={{ fontSize: 40 }} />
                                        <Typography color="error">
                                            <b>
                                                PDF file has not been uploaded.
                                            </b>
                                        </Typography>
                                    </Stack> : <><Stack width="50%" alignItems="center" justifyContent="center" spacing={1}>
                                        <Typography color="text.primary" variant="h6" align="center"><b>Status:</b></Typography>
                                        {publication.pdf.only === "PUBLIC" ? (
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
                                            <Typography variant="body1" align="center">{publication.pdf.file.name}</Typography>
                                            <Download sx={{ fontSize: 24 }} />
                                        </Stack></>}
                            </Stack>

                        </Stack>

                    </Stack>
                </Paper>
                <Paper >
                    <Stack spacing={2} sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h5" color="primary.main" ><b> Raw data info</b></Typography>
                            <IconButton onClick={() => setStep(4)}>
                                <Edit />
                            </IconButton>
                        </Stack>
                        <Stack>
                            <GetFolder onlyShow={true} />
                        </Stack>

                    </Stack>
                </Paper>
            </>}

            <Paper >
                <Stack alignItems="center">
                    <Box width={300} component="img" src={Logo} alt='logo' />
                </Stack>
                {completed && <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 2 }}>
                    <Stack spacing={2}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Publication Upload Completed
                        </Typography>
                        <Typography variant="body1">
                            Your publication has been successfully uploaded. You can return to the homepage to explore more research.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            href="/" // Replace with your homepage link
                        >
                            Return to Homepage and Continue Exploring
                        </Button>
                    </Stack>
                </Paper>}
                {!completed && <Stack spacing={2} sx={{ p: 2 }}>
                    {uploadProgress > 0 && (
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" value={uploadProgress} />
                            <Typography variant="body2" color="textSecondary" align="center">
                                {uploadProgress}%
                            </Typography>
                        </Box>
                    )}
                    <Button startIcon={<Publish />} variant="contained" color="primary" onClick={handleSubmit}>
                        Publish
                    </Button>
                </Stack>}
            </Paper>
        </Stack>

    );
};

export default UploadPublication;
