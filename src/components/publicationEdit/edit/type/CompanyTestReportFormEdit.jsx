import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Paper, Stack, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { Business } from '@mui/icons-material';
import { updatePublication } from '../../../../services/publicationService';
import { useUserContext } from '../../../../auth/AuthProvider';
import { useParams } from 'react-router-dom';

const CompanyTestReportFormEdit = ({ publication }) => {
  const { token } = useUserContext();
  const {publicatonId} = useParams()
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


  const [formData, setFormData] = useState({
    title: '',
    date: '',
    companyName: '',
    comment: '',
    references: '',
    language: ''
  });

  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(publication);
    setIsModified(false);
  }, [publication]);

  useEffect(() => {
    setIsModified(JSON.stringify(formData) !== JSON.stringify(publication));
  }, [formData, publication]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await updatePublication(token, publicatonId, formData, 'Company Test Report');
      console.log("Publication updated successfully:", response);
      // Optionally show a success message or redirect
      window.location.reload();
    } catch (error) {
      console.error("Failed to update publication:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.title && formData.date && formData.companyName;

  return (
    <Paper>
      <Stack p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Business sx={{ width: 60, height: 60, color: "primary.main" }} />
              <Typography color="primary.main" variant='h4'><b>Company Test Report</b></Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
                <FormControl fullWidth size="small">
                  <InputLabel>Language</InputLabel>
                  <Select
                    label="Language"
                    name='language'
                    value={formData.language}
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
                  size='small'
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size='small'
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
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
                {formData.comment && <p>{`${formData.comment.length}/5000 characters`}</p>}
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
                  endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default CompanyTestReportFormEdit;
