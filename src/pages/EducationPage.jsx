import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper, IconButton, Box, Container, Grid, Stack, FormControlLabel, Checkbox } from '@mui/material';
import { Edit, Delete, AddCircle, Add, Cancel, ArrowBack } from '@mui/icons-material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent, timelineOppositeContentClasses } from '@mui/lab';
import { getEducationsByCurrentUser, createEducation, updateEducation, deleteEducation } from '../services/educatinService'; // Adjust path as necessary
import { useUserContext } from '../auth/AuthProvider';
import UniversitySearch from '../components/profile/UniversitySearch';
import DepartmentSearch from '../components/profile/DepartmentSearch';
import FieldOfStudySearch from '../components/profile/FieldOfStudySearch';
import EducationDegreeSelect from '../components/profile/EducationDegreeSelect';
import CountrySelect from '../components/CountrySelect';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
const EducationPage = () => {
    const navigate = useNavigate();

    const [educationData, setEducationData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newEducation, setNewEducation] = useState({
        institution: '',
        faculty: '',
        department: '',
        fieldOfStudy: '',
        degree: '',
        country: '',
        beginningDate: '',
        graduationDate: ''
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const { token } = useUserContext(); // Replace with your token retrieval logic

    useEffect(() => {
        const fetchEducations = async () => {
            try {
                const data = await getEducationsByCurrentUser(token);
                setEducationData(data);
            } catch (error) {
                console.error('Error fetching educations:', error);
            }
        };
        fetchEducations();
    }, [token]);
    const handleCheckboxChange = (e, index = null) => {
        const { checked } = e.target;

        if (index !== null) {
            // Update the existing education entry
            const updatedEducation = educationData.map((edu, i) =>
                i === index
                    ? { ...edu, isOngoing: checked, graduationDate: checked ? null : edu.graduationDate }
                    : edu
            );
            setEducationData(updatedEducation); // Update the education data
        } else {
            // Update new education if no index is provided
            setNewEducation((prevState) => ({
                ...prevState,
                isOngoing: checked,
                graduationDate: checked ? null : prevState.graduationDate,
            }));
        }
    };
    const handleInputChange = (e, index = null) => {
        const { name, value } = e.target;

        if (index !== null) {
            const updatedEducation = educationData.map((edu, i) =>
                i === index ? { ...edu, [name]: value } : edu
            );
            setEducationData(updatedEducation);
        } else {
            setNewEducation({ ...newEducation, [name]: value });
        }
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
        setOriginalData(educationData[index]);
    };

    const handleSaveClick = async (index) => {
        const updatedEducation = educationData[editIndex];
        try {
            await updateEducation(updatedEducation.id, updatedEducation, token); // Assuming each education has an 'id'
            setEditIndex(null);
            setOriginalData(null);
        } catch (error) {
            console.error('Error updating education:', error);
        }
    };

    const handleCancelEdit = () => {
        setEducationData(educationData.map((edu, i) => (i === editIndex ? originalData : edu)));
        setEditIndex(null);
        setOriginalData(null);
    };

    const handleDeleteClick = async (index) => {
        const educationToDelete = educationData[index];
        try {
            await deleteEducation(educationToDelete.id, token); // Assuming each education has an 'id'
            setEducationData(educationData.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error deleting education:', error);
        }
    };

    const handleAddEducation = async () => {
        if (newEducation.institution && newEducation.faculty) {
            try {
                const createdEducation = await createEducation(newEducation, token);
                setEducationData([...educationData, createdEducation]);
                setNewEducation({
                    institution: '',
                    faculty: '',
                    department: '',
                    fieldOfStudy: '',
                    degree: '',
                    country: '',
                    beginningDate: '',
                    graduationDate: ''
                });
                setShowAddForm(false);
            } catch (error) {
                console.error('Error adding education:', error);
            }
        }
    };
    const sliceTre = (string) => {
        return string?.split("-")[1]?.toLowerCase() || "";
    };
    const hasChanges = (index) => {
        if (!originalData) return false;
        const currentData = educationData[index];

        return Object.keys(currentData).some((key) => {
            if (key === 'graduationDate') {
                // Check specific condition for graduationDate if necessary
                return true;
            } else {
                return currentData[key] !== originalData[key];
            }
        });
    };
    const formatDate = (date) => {
        if (!date) return ''; // Return empty string if date is not provided

        // Split the date string into components
        const [year, month, day] = date.split('-');

        // Ensure the components are properly formatted
        return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
    };
    return (
        <Container maxWidth="lg">
            <Paper sx={{ p: 3, borderRadius: 5, mt: 2 }}>
                <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 4 }}>
                    Back
                </Button>
                <Stack direction="row" spacing={0.5} color="primary.main" alignItems="center">
                    <Icon width={20} height={20} icon="carbon:education" />
                    <Typography variant="h5" fontWeight="bold">
                        Education Edit
                    </Typography>
                </Stack>


                <Timeline
                    sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.3,
                        },
                        overflow: 'hidden',
                    }}
                >
                    {educationData.map((education, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: index * 0.3 }} // Animated entrance
                        >
                            <TimelineItem>
                                <TimelineOppositeContent color="text.secondary" sx={{ typography: 'body2', lineHeight: 1.5 }}>
                                    {`${formatDate(education.beginningDate)} - ${formatDate(education.graduationDate)}`}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot color="primary" sx={{ transform: 'scale(1.2)' }} />
                                    {index < educationData.length - 1 && <TimelineConnector sx={{ backgroundColor: '#1976d2' }} />}
                                </TimelineSeparator>
                                <TimelineContent>
                                    {editIndex === index ? (
                                        <>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <UniversitySearch
                                                        onSelectUniversity={(newValue) => handleInputChange({
                                                            target: {
                                                                name: 'institution',
                                                                value: newValue,
                                                            }
                                                        }, index)}
                                                        selectedUniversity={education.institution}
                                                        label="Institution"
                                                        sx={{ mb: 2 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        size='small'
                                                        label="Faculty"
                                                        name="faculty"
                                                        value={education.faculty}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        fullWidth
                                                        sx={{ mb: 2 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <DepartmentSearch
                                                        onSelectDepartment={(newValue) =>
                                                            handleInputChange({
                                                                target: {
                                                                    name: 'department',
                                                                    value: newValue,
                                                                },
                                                            }, index)
                                                        }
                                                        selectedDepartment={education.department}
                                                        label="Department"
                                                        sx={{ mb: 2 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <FieldOfStudySearch
                                                        onSelectFieldOfStudy={(newValue) =>
                                                            handleInputChange({
                                                                target: {
                                                                    name: 'fieldOfStudy',
                                                                    value: newValue,
                                                                },
                                                            }, index)
                                                        }
                                                        selectedFieldOfStudy={education.fieldOfStudy}
                                                        label="Field of Study"
                                                        sx={{ mb: 2 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <EducationDegreeSelect
                                                        setSelect={(newValue) =>
                                                            handleInputChange({
                                                                target: {
                                                                    name: 'degree',
                                                                    value: newValue,
                                                                },
                                                            }, index)
                                                        }
                                                        select={education.degree}
                                                        sx={{ mb: 2 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <CountrySelect
                                                        select={education.country}
                                                        setSelect={(newValue) => handleInputChange({
                                                            target: {
                                                                name: 'country',
                                                                value: newValue,
                                                            }
                                                        }, index)}
                                                        sx={{ mb: 2 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        size='small'
                                                        type='date'
                                                        label="Beginning Date"
                                                        name="beginningDate"
                                                        value={education.beginningDate}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        fullWidth
                                                        sx={{ mb: 2 }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        size='small'
                                                        type="date"
                                                        label="Graduation Date"
                                                        name="graduationDate"
                                                        value={education.isOngoing ? '' : education.graduationDate} // Update to use education.isOngoing
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        fullWidth
                                                        InputLabelProps={{ shrink: true }}
                                                        disabled={education.isOngoing} // Disable the date input if ongoing
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={education.isOngoing} // Reflect correct state
                                                                onChange={(e) => handleCheckboxChange(e, index)} // Correctly pass index
                                                                color="primary"
                                                            />
                                                        }
                                                        label="Continue"
                                                    />
                                                </Grid>


                                            </Grid>
                                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleSaveClick}
                                                    disabled={!hasChanges(index)}
                                                    sx={{ backgroundColor: '#3f51b5', color: '#fff' }}
                                                >
                                                    Save
                                                </Button>
                                                <Button variant="outlined" onClick={handleCancelEdit} sx={{ color: '#f44336' }}>
                                                    Cancel
                                                </Button>
                                            </Box>
                                        </>
                                    ) : (
                                        <>
                                            <Box>
                                                <Typography variant='h5' component="span" sx={{ fontWeight: 600 }} color="primary.main">{education.degree}</Typography>
                                                <Typography variant="h6" >
                                                    {`Field of ${education.fieldOfStudy}, Dept. of ${education.department}, Fac. of ${education.faculty}, ${education.institution}`}
                                                </Typography>
                                                <Stack direction="row" alignItems="center">
                                                    <img
                                                        style={{ marginRight: 6 }}
                                                        loading="lazy"
                                                        srcSet={`https://flagcdn.com/w40/${sliceTre(education.country)}.png 2x`}
                                                        src={`https://flagcdn.com/w20/${sliceTre(education.country)}.png`}
                                                        alt=""
                                                    />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {education.country}
                                                    </Typography>
                                                </Stack>

                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEditClick(index)}
                                                    disabled={showAddForm}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => handleDeleteClick(index)}
                                                    disabled={showAddForm}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </>
                                    )}
                                </TimelineContent>
                            </TimelineItem>
                        </motion.div>
                    ))}
                </Timeline>




                {showAddForm && (
                    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <UniversitySearch
                                    onSelectUniversity={(newValue) => handleInputChange({
                                        target: {

                                            name: 'institution',
                                            value: newValue,
                                        }
                                    })}
                                    selectedUniversity={educationData.institution}
                                    label="Institution"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    label="Faculty"
                                    name="faculty"
                                    value={newEducation.faculty}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DepartmentSearch
                                    onSelectDepartment={(newValue) =>
                                        handleInputChange({
                                            target: {
                                                name: 'department',
                                                value: newValue,
                                            },
                                        })
                                    }
                                    selectedDepartment={educationData.department}
                                    label="Department"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FieldOfStudySearch
                                    onSelectFieldOfStudy={(newValue) =>
                                        handleInputChange({
                                            target: {
                                                name: 'fieldOfStudy',
                                                value: newValue,
                                            },
                                        })
                                    }
                                    selectedFieldOfStudy={educationData.fieldOfStudy}
                                    label="Field of Study"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <EducationDegreeSelect
                                    setSelect={
                                        (newValue) =>
                                            handleInputChange({
                                                target: {
                                                    name: 'degree',
                                                    value: newValue,
                                                },
                                            })
                                    }
                                    select={educationData.degree}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CountrySelect
                                    select={educationData.country}
                                    setSelect={(newValue) => handleInputChange({
                                        target: {
                                            name: 'country',
                                            value: newValue,
                                        }
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    type="date"
                                    label="Beginning Date"
                                    name="beginningDate"
                                    value={newEducation.beginningDate}
                                    onChange={handleInputChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true, // Etiketi her zaman yukarıda tutar
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    type="date"
                                    label="Graduation Date"
                                    name="graduationDate"
                                    value={newEducation.isOngoing ? '' : newEducation.graduationDate} // Update to use education.isOngoing
                                    onChange={(e) => handleInputChange(e)}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    disabled={newEducation.isOngoing} // Disable the date input if ongoing
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={newEducation.isOngoing} // Reflect correct state
                                            onChange={(e) => handleCheckboxChange(e)} // Correctly pass index
                                            color="primary"
                                        />
                                    }
                                    label="Continue"
                                />
                            </Grid>


                        </Grid>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Button startIcon={<Add />} variant="contained" color="primary" onClick={handleAddEducation}>
                                Add Education
                            </Button>



                        </Box>
                    </Paper>
                )}
                <Stack justifyContent="end" direction="row" mt={2}>
                    <Button
                        variant="outlined"
                        color={showAddForm ? "error" : "primary"}
                        startIcon={showAddForm ? <Cancel /> : <Add />}
                        onClick={() => setShowAddForm(!showAddForm)}
                        disabled={editIndex !== null}
                    >
                        {showAddForm ? 'Cancel' : 'Add New Education'}
                    </Button>
                </Stack>

            </Paper>
        </Container >
    );
};

export default EducationPage;
