import React, { useEffect } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid, Typography, TextareaAutosize, Stack, Paper } from '@mui/material';
import { useNewPublicationContext } from '../../../context/NewPublicationProvider';
import { School } from '@mui/icons-material';
// Varsayılan olarak düzenleyin

const degrees = ["Bachelor", "Master", "Doctorate", "Post Doctorate"];

const ThesisForm = () => {
    const { publication, updateData } = useNewPublicationContext();
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
    useEffect(() => {
        if (Object.keys(publication.data).length === 0) {
            const initialThesis = {
                title: '',
                degree: degrees[0],
                university: '',
                pages: '',
                month: '',
                department: '',
                comment: '',
                language: '',
                references: ''
            }
            updateData(initialThesis);
        }

    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        updateData({ ...publication.data, [name]: value });
    };

    return (
        <Paper>
            <Stack p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="center" alignItems="center">
                            <School sx={{ width: 60, height: 60, color: "primary.main" }} />
                            <Typography color="primary.main" variant='h4'><b>{publication.type}</b></Typography>
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
                                    value={publication.data.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth size='small'>
                                    <InputLabel>Degree</InputLabel>
                                    <Select
                                        size='small'
                                        name="degree"
                                        value={publication.data.degree}
                                        onChange={handleChange}
                                    >
                                        {degrees.map((degree, index) => (
                                            <MenuItem key={index} value={degree}>{degree}</MenuItem>
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
                                    value={publication.data.university}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Pages"
                                    name="pages"
                                    value={publication.data.pages}
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
                                    value={publication.data.month}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label="Department"
                                    name="department"
                                    value={publication.data.department}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Language</InputLabel>
                                    <Select
                                        value={publication.data.language}
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
                                    value={publication.data.comment}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                {publication.data.comment && <Typography variant='body2'>{`${publication.data.comment.length}/${5000} characters`}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                
                                <TextField
                                    size="small"
                                    fullWidth
                                    multiline
                                    rows={10}
                                    label="References (Optional) "
                                    name="references"
                                    value={publication.data.references}
                                    onChange={handleChange}
                                />
                                <Typography variant='body2' color="gray">By adding your references, you can increase your discoverability in the searches of other researchers</Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    );
};

export default ThesisForm;
