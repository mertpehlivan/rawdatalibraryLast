import { Box, Stack, Typography} from '@mui/material';
import PayImage from '../assets/Adsız tasarım.svg'
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <Box position="static" bottom={0} left={0} width="100%">
            <Stack p={2} mt={2} height={100} bgcolor="white" justifyContent="center" alignItems="center" borderRadius={3}>
                <Typography>©2024 Raw Data Library</Typography>
                <Stack direction="row" spacing={1}>
                    <Link to="/terms" target='_blank'><Typography>Terms</Typography></Link>
                    <Link to="/privcy" target='_blank'><Typography>Privacy</Typography></Link>
                    <Link to="/faq" target='_blank'><Typography>Faq</Typography></Link>
                </Stack>
              
            </Stack>
        </Box>
    )
}

export default Footer;