import { Container, Paper, Stack, TextField, Typography, InputAdornment, Link, Snackbar } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import React, { useState, useEffect } from 'react';
import NoAuthBar from '../components/NoAuthBar';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios'; // Axios'u import ediyoruz
const baseUrl = process.env.REACT_APP_BASE_URL
const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    
    const handleSendResetLink = async () => {
        if (email) {
            setLoading(true);
            setIsTimerActive(true);
            setTimer(120); // Set timer for 2 minutes (120 seconds)

            try {
                // API isteği atıyoruz
                await axios.post(`${baseUrl}/api/v1/no-auth/forget-password`, {
                    email: email,
                    baseUrl: window.location.origin // Temel URL'yi alıyoruz
                });
                
                setOpenSnackbar(true); // Başarılıysa Snackbar'ı aç
                setEmail(''); // Giriş alanını temizle
            } catch (error) {
                console.error("Error sending reset link:", error);
                // Hata mesajını gösterebilirsiniz
                setOpenSnackbar(true); // İstekte bir hata oluşursa Snackbar'ı aç
            } finally {
                setLoading(false); // Yükleme durumu
            }
        }
    };

    useEffect(() => {
        let interval;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [isTimerActive, timer]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const isEmailValid = /^\S+@\S+\.\S+$/.test(email); // Basit e-posta doğrulaması

    return (
        <>
            <Container sx={{ mt: 3 }} maxWidth="sm">
                <Paper elevation={3} style={{ padding: '20px', borderRadius: 5 }}>
                    <Stack spacing={2}>
                        <Typography variant="h5" color="primary.main" align="center" gutterBottom>
                            Forget Password
                        </Typography>
                        <Typography variant="body2" align="center" gutterBottom>
                            Enter your email address below, and we’ll send you a link to reset your password.
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                label="Email Address"
                                variant="outlined"
                                fullWidth
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleSendResetLink}
                                loading={loading}
                                disabled={!isEmailValid || loading || isTimerActive} // E-posta geçersizse veya yükleniyorsa veya zamanlayıcı aktifse devre dışı bırak
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </LoadingButton>
                            {isTimerActive && (
                                <Typography variant="body2" color="error" align="center">
                                     The reset link is valid for {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
                                </Typography>
                            )}
                            <Typography variant="body2" align="center">
                                <Link href="/login" underline="hover" sx={{ mr: 1 }}>
                                    Cancel
                                </Link>
                                or
                                <Link href="/register" underline="hover" sx={{ ml: 1 }}>
                                    Register
                                </Link>
                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Reset link has been sent to your email!"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </>
    );
};

export default ForgetPasswordPage;
