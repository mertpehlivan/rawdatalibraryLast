import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Stack,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
} from '@mui/material';
import NoAuthBar from '../components/NoAuthBar';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL
const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        // Get the token from the query string
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        if (code) {
            setToken(code);
        } else {
            setError("Invalid or missing reset code.");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        // Basic validation
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            // API call to reset the password
            const response = await axios.post(`${baseUrl}/api/v1/no-auth/reset-password`, { // Adjust your API endpoint
                code: token,
                newPassword: newPassword,
            });

            if (response.status === 200) {
                setSuccess(true);
                setLoading(false);
                setNewPassword('');
                setConfirmPassword('');
                // Navigate to login page after successful reset
                navigate('/login');
            } else {
                setError("Failed to reset password. Please try again.");
                setLoading(false);
            }
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                const message = err.response.data.message || "An error occurred. Please try again.";
                setError(message);
            } else {
                // Something happened in setting up the request
                setError("An error occurred while connecting to the server. Please check your network.");
            }
            setLoading(false);
        }
    };

    return (
        <>
            <Container sx={{ mt: 3 }} maxWidth="sm">
                <Paper elevation={3} style={{ padding: '20px', borderRadius: 5 }}>
                    <Stack spacing={2}>
                        <Typography variant="h5" color="primary.main" align="center" gutterBottom>
                            Reset Password
                        </Typography>
                        <Typography variant="body2" align="center" gutterBottom>
                            Please enter your new password below. The reset link is valid for 1 hour.
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    label="New Password"
                                    variant="outlined"
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(prev => !prev)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    label="Confirm Password"
                                    variant="outlined"
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(prev => !prev)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {error && (
                                    <Typography variant="body2" color="error" align="center">
                                        {error}
                                    </Typography>
                                )}
                                {success && (
                                    <Typography variant="body2" color="success.main" align="center">
                                        Password reset successfully!
                                    </Typography>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    disabled={loading || !newPassword || !confirmPassword}
                                >
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
};

export default ResetPasswordPage;
