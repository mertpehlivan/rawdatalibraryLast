import React, { useEffect, useState } from 'react';
import { TextField, Grid, Typography, Paper, Stack, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { Science } from '@mui/icons-material'; // Assuming you have icons imported for visuals
import { useUserContext } from '../../../../auth/AuthProvider';
import { useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { updatePublication } from '../../../../services/publicationService';

const ResearchProjectFormEdit = ({ publication, type }) => {
  const { token } = useUserContext();
  const { publicationId } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    beginningDate: '',
    completedDate: '',
    universityOrCompany: '',
    grantNumber: '',
    comment: '',
    references: '',
    language: ''
  });

  const [initialData, setInitialData] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // Initialize the form with publication data if available
  useEffect(() => {
    if (publication) {
      const initialResearchProject = {
        title: publication.title || '',
        beginningDate: publication.beginningDate || '',
        completedDate: publication.completedDate || '',
        universityOrCompany: publication.universityOrCompany || '',
        grantNumber: publication.grantNumber || '',
        comment: publication.comment || '',
        references: publication.references || '',
      };
      setFormData(initialResearchProject);
      setInitialData(initialResearchProject);  // Save the initial state for comparison
    }
  }, [publication]);

  // Handle form data changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle the checkbox for ongoing projects
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // Check if form is modified or empty fields are present
  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);
    const isFormValid = formData.title && formData.beginningDate && (isChecked || formData.completedDate);
    setIsSaveEnabled(hasChanges && isFormValid);
  }, [formData, initialData, isChecked]);

  // Handle form submission
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await updatePublication(token, publicationId, formData, type);
      console.log("Publication updated successfully:", response);
      // Optionally show a success message or redirect
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
              <Science sx={{ width: 60, height: 60, color: "primary.main" }} />
              <Typography color="primary.main" variant='h4'><b>Research Project</b></Typography>
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
                <TextField
                  size='small'
                  fullWidth
                  label="Beginning Date"
                  name="beginningDate"
                  type="date"
                  value={formData.beginningDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={isChecked}
                  size='small'
                  fullWidth
                  label="Completed Date"
                  name="completedDate"
                  type="date"
                  value={formData.completedDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Ongoing Project"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size='small'
                  fullWidth
                  label="University or Company"
                  name="universityOrCompany"
                  value={formData.universityOrCompany}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size='small'
                  fullWidth
                  label="Grant Number"
                  name="grantNumber"
                  value={formData.grantNumber}
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
                    {languages.map((language, index) => (
                      <MenuItem key={index} value={language}>
                        {language}
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
                {formData.comment && <p>{`${formData.comment.length}/${5000} characters`}</p>}
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
                  By adding your references, you can increase your discoverability in the searches of other researchers
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <LoadingButton
              loading={loading}
              variant="contained"
              color="primary"
              disabled={!isSaveEnabled}
              onClick={handleSave}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default ResearchProjectFormEdit;
