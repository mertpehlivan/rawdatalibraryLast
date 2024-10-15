import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, useMediaQuery, useTheme, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useUserContext } from '../../auth/AuthProvider';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'header',
    headerName: 'Publication Name',
    flex: 1, // Responsive column
    minWidth: 150,
  },
  {
    field: 'type',
    headerName: 'Publication Type',
    width: 150,
  },
];

// Function to format enum values
const formatEnumValue = (enumValue) => {
  const strValue = String(enumValue);
  return (strValue.charAt(0).toUpperCase() + strValue.slice(1).toLowerCase()).replace(/_/g, ' ');
};

export default function PublicationTable({publicStatus= false}) {
  const [rows, setRows] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false); // Loading state
  const { token } = useUserContext();
  const { userId } = useParams(); // Fetch userId from the URL params
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screens
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Fetch publications from API
  const fetchPublications = async (page = 0) => {
    setLoading(true); // Start loading
    try {
        let response; // Declare response variable outside of condition

        // Set the URL based on publicStatus
        const url = publicStatus
            ? `${process.env.REACT_APP_BASE_URL}/api/v1/no-auth/publication/${userId}/publications`
            : `${process.env.REACT_APP_BASE_URL}/api/v1/publication/${userId}/publications`;

        // Set the config for the request
        const config = {
            params: { page, size: 10 },
        };

        // If not public, add Authorization header
        if (!publicStatus) {
            config.headers = { 'Authorization': `Bearer ${token}` };
        }

        // Make the request
        response = await axios.get(url, config);

        // Map the fetched data to the desired format
        const fetchedRows = response.data.profilePagePublicationResponses.map(item => ({
            id: item.id,
            header: item.header,
            type: formatEnumValue(item.type),
        }));

        // Update state with fetched data
        setRows(fetchedRows);
        setTotalPage(response.data.totalPage);
    } catch (error) {
        console.error('Error fetching publications:', error);
    } finally {
        setLoading(false); // Stop loading
    }
};

  React.useEffect(() => {
    fetchPublications(currentPage);
  }, [token, userId, currentPage]);

  // Handle row click
  const handleRowClick = (params) => {
    const publicationId = params.row.id; // Get the clicked row's ID
    navigate(`/publication/${publicationId}`); // Redirect to the desired link
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, p: 0.5, overflow: 'hidden' }}>
      {loading ? ( // Display loading spinner
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          paginationMode="server"
          rowCount={totalPage}
          pageSize={10}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: currentPage,
              },
            },
          }}
          onPaginationModelChange={(model) => {
            setCurrentPage(model.page);
            fetchPublications(model.page);
          }}
          onRowClick={handleRowClick} // Add onRowClick prop
          autoHeight
          sx={{
            borderRadius: 2,
            border: 'none',
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
            },
            '& .MuiDataGrid-cell': {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              padding: isSmallScreen ? '10px' : '14px',
              fontSize: '0.9rem',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.grey[200],
            },
            '& .MuiDataGrid-row': {
              transition: 'background-color 0.2s',
            },
          }}
        />
      )}
    </Paper>
  );
}
