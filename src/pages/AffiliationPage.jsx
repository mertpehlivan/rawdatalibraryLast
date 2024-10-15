import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Add this line
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Container, Grid, IconButton, Paper, Stack, TextField, Button, Typography, Checkbox, FormControlLabel, Box } from '@mui/material';
import { TimelineOppositeContent, timelineOppositeContentClasses } from '@mui/lab';
import { Edit, Save, Cancel, Add, ArrowBack, Delete } from '@mui/icons-material';
import UniversitySearch from '../components/profile/UniversitySearch';
import DepartmentSearch from '../components/profile/DepartmentSearch';
import AcademicDegree from '../components/profile/AcademicDegree';
import PositionSearch from '../components/profile/PositionSearch';
import { useNavigate } from 'react-router-dom';
import { createAffiliation, updateAffiliation, getAffiliationsByCurrentUser, deleteAffiliation } from '../services/affiliationServices'; // Update this line
import { useUserContext } from '../auth/AuthProvider'
import CountrySelect from '../components/CountrySelect';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from "framer-motion";
export default function AffiliationPage() {
    const navigate = useNavigate();
    const userId = 'yourUserId'; // Replace with actual user ID
    const { token } = useUserContext()
    const [affiliations, setAffiliations] = useState([]);
    const [formValues, setFormValues] = useState({
        startDate: '',
        endDate: '',
        institution: '',
        faculty: '',
        department: '',
        position: '',
        country: '',
        academicDegree: '',
    });

    const [isPresent, setIsPresent] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [initialValues, setInitialValues] = useState({});
    const [valid, setValid] = useState(false)

    useEffect(() => {
        const { startDate, institution, faculty, department, position, country, academicDegree } = formValues;
        if (!startDate || !institution || !faculty || !department || !position || !country || !academicDegree) {
            setValid(false)
        } else {
            setValid(true)
        }
    }, [formValues]);


    // Fetch affiliations on component mount
    useEffect(() => {
        const fetchAffiliations = async () => {
            try {
                const data = await getAffiliationsByCurrentUser(token);
                console.log(data)
                setAffiliations(data);
            } catch (error) {
                console.error('Failed to fetch affiliations:', error);
            }
        };

        fetchAffiliations();
    }, [userId, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSelectUniversity = (newValue) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            institution: newValue,
        }));
    };

    const handlePresentChange = (e) => {
        const checked = e.target.checked;
        setIsPresent(checked);
        setFormValues((prevValues) => ({
            ...prevValues,
            endDate: checked ? null : '',
        }));
    };

    const handleAddAffiliation = () => {
        setIsFormVisible(true);
        setEditingIndex(null);
        resetForm();
    };

    const resetForm = () => {
        setFormValues({
            startDate: '',
            endDate: '',
            institution: '',
            faculty: '',
            department: '',
            position: '',
            country: '',
            academicDegree: '',
        });
        setIsPresent(false);
    };
    const handleDeleteAffiliation = async (index) => {
        const affiliationId = affiliations[index].id;
        try {
            await deleteAffiliation(affiliationId, token);
            setAffiliations((prevAffiliations) => prevAffiliations.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Failed to delete affiliation:", error);
        }
    };
    const handleSave = async () => {
        if (editingIndex !== null) {
            try {
                const affiliationId = affiliations[editingIndex].id; // Assume you have an _id field
                await updateAffiliation(affiliationId, formValues, token);
                const updatedAffiliations = [...affiliations];
                updatedAffiliations[editingIndex] = { ...formValues, _id: affiliationId };
                setAffiliations(updatedAffiliations);
                setEditingIndex(null)
            } catch (error) {
                console.error('Failed to update affiliation:', error);
            }
        } else {
            try {
                const newAffiliation = await createAffiliation(formValues, token);
                setAffiliations((prevAffiliations) => [...prevAffiliations, newAffiliation]);
            } catch (error) {
                console.error('Failed to create affiliation:', error);
            }
        }
        setIsFormVisible(false);
        resetForm();
    };

    const handleEditAffiliation = (index) => {
        if (index >= 0 && index < affiliations.length) { // Check if the index is valid
            setEditingIndex(index);
            const selectedAffiliation = affiliations[index];
            setInitialValues(selectedAffiliation);
            setFormValues(selectedAffiliation);
            setIsPresent(selectedAffiliation.endDate === 'present');
            setIsFormVisible(true);
        }
    };

    const handleCancelEdit = () => {
        setIsFormVisible(false);
        setEditingIndex(null);
        resetForm();
    };
    const sliceTre = (string) => {
        if (string) {
            const parts = string.split("-");
            if (parts.length > 1) {
                const result = parts[1].toLowerCase();
                console.log(result);
                return result;
            }
        }
        return "";
    }
    const isSaveDisabled = () => {
        return JSON.stringify(initialValues) === JSON.stringify(formValues);
    };
    const formatDate = (dateString) => {
        if (!dateString) {
            return "Present";
        }

        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 4 }}>
                    Back
                </Button>
                <Stack direction="row" spacing={0.5} color="primary.main" alignItems="center" >
                    <Icon width={20} height={20} icon="ph:building" />
                    <Typography variant="h5" fontWeight="bold">
                        Affiliation Edit
                    </Typography>
                </Stack>
                <Stack alignItems="start">
                    <Timeline
                        sx={{
                            [`& .${timelineOppositeContentClasses.root}`]: {
                                flex: 0.3,
                            },
                        }}
                    >
                        {affiliations.map((affiliation, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: index * 0.3 }} // Animated entrance
                            >
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary" sx={{ typography: 'body2', lineHeight: 1.5 }}>
                                        {`${formatDate(affiliation.startDate)} - ${formatDate(affiliation.endDate)}`}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary" sx={{ transform: 'scale(1.2)' }} />
                                        {index < affiliations.length - 1 && <TimelineConnector sx={{ backgroundColor: '#1976d2' }} />}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography variant='h5' component="span" sx={{ fontWeight: 600 }} color="primary">{affiliation.institution}</Typography>
                                        <Typography variant="h6">
                                            {`Fac. of ${affiliation.faculty}, Dept. of ${affiliation.department}`}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {affiliation.position}/ {affiliation.academicDegree}
                                        </Typography>
                                        <Stack direction="row" alignItems="center">
                                            <img
                                                style={{ marginRight: 6 }}
                                                loading="lazy"
                                                srcSet={`https://flagcdn.com/w40/${sliceTre(affiliation.country)}.png 2x`}
                                                src={`https://flagcdn.com/w20/${sliceTre(affiliation.country)}.png`}
                                                alt=""
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                {affiliation.country}
                                            </Typography>
                                        </Stack>


                                        {editingIndex === null && (
                                            <div style={{ display: 'flex', marginTop: 8 }}>
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleEditAffiliation(index)}
                                                    sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' } }}
                                                >
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() => handleDeleteAffiliation(index)}
                                                    sx={{ '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.1)' }, ml: 1 }}
                                                >
                                                    <Delete color='error' fontSize="small" />
                                                </IconButton>
                                            </div>
                                        )}
                                    </TimelineContent>
                                </TimelineItem>
                            </motion.div>
                        ))}

                    </Timeline>
                </Stack>

                {isFormVisible && (
                    <Paper elevation={3} sx={{ p: 2, borderRadius: 5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary" sx={{ mt: 4 }}>
                                    {editingIndex !== null ? 'Edit Affiliation' : 'Add New Affiliation'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <UniversitySearch
                                    onSelectUniversity={handleSelectUniversity}
                                    selectedUniversity={formValues.institution}
                                    label="Institution"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size="small"
                                    name="faculty"
                                    value={formValues.faculty}
                                    onChange={handleInputChange}
                                    fullWidth
                                    label="Faculty"
                                    variant="outlined"
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
                                    selectedDepartment={formValues.department}
                                    label="Department"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <PositionSearch
                                    onSelectPosition={(newValue) =>
                                        handleInputChange({
                                            target: {
                                                name: 'position',
                                                value: newValue,
                                            },
                                        })
                                    }
                                    selectedPosition={formValues.position}
                                    label="Position"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CountrySelect
                                    select={formValues.country}
                                    setSelect={(newValue) => handleInputChange({
                                        target: {
                                            name: "country",
                                            value: newValue,
                                        }
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <AcademicDegree onSelectTitle={(newValue) => handleInputChange({
                                    target: {
                                        name: "academicDegree",
                                        value: newValue,
                                    }
                                })}
                                    selectedTitle={formValues.academicDegree}
                                />

                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="date"
                                    name="startDate"
                                    value={formValues.startDate}
                                    onChange={handleInputChange}
                                    fullWidth
                                    size="small"
                                    label="Start Date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="date"
                                    name="endDate"
                                    value={isPresent ? 'present' : formValues.endDate}
                                    onChange={handleInputChange}
                                    fullWidth
                                    size="small"
                                    label="End Date"
                                    disabled={isPresent}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isPresent}
                                            onChange={handlePresentChange}
                                            color="primary"
                                        />
                                    }
                                    label="Present"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        onClick={handleSave}
                                        disabled={!valid}
                                        startIcon={editingIndex == null ? <Add /> : <Save />}
                                    >
                                        {editingIndex == null ? "Add" : "Save"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleCancelEdit}
                                        startIcon={<Cancel />}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
                <Button
                    disabled={isFormVisible}
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleAddAffiliation}
                    sx={{ mt: 2 }}
                >
                    Add New Affiliation
                </Button>
            </Paper>
        </Container>
    );
}
