import { ArrowDownward, ArrowUpward, Delete, Person } from '@mui/icons-material';
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNewPublicationContext } from '../../context/NewPublicationProvider';
import { useUserContext } from '../../auth/AuthProvider';
import { getProfileImage } from '../../services/imageServices'; // Import your image fetching service

const fallbackImage = 'path_to_fallback_image'; // Replace with your fallback image path

const ListAuthor = () => {
  const { authors, setAuthors, removeAuthor, moveUpAuthor, moveDownAuthor, publication } = useNewPublicationContext();
  const { user } = useUserContext();
  
  const [imageUrls, setImageUrls] = useState({}); // Store image URLs by author ID

  // Fetch profile images only when authors change
  useEffect(() => {
    const fetchImages = async () => {
      const urls = await Promise.all(
        authors.map(async (author) => {
          try {
            const imageBlob = await getProfileImage(author.id);
            return { id: author.id, url: URL.createObjectURL(imageBlob) };
          } catch (error) {
            return { id: author.id, url: fallbackImage }; // Fallback on error
          }
        })
      );
      const newImageUrls = urls.reduce((acc, img) => ({ ...acc, [img.id]: img.url }), {});
      setImageUrls(newImageUrls);
    };

    fetchImages();
  }, [authors]);

  const handleRoleChange = (id, newRole) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author) =>
        author.id === id ? { ...author, authorRole: newRole } : author
      )
    );
  };

  return (
    <Stack spacing={3} style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>Researcher List</Typography>
      <List>
        {authors.length > 0 ? (
          authors.map((author, index) => (
            <React.Fragment key={index}>
              <ListItem
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => moveUpAuthor(index)} disabled={index === 0}>
                      <ArrowUpward />
                    </IconButton>
                    <IconButton onClick={() => moveDownAuthor(index)} disabled={index === authors.length - 1}>
                      <ArrowDownward />
                    </IconButton>
                    <IconButton onClick={() => removeAuthor(index)}>
                      <Delete />
                    </IconButton>
                  </Stack>
                }
                style={{ backgroundColor: '#f9f9f9', borderRadius: 8 }}
              >
                <ListItemAvatar>
                  <Avatar src={imageUrls[author.id] || fallbackImage} alt={author.firstname} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${author.firstname} ${author.lastname}`}
                  secondary={`ID: ${author.id}`}
                />
              </ListItem>

              {publication.type === "Research project" && (
                <ListItem>
                  <Select
                    fullWidth
                    size="small"
                    value={author.authorRole}
                    onChange={(e) => handleRoleChange(author.id, e.target.value)}
                  >
                    <MenuItem value="ADVISOR">Advisor</MenuItem>
                    <MenuItem value="PROJECT_MANAGER">Project Manager</MenuItem>
                    <MenuItem value="RESEARCHER">Researcher</MenuItem>
                    <MenuItem value="STUDENT">Student</MenuItem>
                  </Select>
                </ListItem>
              )}
              <Divider variant="middle" style={{ margin: '10px 0' }} />
            </React.Fragment>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No authors available" />
          </ListItem>
        )}
      </List>
    </Stack>
  );
};

export default ListAuthor;
