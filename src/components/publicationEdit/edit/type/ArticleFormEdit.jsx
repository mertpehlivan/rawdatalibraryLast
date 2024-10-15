import React, { useState, useEffect } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography, Button } from '@mui/material';
import { Article } from '@mui/icons-material';
import IndexSelector from '../../../newPublication/IndexSelector';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../../auth/AuthProvider';
import { updatePublication } from '../../../../services/publicationService';
import { LoadingButton } from '@mui/lab';

const ArticleFormEdit = ({ publication, type }) => {
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

  const [formData, setFormData] = useState({
    title: '',
    journalName: '',
    volume: '',
    issue: '',
    pages: '',
    doi: '',
    linkOfThePaper: '',
    comment: '',
    indexing: '',
    language: '',
    references: '',
    year: ''
  });

  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  useEffect(() => {
    setFormData(publication);
    setIsModified(false); // Reset modification state when new publication data is loaded
  }, [publication]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      setIsModified(JSON.stringify(newData) !== JSON.stringify(publication)); // Check if data is modified
      return newData;
    });
  };

  const handleIndexChange = (value) => {
    setFormData((prevData) => {
      const newData = { ...prevData, indexing: value };
      setIsModified(JSON.stringify(newData) !== JSON.stringify(publication)); // Check if data is modified
      return newData;
    });
  };

  const handleSave = async () => {
    setLoading(true); // Set loading to true when starting the save operation
    try {
      const response = await updatePublication(token, publicationId, formData, type);
      console.log("Publication updated successfully:", response);

      // Optionally reset the modified state
      setIsModified(false);

      // Refresh the page after saving
      window.location.reload();
    } catch (error) {
      console.error("Failed to update publication:", error.message);
      // You may want to show a notification to the user here
    } finally {
      setLoading(false); // Set loading to false after the operation completes
    }
  };

  const isSaveDisabled = !formData.title || !formData.journalName || !formData.pages || !formData.year || !isModified;

  return (
    <Paper>
      <Stack p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Article sx={{ width: 60, height: 60, color: "primary.main" }} />
              <Typography color="primary.main" variant="h4">
                <b>Article</b>
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Journal Name"
              name="journalName"
              value={formData.journalName}
              onChange={handleChange}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              fullWidth
              label="Volume"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              fullWidth
              label="Issue (Optional)"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              fullWidth
              label="Pages"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              fullWidth
              label="DOI (Optional)"
              name="doi"
              value={formData.doi}
              onChange={handleChange}
              inputProps={{ maxLength: 100, pattern: "^10.\\d{4,9}/[-._;()/:A-Z0-9]+$" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size='small'
              fullWidth
              type="number"
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              fullWidth
              label="Link of the Paper"
              name="linkOfThePaper"
              value={formData.linkOfThePaper}
              onChange={handleChange}
              inputProps={{ maxLength: 500 }}
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
            <IndexSelector onIndexChange={handleIndexChange} initialIndex={formData.indexing} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              multiline
              rows={3}
              label="Abstract"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              inputProps={{ maxLength: 5000 }}
            />
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
            <Button color='error' variant='outlined' onClick={() => window.location.reload()}>
              Cancel
            </Button>
            <LoadingButton loading={loading} variant="contained" color="primary" onClick={handleSave} disabled={isSaveDisabled}>
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default ArticleFormEdit;
