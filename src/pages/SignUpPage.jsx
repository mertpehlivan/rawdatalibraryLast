import React, { useState } from 'react';
import { Box, Button, Container, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import Logo from '../assets/logo.svg';
import Img from '../assets/register-image.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBack, Dangerous } from '@mui/icons-material';
import Footer from '../components/Footer';
import CountrySelect from '../components/CountrySelect';
import { register } from '../services/authServices';

export default function SignUpPage() {
    const navigate = useNavigate();
    const [errorHandlerText, setErrorHandlerText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        country: '',
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formValues.firstname) errors.firstname = "Firstname is required";
        if (!formValues.lastname) errors.lastname = "Lastname is required";
        if (!formValues.uniqueName) errors.uniqueName = "Username is required";
        if (!formValues.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = "Enter a valid email";
        }
        if (!formValues.password) {
            errors.password = "Password is required";
        } else if (formValues.password.length < 8) {
            errors.password = "Password should be at least 8 characters long";
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);
        

        setIsLoading(true);
        try {
            await register(formValues);
            navigate("/login");
        } catch (e) {
            setErrorHandlerText(e.response?.data?.errorMessage || "This email is already associated with an account. Please use a different email or log in.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth='md'>
            <Grid
                container
                bgcolor='background.default'
                mt={5}
                borderRadius={2}
                p={2}
                boxShadow='rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
            >
                <Grid item xs={6}>
                    <Stack direction='column' px={5}>
                        <Stack alignItems='center' mb={5} direction="row" spacing={1}>
                            <Link to="/"><Button variant="contained" startIcon={<ArrowBack />}>Back</Button></Link>
                            <img src={Logo} alt="Logo" width='175px' />
                        </Stack>
                        <Divider />
                        <Stack component='form' onSubmit={handleSubmit}>
                            <TextField
                                sx={{ mt: 5 }}
                                size='small'
                                variant='outlined'
                                label='First Name'
                                name='firstname'
                                value={formValues.firstname}
                                onChange={handleChange}
                                error={Boolean(formErrors.firstname)}
                                helperText={formErrors.firstname}
                            />
                            <TextField
                                sx={{ mt: 3 }}
                                size='small'
                                variant='outlined'
                                label='Last Name'
                                name='lastname'
                                value={formValues.lastname}
                                onChange={handleChange}
                                error={Boolean(formErrors.lastname)}
                                helperText={formErrors.lastname}
                            />
                            <CountrySelect
                                select={formValues.country}
                                setSelect={(value) => setFormValues({ ...formValues, country: value })}
                            />
                            <TextField
                                name='email'
                                type='email'
                                sx={{ mt: 3 }}
                                size='small'
                                variant='outlined'
                                label='Email'
                                value={formValues.email}
                                onChange={handleChange}
                                error={Boolean(formErrors.email)}
                                helperText={formErrors.email}
                            />
                            <TextField
                                name='password'
                                type='password'
                                sx={{ mt: 3, mb: 3 }}
                                size='small'
                                variant='outlined'
                                label='Password'
                                value={formValues.password}
                                onChange={handleChange}
                                error={Boolean(formErrors.password)}
                                helperText={formErrors.password}
                            />
                            {errorHandlerText && (
                                <Stack direction="row">
                                    <Dangerous sx={{ color: "red" }} />
                                    <Typography color="red">{errorHandlerText}</Typography>
                                </Stack>
                            )}
                            <Button onClick={handleSubmit} type='submit' size='large' sx={{ mt: 1 }} color="primary" variant='contained' disabled={isLoading}>
                                {isLoading ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                            <Typography sx={{ mt: 1 }}>
                                Account already exists. <Link to="/login">Log in</Link>
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack borderRadius={2} justifyContent='center'>
                        <img src={Img} alt="Registration" height='550px' style={{ borderRadius: '2%' }} />
                    </Stack>
                </Grid>
            </Grid>
            <Footer />
        </Container>
    );
}
