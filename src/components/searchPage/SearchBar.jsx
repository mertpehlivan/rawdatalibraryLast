import React from 'react';
import {
    TextField,
    IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ query, onQueryChange, onSearch }) => {
    const handleInputChange = (e) => {
        onQueryChange(e.target.value);
        
    };

    return (
        <TextField
            label="Search"
            value={query}
            onChange={handleInputChange}
            fullWidth
            size="small"
            sx={{
                marginBottom: 1,
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                },
                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                },
                mt: 2,
            }}
           
        />
    );
};

export default SearchBar;
