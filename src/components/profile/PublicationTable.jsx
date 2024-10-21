import * as React from 'react';
import { Paper, useMediaQuery, useTheme, Box, CircularProgress, List, ListItem, ListItemText, ListItemIcon, Link, Typography, Stack } from '@mui/material';
import axios from 'axios';
import { useUserContext } from '../../auth/AuthProvider';
import { useParams, useNavigate } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Science from '@mui/icons-material/Science';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const formatEnumValue = (enumValue) => {
  const strValue = String(enumValue);
  return (strValue.charAt(0).toUpperCase() + strValue.slice(1).toLowerCase()).replace(/_/g, ' ');
};

// Function to extract the year from a date string
const getYearFromDate = (date) => {
  return date ? new Date(date).getFullYear() : 'Unknown';
};
const publications = [
  { id: 0, key: "Article", value: "Article", icon: <ArticleIcon /> },
  { id: 1, key: "Thesis", value: "Thesis", icon: <SchoolIcon /> },
  { id: 2, key: "Chapter in a book", value: "Chapter in a book", icon: <BookIcon /> },
  { id: 3, key: "Conference paper", value: "Conference paper", icon: <AssignmentIcon /> },
  { id: 4, key: "Research project", value: "Research project", icon: <Science /> },
  { id: 5, key: "Company test report", value: "Company test report", icon: <BusinessCenterIcon /> }
];
export default function PublicationTable({ publicStatus = false }) {
  const [rows, setRows] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const { token } = useUserContext();
  const { userId } = useParams();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const fetchPublications = async (page = 0) => {
    setLoading(true);
    try {
      const url = publicStatus
        ? `${process.env.REACT_APP_BASE_URL}/api/v1/no-auth/publication/${userId}/publications`
        : `${process.env.REACT_APP_BASE_URL}/api/v1/publication/${userId}/publications`;

      const config = {
        params: { page, size: 5 },
      };

      if (!publicStatus) {
        config.headers = { 'Authorization': `Bearer ${token}` };
      }

      const response = await axios.get(url, config);
      const fetchedRows = response.data.profilePagePublicationResponses.map(item => ({
        id: item.id,
        title: item.header,
        type: formatEnumValue(item.type),
        year: item.creationDate,
        summary: item.summary || 'No summary available',
      }));
      console.log(fetchedRows)
      setRows(fetchedRows);
      setTotalPage(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching publications:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPublications(currentPage);
  }, [token, userId, currentPage]);

  const handleRowClick = (publicationId) => {
    navigate(`/publication/${publicationId}`);
  };
  const getTimeElapsed = (time) => {
    if (!time || isNaN(new Date(time))) {
      console.error('Invalid time:', time);
      return null; // Geçersiz zaman durumunda uygun bir geri dönüş
    }

    const now = new Date();
    const createdAt = new Date(time);
    const elapsedSeconds = Math.floor((now - createdAt) / 1000);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (elapsedSeconds < 60) {
      return rtf.format(-elapsedSeconds, 'second');
    }
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    if (elapsedMinutes < 60) {
      return rtf.format(-elapsedMinutes, 'minute');
    }
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) {
      return rtf.format(-elapsedHours, 'hour');
    }
    const elapsedDays = Math.floor(elapsedHours / 24);
    return rtf.format(-elapsedDays, 'day');
  };
  return (
    <Paper elevation={3} sx={{ borderRadius: 3, p: 1, overflow: 'hidden' }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <CircularProgress />
        </Box>
      ) : (
        <List>
          <Typography fontWeight="bold" color="primary.main" variant='h5'>The last 5 uploaded publications</Typography>
          {rows.map((pub) => (
            <ListItem
              key={pub.id}
              button
              onClick={() => handleRowClick(pub.id)}
              sx={{
                borderBottom: '1px solid #e0e0e0',
                '&:last-child': { borderBottom: 'none' },
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ListItemIcon>
                <Stack alignItems="center" justifyContent="center" m={1}>
                  {publications.find(p => p.value === pub.type)?.icon || <ArticleIcon />}
                  <Typography>{getTimeElapsed(pub.year)}</Typography>
                </Stack>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Link
                    href={`/publication/${pub.id}`}
                    underline="hover"
                    color="primary"
                    sx={{
                      fontWeight: 'bold',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {pub.title || 'Untitled'}
                  </Link>
                }
                secondary={pub.summary}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
