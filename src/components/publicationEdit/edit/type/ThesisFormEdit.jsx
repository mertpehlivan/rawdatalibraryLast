import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Typography, Stack, Paper, Button } from '@mui/material';
import { School } from '@mui/icons-material';
import { updatePublication } from '../../../../services/publicationService';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../../auth/AuthProvider';

const degrees = ["BACHELOR", "MASTER", "DOCTORATE", "POST_DOCTORATE"];
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

const ThesisFormEdit = ({ publication,type }) => {
    const { publicationId } = useParams();
    const { token } = useUserContext();
    const DegreeEnum = {
        BACHELOR: 'Bachelor',
        MASTER: 'Master',
        DOCTORATE: 'Doctorate',
        POST_DOCTORATE: 'Post Doctorate',
    };

    const [formData, setFormData] = useState({
        title: '',
        degree: degrees[0],
        university: '',
        pages: '',
        month: '',
        department: '',
        comment: '',
        language: '',
        references: ''
    });

    // Store initial publication data
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        setFormData(publication);
        setInitialData(publication);
    }, [publication]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    };

    const convertEnumToString = (enumValue) => {
        switch (enumValue) {
            case 'BACHELOR':
                return DegreeEnum.BACHELOR;
            case 'MASTER':
                return DegreeEnum.MASTER;
            case 'DOCTORATE':
                return DegreeEnum.DOCTORATE;
            case 'POST_DOCTORATE':
                return DegreeEnum.POST_DOCTORATE;
            default:
                return '';
        }
    };

    const isFormValid = () => {
        return formData.title && formData.university && formData.pages && formData.month;
    };

    const hasChanges = () => {
        return JSON.stringify(formData) !== JSON.stringify(initialData);
    };

    const handleSave = async () => {
        if (isFormValid() && hasChanges()) {
            const response = await updatePublication(token, publicationId, formData, type);
            console.log("Publication updated successfully:", response);
            // Optionally show a success message or redirect
            window.location.reload();
            console.log('Form data saved:', formData);
        } else {
            // Handle the case where the form is invalid or unchanged
            if (!isFormValid()) {
                alert('Please fill in all required fields.');
            } else {
                alert('No changes made.');
            }
        }
    };

    return (
        <Paper>
            <Stack p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="center" alignItems="center">
                            <School sx={{ width: 60, height: 60, color: "primary.main" }} />
                            <Typography color="primary.main" variant='h4'><b>Thesis</b></Typography>
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
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth size='small'>
                                    <InputLabel>Degree</InputLabel>
                                    <Select
                                        size='small'
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleChange}
                                    >
                                        {degrees.map((degree, index) => (
                                            <MenuItem key={index} value={degree}>
                                                {convertEnumToString(degree)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="University"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Pages"
                                    name="pages"
                                    value={formData.pages}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    type='month'
                                    fullWidth
                                    label="Month-Year"
                                    name="month"
                                    value={formatDate(formData.month)}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Language</InputLabel>
                                    <Select
                                        value={formData.language}
                                        label="Language"
                                        name='language'
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
                            <Grid item xs={12}>
                                <TextField
                                    size='small'
                                    multiline
                                    rows={3}
                                    placeholder="Abstract"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                {formData.comment && <Typography variant='body2'>{`${formData.comment.length}/${5000} characters`}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    multiline
                                    rows={10}
                                    label="References (Optional)"
                                    name="references"
                                    value={formData.references}
                                    onChange={handleChange}
                                />
                                <Typography variant='body2' color="gray">By adding your references, you can increase your discoverability in the searches of other researchers</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSave}
                                    disabled={!isFormValid() || !hasChanges()}
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

export default ThesisFormEdit;
