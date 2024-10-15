import React, { useState, useEffect } from 'react';
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
  Typography,
  Paper,
  Stack,
  Grid,
  Button,
  InputAdornment,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
import userService, { createTempUser } from '../../services/userService';
import { useUserContext } from '../../auth/AuthProvider';
import { Add, Email, Person, Search } from '@mui/icons-material';
import { useNewPublicationContext } from '../../context/NewPublicationProvider';
import { getProfileImage } from '../../services/imageServices';

const SearchAuthor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token, user } = useUserContext();
  const { addAuthor, authors, updateAuthorRole } = useNewPublicationContext();
  
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  const [imageUrls, setImageUrls] = useState({}); // State to hold image URLs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!isDisabled(user)) {
      addAuthor({ ...user, authorRole: 'RESEARCHER' });
    }
  }, [user, addAuthor]);

  const isDisabled = (author) => {
    return authors.some((tempAuthor) => tempAuthor.id === author.id);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await Promise.all(
        users.map(async (user) => {
          try {
            const imageBlob = await getProfileImage(user.id); // Implement this function to get the profile image
            return { id: user.id, url: URL.createObjectURL(imageBlob) };
          } catch (error) {
            return { id: user.id, url: null }; // Fallback on error
          }
        })
      );
      const newImageUrls = urls.reduce((acc, img) => ({ ...acc, [img.id]: img.url }), {});
      setImageUrls(newImageUrls);
    };

    if (users.length > 0) {
      fetchImages();
    }
  }, [users]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setLoading(true);
      setError('');
      const delayDebounceFn = setTimeout(async () => {
        try {
          const fetchedUsers = await userService.searchUsers(searchTerm, token);
          setUsers(fetchedUsers);
        } catch (err) {
          setError('Failed to fetch users');
        } finally {
          setLoading(false);
        }
      }, 300); // 300ms debounce

      return () => clearTimeout(delayDebounceFn);
    } else {
      setUsers([]);
      setLoading(false);
    }
  }, [searchTerm, token]);

  const handleAddAuthor = (author) => {
    const newAuthor = {
      ...author,
      authorRole: 'RESEARCHER', // Default role
    };
    addAuthor(newAuthor);
    updateAuthorRole(user.id, 'RESEARCHER');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTempUser(token, formValues);
      handleAddAuthor(response);
      setFormValues({ firstname: '', lastname: '', email: '' });
    } catch (error) {
      console.error('Error inviting user:', error);
      alert('Failed to invite user');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', maxWidth: '600px', minHeight: '600px', margin: '0 auto', position: 'relative' }}>
      <Stack minHeight={400}>
        <TextField
          size='small'
          label="Search Researcher"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search..."
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '16px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
              <CircularProgress />
            </div>
          ) : error ? (
            <Typography color="error" align="center" style={{ margin: '16px 0' }}>
              {error}
            </Typography>
          ) : users.length > 0 ? (
            <List>
              {users.map(user => (
                <div key={user.id}>
                  <ListItem>
                    <ListItemAvatar>
                      {imageUrls[user.id] ?  <img
                        src={imageUrls[user.id] || null} // Use the image URL or fallback
                        alt={`${user.firstname} ${user.lastname}`}
                        style={{ width: 40, height: 40, borderRadius: '50%' }} // Adjust the size as needed
                      /> : <Person/>}
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.firstname} ${user.lastname}`}
                      secondary={user.id}
                    />
                    <ListItemButton
                      onClick={() => handleAddAuthor(user)}
                      disabled={isDisabled(user)}
                    >
                      <Add sx={{ marginRight: 1 }} />
                      <ListItemText
                        primary={
                          <Typography color="primary.main" variant="body1" fontWeight="bold">
                            Add Researcher
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            searchTerm.length >= 3 && (
              <Typography align="center" style={{ margin: '16px 0' }}>
                No users found
              </Typography>
            )
          )}
        </div>
        {searchTerm.length === 0 && (
          <Typography align="center" style={{ marginTop: '16px' }}>
            Start typing to search for researchers.
          </Typography>
        )}
      </Stack>
      <Stack border={"1px solid"} borderRadius={3} borderColor="primary.main" p={3}>
        <Typography color="primary.main" variant='h5'><b>Invite Researcher</b></Typography>
        <Typography mb={2}>
          If the author's name and surname could not be found, please invite the researcher.
          Authors can be added after the invitation.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="Firstname"
                name="firstname"
                value={formValues.firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="Lastname"
                name="lastname"
                value={formValues.lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end">
                <Button startIcon={<Email />} variant='contained' type="submit">
                  Invite
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Paper>
  );
};

export default SearchAuthor;
