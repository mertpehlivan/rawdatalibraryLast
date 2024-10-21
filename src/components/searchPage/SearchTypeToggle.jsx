import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ResearchIcon from '@mui/icons-material/Book';
import ArticleIcon from '@mui/icons-material/Article';
import RawDataIcon from '@mui/icons-material/DataObject';

const searchTypes = [
    { value: 'researcher', label: 'Researcher Search', icon: <ResearchIcon fontSize="small" /> },
    { value: 'publication', label: 'Publication Search', icon: <ArticleIcon fontSize="small" /> },
    { value: 'rawData', label: 'Raw Data Search', icon: <RawDataIcon fontSize="small" />, disabled: true },
];

const SearchTypeToggle = ({ searchType, onChange }) => {
    return (
        <ToggleButtonGroup
            value={searchType}
            exclusive
            onChange={(event, newType) => onChange(newType)}
            aria-label="search type"
            sx={{ marginBottom: 1 }}
        >
            {searchTypes.map((option) => (
                <ToggleButton
                    key={option.value}
                    value={option.value}
                    aria-label={option.label}
                    size="small"
                    disabled={option.disabled}
                    sx={{
                        color: 'primary.main',
                        '&.Mui-selected': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                        },
                    }}
                >
                    {option.icon} {option.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

export default SearchTypeToggle;
