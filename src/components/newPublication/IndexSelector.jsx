import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, createFilterOptions } from '@mui/material';

const indexes = [
  "Science Citation Index (SCI)",
  "Science Citation Index Expanded (SCI-Expanded)",
  "Scopus",
  "Social Sciences Citation Index (SSCI)",
  "Emerging Sources Citation Index (ESCI)",
  "Art Index",
  "Arts and Humanities Citation Index (AHCI)",
  "BASE",
  "BIOSIS",
  "Chemical Abstracts Core",
  "Compendex",
  "Computer and Applied Sciences",
  "Directory of Open Access Journals (DOAJ)",
  "Education Resources Information Service (ERIC)",
  "EBSCO",
  "Education Abstracts",
  "Environment Index",
  "Film and Literature Index",
  "Historical Abstracts",
  "Information Science and Technology Abstracts",
  "IJIFACTOR",
  "Index Copernicus",
  "GeoBase",
  "INSPEC",
  "ISI Indexing",
  "MathSciNet",
  "MEDLINE",
  "Music Index",
  "OAJI",
  "Open J Gate",
  "Other Index",
  "PubMed",
  "Public Affairs Index",
  "Research Alert",
  "ResearchBib",
  "ScopeMed (Directory for Medical Articles)",
  "SCIE",
  "SCIMAGOJR",
  "SportDiscus",
  "Ulrich’s International Periodical Directory"
];

const filter = createFilterOptions();

const IndexSelector = ({ initialIndex, onIndexChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex || '');

  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  const handleChange = (event, newValue) => {
    let value = '';

    if (typeof newValue === 'string') {
      value = newValue;
    } else if (newValue && newValue.inputValue) {
      value = newValue.inputValue;
    } else {
      value = newValue?.title || '';
    }

    setSelectedIndex(value);
    if (onIndexChange) {
      onIndexChange(value);
    }
  };

  return (
    <Autocomplete
      size='small'
      fullWidth
      freeSolo
      value={selectedIndex}
      onChange={handleChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;

        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: inputValue,
            isNew: true,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="index-selector"
      options={indexes.map(index => ({ title: index }))}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option.isNew ? `Add "${option.title}" (Click to add)` : option.title}
          </li>
        );
      }}
     
      renderInput={(params) => (
        <TextField {...params} label="Select or Enter Index (Optional)" variant="outlined" placeholder="Choose or enter an index (Optional)" />
      )}
    />
  );
};

export default IndexSelector;
