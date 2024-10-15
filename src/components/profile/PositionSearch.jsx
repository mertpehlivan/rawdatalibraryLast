import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress, createFilterOptions, Chip } from '@mui/material';

const baseUrl = process.env.REACT_APP_BASE_URL;
const filter = createFilterOptions();

const PositionSearch = ({ onSelectPosition, selectedPosition, onAddPosition }) => {
    const [options, setOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFindAll(); // Fetch all positions on mount
    }, []);

    useEffect(() => {
        setSearchQuery(selectedPosition || '');
    }, [selectedPosition]);

    const fetchFindAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${baseUrl}/api/v1/no-auth/positions/`);
            setOptions(response.data);
        } catch (err) {
            console.error('Error fetching positions:', err);
            setError('Failed to fetch positions. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const searchPosition = async (query) => {
        setLoading(true);
        setError(null);
        try {
            if (query.length >= 3) {
                const response = await axios.get(`${baseUrl}/api/v1/no-auth/positions/search`, {
                    params: { positionName: query },
                });
                setOptions(response.data);
            } else {
                fetchFindAll(); // Fetch all positions if query is less than 3 characters
            }
        } catch (err) {
            console.error('Error fetching positions:', err);
            setError('Failed to fetch positions. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event, value) => {
        const query = value || '';
        searchPosition(query); // Search positions based on the input value
    };

    const handleOptionSelect = (event, value) => {
        const isExistingOption = options.some(option => option.positionName === value);

        if (!isExistingOption && value && value.length >= 3) {
            if (typeof onAddPosition === 'function') {
                onAddPosition(value);
            }
            setSearchQuery(value);
            onSelectPosition(value);
        } else {
            setSearchQuery(value || '');
            onSelectPosition(value || '');
        }
    };

    // Helper function to capitalize each word
    const capitalizeWords = (str) => {
        return str ? str.replace(/\b\w/g, char => char.toUpperCase()) : '';
    };

    return (
        <div>
            <Autocomplete
                size='small'
                freeSolo
                options={options.map(option => capitalizeWords(option.positionName))}
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
                            title: capitalizeWords(inputValue),
                        });
                    }

                    return filtered;
                }}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.title) {
                        return option.title;
                    }
                    return option;
                }}
                renderOption={(props, option) => (
                    <li {...props}>
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
                        label="Position" // Updated label
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
                noOptionsText="No position found" // Updated no options text
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default PositionSearch;
