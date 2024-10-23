import { Box, Stack, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { X, YouTube } from '@mui/icons-material';

function Footer() {
    return (
        <Box position="static" bottom={0} left={0} width="100%">
            <Stack p={2} mt={2} height={150} bgcolor="white" justifyContent="center" alignItems="center" borderRadius={3}>
                <Typography>©2024 Raw Data Library</Typography>
                
                <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                    <Link to="/terms" target='_blank'><Typography>Terms</Typography></Link>
                    <Link to="/privacy" target='_blank'><Typography>Privacy</Typography></Link>
                    <Link to="/faq" target='_blank'><Typography>Faq</Typography></Link>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                    <IconButton component="a" href="https://www.facebook.com/Rawdatalibrary/" target="_blank" aria-label="Facebook">
                        <FacebookIcon />
                    </IconButton>
                    <IconButton component="a" href="https://x.com/rawdatalibrary" target="_blank" aria-label="Twitter">
                        <X />
                    </IconButton>
                    <IconButton component="a" href="https://www.youtube.com/@Rawdatalibrary" target="_blank" aria-label="Youtube">
                        <YouTube />
                    </IconButton>
                    <IconButton component="a" href="https://www.instagram.com/rawdatalibrary_company/" target="_blank" aria-label="Instagram">
                        <InstagramIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Footer;
