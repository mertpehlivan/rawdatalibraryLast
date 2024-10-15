import React, { useState } from 'react';
import { Button, Checkbox, Container, Divider, FormControlLabel, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { useUserContext } from '../auth/AuthProvider';
import Img from '../assets/login-page-img.jpg';
import { login } from '../services/authServices';
import { LoadingButton } from '@mui/lab';

export default function LoginPage() {
    const { handleAuth } = useUserContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorHandlerText, setErrorHandlerText] = useState('');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginFetch = async () => {
        setIsLoading(true);
        setErrorHandlerText("");
        try {
            const data = { email, password };
            const response = await login(data);
            handleAuth(response.data);
            navigate("/");
        } catch (e) {
            setErrorHandlerText(e.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md" mx>
            <Grid
                container
                bgcolor="background.default"
                mt={5}
                borderRadius={2}
                p={2}
                boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
            >
                <Grid item md={6}>
                    <form>
                        <Stack direction="column" px={5}>
                            <Stack alignItems="center" mb={5} direction="row">
                                <Link to="/"><Button variant="contained" startIcon={<ArrowBack />}>Back</Button></Link>
                            </Stack>
                            <Divider />

                            <TextField
                                type="email"
                                sx={{ mt: 5 }}
                                size="small"
                                variant="outlined"
                                label="Email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <Link to="/forget-password">
                                <Typography sx={{ mt: 2 }} textAlign="right">
                                    Forget password?
                                </Typography>
                            </Link>
                            <TextField
                                type="password"
                                size="small"
                                variant="outlined"
                                label="Password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />

                            <Stack mt={1}>
                                <FormControlLabel control={<Checkbox />} label="Keep me logged in" />
                            </Stack>
                            <Typography color="error">{errorHandlerText}</Typography>
                            <LoadingButton
                                onClick={loginFetch}
                                loading={isLoading}
                                disabled={isLoading || !email || !password} // Disable button if loading or fields are empty
                                fullWidth
                                size='large'
                                variant='contained'
                            >
                                Login
                            </LoadingButton>

                            <Typography sx={{ mt: 1 }}>
                                Don’t have an account yet? <Link to="/signup">Sign up</Link>
                            </Typography>
                        </Stack>
                    </form>
                </Grid>
                {!isSmallScreen && (
                    <Grid item md={6}>
                        <Stack borderRadius={2} justifyContent="center">
                            <img src={Img} width={400} height={400} style={{ borderRadius: 5 }} alt="Login Illustration" />
                        </Stack>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}
