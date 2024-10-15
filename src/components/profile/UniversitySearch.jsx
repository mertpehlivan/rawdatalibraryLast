import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress, createFilterOptions, Chip } from '@mui/material';

const baseUrl = process.env.REACT_APP_BASE_URL;
const filter = createFilterOptions();

const UniversitySearch = ({ onSelectUniversity, selectedUniversity, onAddUniversity, label = "Search University" }) => {
    const [options, setOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setSearchQuery(selectedUniversity || '');
    }, [selectedUniversity]);

    const searchUniversity = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${baseUrl}/api/v1/no-auth/universities/search`, {
                params: { universityName: query },
            });
            setOptions(response.data);
        } catch (err) {
            console.error('Error fetching universities:', err);
            setError('Failed to fetch universities. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event, value) => {
        const query = value || '';
        setSearchQuery(query);

        if (query.length >= 3) {
            searchUniversity(query);
        } else {
            setOptions([]);
        }
    };

    const handleOptionSelect = (event, value) => {
        const isExistingOption = options.some(option => option.universityName === value);

        if (!isExistingOption && value && value.length >= 3) {
            if (typeof onAddUniversity === 'function') {
                onAddUniversity(value);
            }
            setSearchQuery(value);
            onSelectUniversity(value);
        } else {
            setSearchQuery(value || '');
            onSelectUniversity(value || '');
        }
    };

    // Helper function to capitalize each word
    const capitalizeWords = (str) => {
        return str
    };

    return (
        <div>
            <Autocomplete
                size="small"
                freeSolo
                options={options.map(option => capitalizeWords(option.universityName))}
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
                renderOption={(props, option) => (
                    <li key={option.id} {...props}>
                        {typeof option === 'string' ? (
                            option
                        ) : (
                            <Chip label={`Add "${option.title}"`} />
                        )}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField
                        size="small"
                        {...params}
                        label={label}
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
                noOptionsText="No universities found"
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default UniversitySearch;
