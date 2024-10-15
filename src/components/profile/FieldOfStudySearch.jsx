import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress, createFilterOptions, Chip } from '@mui/material';

const baseUrl = process.env.REACT_APP_BASE_URL;
const filter = createFilterOptions();

const FieldOfStudySearch = ({ onSelectFieldOfStudy, selectedFieldOfStudy, onAddFieldOfStudy }) => {
    const [options, setOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setSearchQuery(selectedFieldOfStudy || '');
    }, [selectedFieldOfStudy]);

    const searchFieldOfStudy = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${baseUrl}/api/v1/no-auth/field-of-study/search`, {
                params: { fieldOfStudyName: query },
            });
            setOptions(response.data);
        } catch (err) {
            console.error('Error fetching fields of study:', err);
            setError('Failed to fetch fields of study. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event, value) => {
        const query = value || '';
        searchFieldOfStudy(query);

        if (query.length >= 3) {
            searchFieldOfStudy(query);
        } else {
            setOptions([]);
        }
    };

    const handleOptionSelect = (event, value) => {
        const isExistingOption = options.some(option => option.fieldOfStudyName === value);

        if (!isExistingOption && value && value.length >= 3) {
            if (typeof onAddFieldOfStudy === 'function') {
                onAddFieldOfStudy(value);
            }
            setSearchQuery(value);
            onSelectFieldOfStudy(value);
        } else {
            setSearchQuery(value || '');
            onSelectFieldOfStudy(value || '');
        }
    };

    // Helper function to capitalize each word
    const capitalizeWords = (str) => {
        return str
    };

    return (
        <div>
            <Autocomplete
                size='small'
                freeSolo
                options={options.map(option => capitalizeWords(option.fieldOfStudyName))}
                value={capitalizeWords(searchQuery)}
                onInputChange={handleSearchChange}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        handleOptionSelect(event, newValue);
                    } else if (newValue && newValue.inputValue) {
                        handleOptionSelect(event, newValue.inputValue);
                    } else {
                        handleOptionSelect(event, newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    const isExisting = options.some(option => inputValue === option);

                    // Only add the chip label for the new value
                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            title: capitalizeWords(inputValue), // Capitalize the input value
                        });
                    }

                    return filtered;
                }}
                getOptionLabel={(option) => {
                    // For new options, show title. Otherwise, display option as it is.
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.title) {
                        return option.title;
                    }
                    return option;
                }}
                renderOption={(props, option, { index }) => (
                    <li {...props} key={`${option.fieldOfStudyName}-${index}`}> {/* Ensure unique key */}
                        {typeof option === 'string' ? (
                            option
                        ) : (
                            <Chip label={`Add "${option.title}"`} />
                        )}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Field of Study"
                        variant="outlined"
                        fullWidth
                        margin="none"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                noOptionsText="No field of study found"
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default FieldOfStudySearch;
