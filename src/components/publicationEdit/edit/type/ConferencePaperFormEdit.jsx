import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Paper, Stack, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { Event } from '@mui/icons-material';
import { updatePublication } from '../../../../services/publicationService';
import { useUserContext } from '../../../../auth/AuthProvider';
import { useParams } from 'react-router-dom';

const ConferencePaperFormEdit = ({ publication,type }) => {
  const { token } = useUserContext();
  const { publicationId } = useParams();

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

  const initialFormData = {
    title: '',
    date: '',
    conferenceName: '',
    cityCountry: '',
    pages: '',
    isbn: '',
    comment: '',
    references: '',
    language: '',
    conferenceType: '',
    linkOfTheConference: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [loading, setLoading] = useState(false); // Define loading state

  useEffect(() => {
    if (publication) {
      setFormData({ ...publication }); // Populate the form with existing data
    }
  }, [publication]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const { title, date, conferenceName, cityCountry, pages, comment, language, conferenceType, linkOfTheConference } = formData;
    const allRequiredFieldsFilled = title && date && conferenceName && cityCountry && pages && comment && language && conferenceType;
    const formChanged = JSON.stringify(formData) !== JSON.stringify(publication || initialFormData);

    setIsSaveEnabled(allRequiredFieldsFilled && formChanged);
  }, [formData, publication]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updatePublication(token, publicationId, formData,type );
      console.log("Publication updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update publication:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper>
      <Stack p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Event sx={{ width: 60, height: 60, color: "primary.main" }} />
              <Typography color="primary.main" variant='h4'><b>Conference Paper</b></Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {/* Form fields */}
              <Grid item xs={6}>
                <TextField size='small' fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField size='small' fullWidth label="Date" name="date" type="date" value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={6}>
                <TextField size='small' fullWidth label="Conference Name" name="conferenceName" value={formData.conferenceName} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField size='small' fullWidth label="City, Country" name="cityCountry" value={formData.cityCountry} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Conference Type</InputLabel>
                  <Select label="Conference type" name='conferenceType' value={formData.conferenceType} onChange={handleChange}>
                    <MenuItem value="NATIONAL">National</MenuItem>
                    <MenuItem value="INTERNATIONAL">International</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField size='small' fullWidth label="Pages" name="pages" value={formData.pages} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField size='small' fullWidth label="ISBN (Optional)" name="isbn" value={formData.isbn} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Language</InputLabel>
                  <Select value={formData.language} label="Language" name='language' onChange={handleChange}>
                    {languages.map((langue, index) => (
                      <MenuItem key={index} value={langue}>{langue}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField size="small" fullWidth label="Link of the Conference" name="linkOfTheConference" value={formData.linkOfTheConference} onChange={handleChange} inputProps={{ maxLength: 500 }} />
              </Grid>
              <Grid item xs={12}>
                <TextField size='small' multiline rows={3} placeholder="Abstract" name="comment" value={formData.comment} onChange={handleChange} fullWidth />
                {formData.comment && <p>{`${formData.comment.length}/5000 characters`}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField size="small" fullWidth multiline rows={10} label="References (Optional)" name="references" value={formData.references} onChange={handleChange} />
                <Typography variant='body2' color="gray">By adding your references, you can increase your discoverability in the searches of other researchers</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSave} disabled={!isSaveEnabled || loading}>
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default ConferencePaperFormEdit;
