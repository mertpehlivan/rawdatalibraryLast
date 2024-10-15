import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Avatar,
    TextField,
    Grid,
    Typography,
    Select,
    MenuItem,
    Divider,
    FormControl,
    InputLabel,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person'; // Example icon for better user experience
import WorkIcon from '@mui/icons-material/Work'; // Example icon for job-related fields
import axios from 'axios';
import { useUserContext } from '../../auth/AuthProvider';
import CountrySelect from '../CountrySelect';
import UniversitySearch from './UniversitySearch';
import DepartmentSearch from './DepartmentSearch';
import AcademicDegree from './AcademicDegree';
import PositionSearch from './PositionSearch'
import styled from '@emotion/styled/macro';
import { Image } from '@mui/icons-material';
import { getProfileImage } from '../../services/imageServices';
import { LoadingButton } from '@mui/lab';
const ProfileEditDialog = ({ editedUser, handleSave, handleDialogClose, dialogOpen, image }) => {
    const [userData, setUserData] = React.useState(editedUser);
    const [isEditing, setIsEditing] = React.useState({
        firstname: false,
        lastname: false,
        country: false,
        institution: false,
        department: false,
        academicDegree: false,
        position: false,
    });
    const [loading, setLoading] = useState(false); // State to track loading
    const { token } = useUserContext();
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [previews, setPreviews] = useState(image);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to an array
        const previewUrls = files.map((file) => URL.createObjectURL(file)); // Generate preview URLs
        setSelectedFiles(files);
        setPreviews(previewUrls);

    };

    const handleSaveImage = async () => {
        setLoading(true)
        if (selectedFiles && selectedFiles.length > 0) {
            const formData = new FormData();
            formData.append('file', selectedFiles[0]); // Append the first selected image file

            try {
                const response = await axios.post(`${baseUrl}/api/v1/user/profile-image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',

                        'Authorization': `Bearer ${token}`,

                    },

                });
                window.location.reload()
                console.log('File saved:', response.data); // Handle success (e.g., show a success message or update state)
            } catch (error) {
                console.error('Error uploading file:', error); // Handle error (e.g., show an error message)
            } finally {
                setLoading(false)
            }
        }
    };

    const handleCancel = () => {
        setSelectedFiles(null); // Clear the selected files
    };
    const openSnackbar = (message, severity = 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    // Function to close Snackbar
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
    // Toggle edit state for a specific field
    const toggleEditing = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    // Handle saving changes for a specific field
    const handleSaveChanges = (field) => {
        // Call the provided save function
        toggleEditing(field); // Toggle editing state after saving
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle canceling edit for a specific field
    const handleCancelEdit = (field) => {
        toggleEditing(field); // Just toggle editing state to cancel
        // Reset the input field to the original value if needed
        setUserData((prev) => ({ ...prev, [field]: editedUser[field] }));
    };

    // Specific functions for each field's icon actions
    const editFirstname = () => toggleEditing('firstname');
    const saveFirstname = async () => {
        if (!userData.firstname) {
            openSnackbar('Firstname cannot be empty');
            return;
        }
        handleSaveChanges('firstname')
        const response = await axios.put(`${baseUrl}/api/v1/user/update-firstname`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                newFirstname: userData.firstname,
            },

        });
        handleSave();
    };
    const cancelFirstname = () => handleCancelEdit('firstname');

    const editLastname = () => toggleEditing('lastname');
    const saveLastname = async () => {
        if (!userData.lastname) {
            openSnackbar('Lastname cannot be empty');
            return;
        }
        handleSaveChanges('lastname')
        const response = await axios.put(`${baseUrl}/api/v1/user/update-lastname`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                newLastname: userData.lastname,
            },
        });
        handleSave();
    };
    const cancelLastname = () => handleCancelEdit('lastname');

    const editCountry = () => toggleEditing('country');
    const saveCountry = async () => {
        if (!userData.country) {
            openSnackbar('Country cannot be empty');
            return;
        }
        handleSaveChanges('country');
        const response = await axios.put(`${baseUrl}/api/v1/user/update-country`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                newCountry: userData.country,
            },
        });
        handleSave();
    }
    const cancelCountry = () => handleCancelEdit('country');

    const editInstitution = () => toggleEditing('institution');
    const saveInstitution = async () => {
        if (!userData.institution) {
            openSnackbar('Institution cannot be empty');
            return;
        }
        handleSaveChanges('institution')
        const response = await axios.put(`${baseUrl}/api/v1/user/update-university`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                newUniversity: userData.institution,
            },
        });
        handleSave();
    };
    const cancelInstitution = () => handleCancelEdit('institution');

    const editDepartment = () => toggleEditing('department');
    const saveDepartment = async () => {
        if (!userData.department) {
            openSnackbar('Department cannot be empty');
            return;
        }
        handleSaveChanges('department')
        const response = await axios.put(`${baseUrl}/api/v1/user/update-department`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                newDepartment: userData.department,
            },
        });
        handleSave();
    };
    const cancelDepartment = () => handleCancelEdit('department');

    const editAcademicDegree = () => toggleEditing('academicDegree');
    const saveAcademicDegree = async () => {
        if (!userData.academicDegree) {
            openSnackbar('Academic Degree cannot be empty');
            return;
        }
        handleSaveChanges('academicDegree')
        const response = await axios.put(`${baseUrl}/api/v1/user/update-academic-degree`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                newAcademicDegree: userData.academicDegree,
            },
        });
        handleSave();
    };
    const cancelAcademicDegree = () => handleCancelEdit('academicDegree');

    const editPosition = () => toggleEditing('position');
    const savePosition = async () => {
        if (!userData.position) {
            openSnackbar('Position cannot be empty');
            return;
        }
        handleSaveChanges('position')
        const response = await axios.put(`${baseUrl}/api/v1/user/update-position`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                newPosition: userData.position,
            },
        });
        handleSave();
    };
    const cancelPosition = () => handleCancelEdit('position');
    const toNormalCase = (str) => {
        return str
            .replace(/([A-Z])/g, ' $1') // Add a space before each uppercase letter
            .replace(/^./, (char) => char.toUpperCase()) // Capitalize the first letter
            .trim(); // Remove any leading/trailing whitespace
    };
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Dialog maxWidth="md" fullWidth open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
                Edit Profile
                <IconButton onClick={handleDialogClose} style={{ float: 'right' }}>
                    <Close fontSize="large" />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: '#fff', padding: 3 }}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <Stack direction="row" justifyContent="center" mb={2} spacing={1} alignItems="center">
                            <Avatar
                                src={previews}
                                sx={{ width: 100, height: 100, border: '3px solid #3f51b5' }} // Adds a border around the avatar
                            />
                            <Stack spacing={2} alignItems="center">
                                {!selectedFiles && <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<Image />}
                                >
                                    Upload NEW Profile Image
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                </Button>}

                                {selectedFiles && (
                                    <Stack spacing={1} alignItems="center">
                                        <Typography variant="body1">Selected files:</Typography>
                                        {Array.from(selectedFiles).map((file, index) => (
                                            <Typography key={index} variant="body2">
                                                {file.name}
                                            </Typography>
                                        ))}

                                        <Stack direction="row" spacing={2}>
                                            <LoadingButton loading={loading} variant="contained" color="primary" onClick={handleSaveImage}>
                                                Save
                                            </LoadingButton>
                                            <Button variant="outlined" color="secondary" onClick={handleCancel}>
                                                Cancel
                                            </Button>
                                        </Stack>
                                    </Stack>
                                )}
                            </Stack>
                        </Stack>
                    </Grid>
                    {/* Render each field with separate icon functions */}
                    {['firstname', 'lastname', 'country', 'institution', 'department', 'academicDegree', 'position'].map((field, index) => (
                        <Grid item md={12} key={index}>
                            <Stack direction="row" alignItems="center" >
                                <Typography variant="h6" color="primary.main" >
                                    {field == "academicDegree" ? toNormalCase(field) : field.charAt(0).toUpperCase() + field.slice(1)}
                                </Typography>
                                {!isEditing[field] && <IconButton
                                    onClick={
                                        field === 'firstname' ? editFirstname :
                                            field === 'lastname' ? editLastname :
                                                field === 'country' ? editCountry :
                                                    field === 'institution' ? editInstitution :
                                                        field === 'department' ? editDepartment :
                                                            field === 'academicDegree' ? editAcademicDegree :
                                                                field === 'position' ? editPosition :
                                                                    null
                                    }
                                    color="primary">
                                    <EditIcon fontSize="small" />
                                </IconButton>}
                            </Stack>

                            <Divider />
                            {isEditing[field] ? (
                                <FormControl fullWidth variant="outlined" sx={{pt:2}}>

                                    {field == 'country' ?
                                        <CountrySelect
                                            select={userData[field] || ''}
                                            setSelect={(newValue) => handleInputChange({
                                                target: {
                                                    name: field,
                                                    value: newValue,
                                                }
                                            })}
                                        />
                                        :
                                        field == 'institution' ?

                                            <UniversitySearch
                                                label ="Institution"
                                                onSelectUniversity={(newValue) => handleInputChange({
                                                    target: {
                                                        name: field,
                                                        value: newValue,
                                                    }
                                                })}
                                                selectedUniversity={userData[field] || ''}
                                            />
                                            :
                                            field == 'department' ?

                                                <DepartmentSearch
                                                    onSelectDepartment={(newValue) => handleInputChange({
                                                        target: {
                                                            name: field,
                                                            value: newValue,
                                                        }
                                                    })}
                                                    selectedDepartment={userData[field] || ''}
                                                />
                                                :
                                                field == 'academicDegree' ?

                                                    <AcademicDegree onSelectTitle={(newValue) => handleInputChange({
                                                        target: {
                                                            name: field,
                                                            value: newValue,
                                                        }
                                                    })}
                                                        selectedTitle={userData[field] || ''}
                                                    />
                                                    :
                                                    field == 'position' ?

                                                        <PositionSearch
                                                            onSelectPosition={(newValue) => handleInputChange({
                                                                target: {
                                                                    name: field,
                                                                    value: newValue,
                                                                }
                                                            })}
                                                            selectedPosition={userData[field] || ''}
                                                        />
                                                        :

                                                        <TextField
                                                            id={field}
                                                            variant="outlined"
                                                            name={field}
                                                            value={userData[field] || ''} // Use userData instead of editedUser
                                                            onChange={handleInputChange}
                                                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                                                            InputProps={{
                                                                startAdornment: <PersonIcon sx={{ mr: 1, color: '#3f51b5' }} />,
                                                                sx: { paddingLeft: 2 },
                                                                placeholder: '', // Remove placeholder
                                                            }}
                                                        />}
                                    <Stack direction="row" spacing={1} mt={1}>
                                        {/* Call specific save and cancel functions for each field */}
                                        <IconButton onClick={
                                            field === 'firstname' ? saveFirstname :
                                                field === 'lastname' ? saveLastname :
                                                    field === 'country' ? saveCountry :
                                                        field === 'institution' ? saveInstitution :
                                                            field === 'department' ? saveDepartment :
                                                                field === 'academicDegree' ? saveAcademicDegree :
                                                                    field === 'position' ? savePosition :
                                                                        null
                                        } color="primary">
                                            <SaveIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton onClick={
                                            field === 'firstname' ? cancelFirstname :
                                                field === 'lastname' ? cancelLastname :
                                                    field === 'country' ? cancelCountry :
                                                        field === 'institution' ? cancelInstitution :
                                                            field === 'department' ? cancelDepartment :
                                                                field === 'academicDegree' ? cancelAcademicDegree :
                                                                    field === 'position' ? cancelPosition :
                                                                        null} color="secondary">
                                            <CancelIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </FormControl>
                            ) : (
                                <Stack direction="row" alignItems="center" justifyContent="start" spacing={1}>
                                    <Typography variant="body1" sx={{ flexGrow: 1 }}>{userData[field]}</Typography>
                                </Stack>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary">Close</Button>
            </DialogActions>
            <div>
                {/* Your component JSX goes here */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </Dialog>
    );
};

export default ProfileEditDialog;
