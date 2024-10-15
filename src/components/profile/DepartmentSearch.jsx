import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress, createFilterOptions, Chip } from '@mui/material';

const baseUrl = process.env.REACT_APP_BASE_URL;
const filter = createFilterOptions();

const DepartmentSearch = ({ onSelectDepartment, selectedDepartment, onAddDepartment }) => {
    const [options, setOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setSearchQuery(selectedDepartment || '');
    }, [selectedDepartment]);

    const searchDepartment = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${baseUrl}/api/v1/no-auth/departments/search`, {
                params: { departmentName: query },
            });
            setOptions(response.data);
        } catch (err) {
            console.error('Error fetching departments:', err);
            setError('Failed to fetch departments. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event, value) => {
        const query = value || '';
        searchDepartment(query);

        if (query.length >= 3) {
            searchDepartment(query);
        } else {
            setOptions([]);
        }
    };

    const handleOptionSelect = (event, value) => {
        const isExistingOption = options.some(option => option.departmentName === value);

        if (!isExistingOption && value && value.length >= 3) {
            if (typeof onAddDepartment === 'function') {
                onAddDepartment(value);
            }
            setSearchQuery(value);
            onSelectDepartment(value);
        } else {
            setSearchQuery(value || '');
            onSelectDepartment(value || '');
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
                options={options.map(option => capitalizeWords(option.departmentName))}
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
                        label="Department"
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
                noOptionsText="No department found"
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default DepartmentSearch;
