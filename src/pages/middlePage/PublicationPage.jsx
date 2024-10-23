import React, { useEffect, useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
  Link,
  Stack,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Science from '@mui/icons-material/Science';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import axios from 'axios';
import { useUserContext } from '../../auth/AuthProvider';
import { useParams } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_BASE_URL;

const publications = [
  { id: 0, key: "Article", value: "Article", icon: <ArticleIcon />, endpoint: "/user-articles" },
  { id: 1, key: "Thesis", value: "Thesis", icon: <SchoolIcon />, endpoint: "/user-thesis" },
  { id: 2, key: "Chapter in a book", value: "Chapter in a book", icon: <BookIcon />, endpoint: "/user-chapter-in-a-book" },
  { id: 3, key: "Conference paper", value: "Conference paper", icon: <AssignmentIcon />, endpoint: "/user-conference-paper" },
  { id: 4, key: "Research project", value: "Research project", icon: <Science />, endpoint: "/user-research-project" },
  { id: 5, key: "Company test report", value: "Company test report", icon: <BusinessCenterIcon />, endpoint: "/user-company-test-report" }
];

const PublicationPage = () => {
  const [publicationsData, setPublicationsData] = useState([]);
  const [data, setData] = useState([]); // This will hold the publication counts
  const [loading, setLoading] = useState(false);
  const [isSizeLoading, setIsSizeLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(publications[0].value);
  const [allPublicationSize, setAllPublicationSize] = useState(0);
  const [selectedSize, setSelectedSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { userId } = useParams();
  const { token } = useUserContext();

  const sizeOptions = [10, 20, 30, 50];

  const fetchPublications = async (type, size, page) => {
    const publication = publications.find(pub => pub.value === type);
    if (!publication) return;

    setLoading(!isSizeLoading); 
    try {
      const response = await axios.get(`${baseUrl}/api/v1/publication${publication.endpoint}`, {
        params: {
          userId,
          page: page - 1,
          size,
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const fetchedPublications = response.data.publications || [];
      setPublicationsData(fetchedPublications);
      setTotalPages(response.data.totalPages || 0);
      setAllPublicationSize(response.data.allPages || 0);
    } catch (error) {
      console.error("Error fetching publications:", error);
      setPublicationsData([]);
    } finally {
      setLoading(false);
      setIsSizeLoading(false); 
    }
  };

  const fetchPublicData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/no-auth/user/${userId}/publication-counts`);
      setData([
        { id: 0, value: response.data.articleCount, label: "Article" },
        { id: 1, value: response.data.thesisCount, label: "Thesis" },
        { id: 2, value: response.data.chapterInABook, label: "Chapter in a book" },
        { id: 3, value: response.data.conferencePaperCount, label: "Conference paper" },
        { id: 4, value: response.data.researchProjectCount, label: "Research project" },
        { id: 5, value: response.data.companyTestReportCount, label: "Company test report" },
      ]);
    } catch (error) {
      console.error("Error fetching publication counts:", error);
    }
  };

  useEffect(() => {
    fetchPublications(selectedType, selectedSize, currentPage);
  }, [selectedType, selectedSize, currentPage]);

  useEffect(() => {
    fetchPublicData();
  }, []);

  const handlePublicationClick = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  function getYearFromDate(dateString) {
    // Tarih stringini kontrol et
    if (typeof dateString !== 'string' || !dateString) {
         return
    }

    // Tarih stringini parçala
    const parts = dateString.split('-');

    // Yıl kısmını döndür
    if (parts.length === 3) {
        return parts[0]; // Yıl kısmı
    } else {
      return;
    }
}

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: '10px' }}>
          <Typography variant="h5" gutterBottom>
            Publications
          </Typography>
          {publications.map((pub) => {
            const pubCount = data.find(d => d.label === pub.key)?.value || 0; // Get count for each publication type
            return (
              <Grid item key={pub.id}>
                <Button
                  variant={selectedType === pub.value ? "contained" : "outlined"}
                  onClick={() => handlePublicationClick(pub.value)}
                  startIcon={pub.icon}
                  fullWidth
                  sx={{
                    marginBottom: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: selectedType === pub.value ? '#0056b3' : '#e0e0e0',
                    },
                  }}
                >
                  {pub.key} ({pubCount})  {/* Display count next to publication type */}
                </Button>
              </Grid>
            );
          })}
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: '10px' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {publicationsData.length > 0 ? (
                <List>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 2 }}>
                    <Select
                      size='small'
                      value={selectedSize}
                      onChange={(e) => {
                        setSelectedSize(e.target.value);
                        setCurrentPage(1);
                        setIsSizeLoading(true); 
                      }}
                      variant="outlined"
                      displayEmpty
                      sx={{ minWidth: 120 }}
                    >
                      {sizeOptions.map((size) => (
                        <MenuItem key={size} value={size}>
                          {size} per page
                        </MenuItem>
                      ))}
                      <MenuItem key={allPublicationSize} value={allPublicationSize}>
                        All ({allPublicationSize})
                      </MenuItem>
                    </Select>
                    {isSizeLoading && <CircularProgress size={24} />} 
                    <Typography>{publicationsData.length}/ {allPublicationSize} publications found.</Typography>
                  </Stack>
                  {publicationsData.map((pub) => (
                    <ListItem
                      key={pub.id}
                      sx={{
                        borderBottom: '1px solid #e0e0e0',
                        '&:last-child': { borderBottom: 'none' },
                        padding: '16px 24px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <ListItemIcon>
                        <Stack alignItems="center" justifyContent="center">
                          {publications.find(p => p.value === pub.type)?.icon || <ArticleIcon />}
                          <Typography>{pub.year || getYearFromDate(pub.date) || pub.completedDate ? getYearFromDate(pub.completedDate): "(continue)"} </Typography>
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
                        secondary={pub.summary || 'No summary available'}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No publications found.</Typography>
              )}
              {publicationsData.length > 0 && totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PublicationPage;
