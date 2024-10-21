import React, { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link, useParams } from 'react-router-dom';

const ProfilePageViewRouter = () => {
  const { userId } = useParams();
  const [selectedOption, setSelectedOption] = useState('home'); // Default selection

  // Define the links and their respective icons and labels
  const links = [
    { value: 'home', icon: 'material-symbols:home', label: 'Home', path: `/researcher/${userId}/` },
    { value: 'publication', icon: 'material-symbols:post-outline', label: 'Publication', path: `/researcher/${userId}/publications` },
    { value: 'affiliation', icon: 'ph:building', label: 'Affiliation', path: `/researcher/${userId}/affiliation` },
    { value: 'education', icon: 'carbon:education', label: 'Education', path: `/researcher/${userId}/education` },
    { value: 'researchInterest', icon: 'material-symbols:lab-research', label: 'Research Interest', path: `/researcher/${userId}/research-interest` },
  ];

  // Update the selected option based on the current path
  useEffect(() => {
    const currentPath = window.location.pathname;
    const activeLink = links.find(link => currentPath.includes(link.value));
    if (activeLink) {
      setSelectedOption(activeLink.value);
    }
  }, [userId]); // Depend on userId to update on changes

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
        aria-label="Profile View Options"
        sx={{ borderRadius: 3 }}
      >
        {links.map(({ value, icon, label, path }) => (
          <Link to={path} key={value}>
            <ToggleButton
              sx={{
                borderRadius: 3,
                backgroundColor: selectedOption === value ? '#091582' : 'transparent',
                color: selectedOption === value ? 'white' : '#091582',
                '&:hover': {
                  backgroundColor: selectedOption === value ? '#091582' : '#f0f0f0', // Change on hover
                  color: selectedOption === value ? 'white' : '#091582',
                },
              }}
              value={value}
              aria-label={label}
            >
              <Icon width={20} height={20} icon={icon} />
              {label}
            </ToggleButton>
          </Link>
        ))}
      </ToggleButtonGroup>
    </Paper>
  );
};

export default ProfilePageViewRouter;
