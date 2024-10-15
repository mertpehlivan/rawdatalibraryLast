import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Paper, Typography, Box } from '@mui/material';
import PublicationIcon from '@mui/icons-material/Article'; // Change to your publication icon
import AffiliationIcon from '@mui/icons-material/Business'; // Change to your affiliation icon
import EducationIcon from '@mui/icons-material/School'; // Change to your education icon
import ResearchInterestIcon from '@mui/icons-material/Science'; // Change to your research interest icon
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link, useParams } from 'react-router-dom';

const ProfilePageViewRouter = ({ publicStatus = false }) => {
  const [selectedOption, setSelectedOption] = useState('publication'); // Default selection
  const { userId } = useParams()
  const handleToggle = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption); // Update the selected option
    }
  };

  return (

    <Paper elevation={3} sx={{ borderRadius: 3 }}>
      <ToggleButtonGroup
        value={selectedOption}
        exclusive
        onChange={handleToggle}
        aria-label="text alignment"
        sx={{ borderRadius: 3 }}
      >
        <Link to={`/researcher/${userId}/`}>
          <ToggleButton
            sx={{
              borderRadius: 3,
              backgroundColor: selectedOption === 'publication' ? 'primary.main' : 'transparent',
              color: selectedOption === 'publication' ? 'white' : 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.light', // Change on hover
              },
            }}
            value="publication"
            aria-label="Publication"
          >
            <Icon width={20} height={20} icon="material-symbols:post-outline" />
            Publication
          </ToggleButton>
        </Link>
        <Link to={`/researcher/${userId}/affiliation`}>
          <ToggleButton
            sx={{
              borderRadius: 3,
              backgroundColor: selectedOption === 'affiliation' ? 'primary.main' : 'transparent',
              color: selectedOption === 'affiliation' ? 'white' : 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            }}
            value="affiliation"
            aria-label="Affiliation"
          >
            <Icon width={20} height={20} icon="ph:building" />
            Affiliation
          </ToggleButton>
        </Link>
        <Link to={`/researcher/${userId}/education`}>
          <ToggleButton
            sx={{
              borderRadius: 3,
              backgroundColor: selectedOption === 'education' ? 'primary.main' : 'transparent',
              color: selectedOption === 'education' ? 'white' : 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            }}
            value="education"
            aria-label="Education"
          >
            <Icon width={20} height={20} icon="carbon:education" />
            Education
          </ToggleButton>
        </Link>
        <Link to={`/researcher/${userId}/research-interest`}>
          <ToggleButton
            sx={{
              borderRadius: 3,
              backgroundColor: selectedOption === 'researchInterest' ? 'primary.main' : 'transparent',
              color: selectedOption === 'researchInterest' ? 'white' : 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            }}
            value="researchInterest"
            aria-label="Research Interest"
          >
            <Icon width={20} height={20} icon="material-symbols:lab-research" />
            Research Interest
          </ToggleButton>
        </Link>
        {/* <ToggleButton
          sx={{
            borderRadius: 3,
            backgroundColor: selectedOption === 'researchInterest' ? 'primary.main' : 'transparent',
            color: selectedOption === 'researchInterest' ? 'white' : 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
          value="researchInterest"
          aria-label="Research Interest"
        >
          <Icon width={20} height={20} icon="material-symbols:lab-research" />
          Scholarship
        </ToggleButton> */}
      </ToggleButtonGroup>
    </Paper>

  );
};

export default ProfilePageViewRouter;
