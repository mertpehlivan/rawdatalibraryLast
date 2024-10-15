import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const titles = [
    'Doctor',
    'Emeritus Professor',
    'Master Student',
    'PhD Student',
    'Post Doctorate',
    'Post Doctorate Student',
    'Professor (Assistant)',
    'Professor (Full)',
    'Professor (Associate)',
    'Research Assistant',
    'Research Associate',
    'Student',
    'Adjunct',
    'Alumnus',
    'Emeritus',
    'Graduate Student',
    'Lecturer (Dr.)',
    'Undergraduate Student',
];

const AcademicDegree = ({ selectedTitle, onSelectTitle}) => {
    const handleChange = (event) => {
        onSelectTitle(event.target.value);
    };

    return (
        <FormControl fullWidth variant="outlined" margin="none">
            <InputLabel id="degree-select-label">Academic Degree</InputLabel>
            <Select
                size='small'
                value={selectedTitle}
                onChange={handleChange}
                required
            >
                {titles.map((title, index) => (
                    <MenuItem key={index} value={title}>
                        {title}
                    </MenuItem>
                ))}
            </Select>
           
        </FormControl>
    );
};

export default AcademicDegree;
