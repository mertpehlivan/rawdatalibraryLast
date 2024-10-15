import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Paper, Stack, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { Book } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../../auth/AuthProvider';
import { updatePublication } from '../../../../services/publicationService';

const ChapterInABookFormEdit = ({ publication, type }) => {
    const [publicationData, setPublicationData] = useState({
        title: '',
        chapterNumber: '',
        bookTitle: '',
        year: '',
        pages: '',
        doi: '',
        publisher: '',
        isbn: '',
        editor: '',
        comment: '',
        references: '',
        linkOfTheChapter: '',
        language: ''
    });
    
    const { publicationId } = useParams();
    const { token } = useUserContext();
    const languages = [
        "Arabic", "Abkhaz", "Afar", "Albanian", "Alsatian", "Amharic", "Armenian",
        "Assamese", "Aymara", "Azari", "Azerbaijani", "Azerbaijani Turkic",
        "Bahasa Indonesia", "Bahasa Indonesian", "Balochi", "Bangla", "Bantu",
        "Bapounou", "Basque", "Bateke", "Belorussian", "Belorussian", "Bislama",
        "Bosnian", "Breton", "Bubi", "Bulgarian", "Cantonese", "Castilian",
        "Castilian Spanish", "Catalan", "Catalán", "Chinese", "Corsican",
        "Creole", "Criolo", "Criuolo", "Croatian", "Czech", "Danish", "Dari",
        "Dhivehi", "Dutch", "Dzongkha", "English", "Eschira", "Estonian",
        "Faeroese", "Fang", "Farsi", "Fijian", "Filipino", "Finnish", "Flemish",
        "Fon", "French", "French patois", "Galole", "Garifuna (Carib)",
        "Georgian", "German", "Greek", "Greenlandic", "Guaragigna",
        "Hansa, Swahili", "Hassaniya Arabic", "Hazaragi", "Hebrew", "Hindi",
        "Hindustani", "Hungarian", "Ibo", "Icelandic", "Irish Gaelic", "Italian",
        "Japanese", "Kazak", "Kekchi", "Kemak", "Khmer", "Kikongo", "Kingwana",
        "Kinyarwanda", "Kirundi", "Korean", "Kurdish", "Kyrgyz", "Lao", "Latin",
        "Latvian", "Leboa", "Lingala", "Luxermbourgish", "Macedonian", "Magyar",
        "Malagasy", "Malay", "Maltese", "Mambae", "Mandarin", "Mandingo",
        "Marshallese", "Mayan", "Melanesian", "Moldovan", "Mongolian",
        "Monokutuba", "Myene", "Nahua", "Nauruan", "Nepalese dialects", "Nepali",
        "Orominga", "Palau", "Pashtu", "Patois", "Polish", "Portuguese",
        "Provençal", "Punjabi", "Quechua", "Rohingya", "Romanian", "Russian",
        "Samoan", "Sangho", "Serbian", "Setswana", "Shikomoro", "Sinhala",
        "Slovak", "Slovene", "Slovenian", "Somali", "Spanish", "Swahili",
        "Swedish", "Tagalog", "Tajik", "Tetum", "Thai", "The Myanmar language",
        "Tibetan", "Tigre and Kunama", "Tigrigna", "Tongan", "Tshiluba",
        "Turkish", "Turkmen", "Tuvaluan", "Ukrainian", "Urdu", "Uzbek",
        "Vietnamese", "Yoruba"
      ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPublicationData(prevData => ({ ...prevData, [name]: value }));
    };

    const [isModified, setIsModified] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPublicationData(publication);
        setIsModified(false);
    }, [publication]);

    useEffect(() => {
        // Check if the form has been modified
        setIsModified(JSON.stringify(publicationData) !== JSON.stringify(publication));
    }, [publicationData, publication]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await updatePublication(token, publicationId, publicationData, type);
            console.log("Publication updated successfully:", response);
            window.location.reload();
        } catch (error) {
            console.error("Failed to update publication:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Check if all required fields are filled
    const isFormValid = publicationData.title && publicationData.chapterNumber && publicationData.bookTitle &&
        publicationData.year && publicationData.pages && publicationData.publisher && publicationData.editor;

    return (
        <Paper>
            <Stack p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="center" alignItems="center">
                            <Book sx={{ width: 60, height: 60, color: "primary.main" }} />
                            <Typography color="primary.main" variant='h4'><b>Chapter in a Book</b></Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Title"
                                    name="title"
                                    value={publicationData.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Chapter Number"
                                    name="chapterNumber"
                                    value={publicationData.chapterNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Book Title"
                                    name="bookTitle"
                                    value={publicationData.bookTitle}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Year"
                                    name="year"
                                    type="number"
                                    value={publicationData.year}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Pages"
                                    name="pages"
                                    value={publicationData.pages}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="DOI (Optional)"
                                    name="doi"
                                    value={publicationData.doi}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Publisher"
                                    name="publisher"
                                    value={publicationData.publisher}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="ISBN (Optional)"
                                    name="isbn"
                                    value={publicationData.isbn}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Editor"
                                    name="editor"
                                    value={publicationData.editor}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Language</InputLabel>
                                    <Select
                                        label="Language"
                                        name='language'
                                        value={publicationData.language}
                                        onChange={handleChange}
                                    >
                                        {languages.map((langue, index) => (
                                            <MenuItem key={index} value={langue}>
                                                {langue}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Link of the Chapter"
                                    name="linkOfTheChapter"
                                    value={publicationData.linkOfTheChapter}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 500 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size='small'
                                    multiline
                                    rows={3}
                                    placeholder="Abstract"
                                    name="comment"
                                    value={publicationData.comment}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                {publicationData.comment && <p>{`${publicationData.comment.length}/5000 characters`}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    multiline
                                    rows={10}
                                    label="References (Optional)"
                                    name="references"
                                    value={publicationData.references}
                                    onChange={handleChange}
                                />
                                <Typography variant='body2' color="gray">
                                    By adding your references, you can increase your discoverability in the searches of other researchers.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSave}
                                    disabled={!isFormValid || !isModified || loading}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    );
};

export default ChapterInABookFormEdit;
