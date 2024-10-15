import React, { useEffect } from 'react';
import { useNewPublicationContext } from '../../../context/NewPublicationProvider';
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { Article } from '@mui/icons-material';
import IndexSelector from '../IndexSelector';

const ArticleForm = () => {
  const { publication, updateData, step } = useNewPublicationContext();
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
  const valid = step === 1;

  useEffect(() => {
    if (Object.keys(publication.data).length === 0) {
      const initialArticle = {
        title: '',
        journalName: '',
        volume: '',
        issue: '',
        pages: '',
        doi: '',
        linkOfThePaper: '',
        comment: '',
        indexing:'',
        language: '',
        references:'',
        year:''
      };
      updateData(initialArticle);
    }

  }, []);
  const handleIndexChange = (value) => {
    updateData({ ...publication.data, "indexing": value });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateData({ ...publication.data, [name]: value });

  };



  const currentYear = new Date().getFullYear();

  return (
    <Paper sx={{ opacity: valid ? 1 : 0.5 }}>
      <Stack p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Article sx={{ width: 60, height: 60, color: "primary.main" }} />
              <Typography color="primary.main" variant="h4">
                <b>{publication.type}</b>
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!valid}
              size="small"
              fullWidth
              label="Title"
              name="title"
              value={publication.data.title}
              onChange={handleChange}
              inputProps={{ maxLength: 255 }}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!valid}
              size="small"
              fullWidth
              label="Journal Name"
              name="journalName"
              value={publication.data.journalName}
              onChange={handleChange}
              inputProps={{ maxLength: 255 }}

            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={!valid}
              size="small"
              fullWidth
              label="Volume"
              name="volume"
              value={publication.data.volume}
              onChange={handleChange}
              inputProps={{ maxLength: 50 }}

            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={!valid}
              size="small"
              fullWidth
              label="Issue (Optional)"
              name="issue"
              value={publication.data.issue}
              onChange={handleChange}
              inputProps={{ maxLength: 50 }}

            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={!valid}
              size="small"
              fullWidth
              label="Pages"
              name="pages"
              value={publication.data.pages}
              onChange={handleChange}
              inputProps={{ maxLength: 50 }}

            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={!valid}
              size="small"
              fullWidth
              label="DOI (Optional)"
              name="doi"
              value={publication.data.doi}
              onChange={handleChange}
              inputProps={{ maxLength: 100, pattern: "^10.\\d{4,9}/[-._;()/:A-Z0-9]+$" }}

            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size='small'
              disabled={!valid}
              fullWidth
              type="number"
              label="Year"
              name="year"
              value={publication.data.year}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={!valid}
              size="small"
              fullWidth
              label="Link of the Paper"
              name="linkOfThePaper"
              value={publication.data.linkOfThePaper}
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
                value={publication.data.language}
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
            <IndexSelector onIndexChange={handleIndexChange} initialIndex={publication.data.indexing}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!valid}
              size="small"
              fullWidth
              multiline
              rows={3}
              label="Abstract"
              name="comment"
              value={publication.data.comment}
              onChange={handleChange}
              inputProps={{ maxLength: 5000 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!valid}
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
      </Stack>
    </Paper>
  );
};

export default ArticleForm;
