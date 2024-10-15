import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Skeleton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import PublonsIcon from '../../assets/publons.png';
import OrcidIcon from '../../assets/orcid.png';
import GoogleScholarIcon from '../../assets/googleSchooler.png';
import SchopusIcon from '../../assets/schopus.png';
import PubMedIcon from '../../assets/pubmed.png';
import { useUserContext } from '../../auth/AuthProvider';
import { Link, useParams } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import { Add, Edit } from '@mui/icons-material';

const baseUrl = process.env.REACT_APP_BASE_URL;

const predefinedLinks = [
  {
    enum: "PUBLONS",
    label: 'Publons - Web of Science Researcher Link',
    url: 'https://publons.com',
    icon: PublonsIcon,
  },
  {
    enum: "ORCID",
    label: 'ORCID Link',
    url: 'https://orcid.org',
    icon: OrcidIcon,
  },
  {
    enum: "GOOGLE_SCHOLAR",
    label: 'Google Scholar ID Link',
    url: 'https://scholar.google.com',
    icon: GoogleScholarIcon,
  },
  {
    enum: "SCOPUS",
    label: 'Scopus Link',
    url: 'https://www.scopus.com',
    icon: SchopusIcon,
  },
  {
    enum: "PUBMED",
    label: 'PubMed Researcher Link',
    url: 'https://pubmed.ncbi.nlm.nih.gov',
    icon: PubMedIcon,
  },
  {
    enum: "UNIVERSITY_RESEARCH_TOOL",
    label: 'University Research Tool',
    url: 'https://xxxxx.edu.tr',
    icon: null
  },
];
const ResearcherContact = ({publicStatus = false}) => {
  const [open, setOpen] = useState(false);
  const [openListDialog, setOpenListDialog] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [linksData, setLinksData] = useState([]);
  const [editLink, setEditLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, user } = useUserContext();
  const { userId } = useParams();

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/v1/links/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response.data)
        setLinksData(response.data);
      } catch (error) {
        console.error("Error fetching links", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchPublicLinks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/v1/no-auth/links/user/${userId}`);
        console.log(response.data)
        setLinksData(response.data);
      } catch (error) {
        console.error("Error fetching links", error);
      } finally {
        setLoading(false);
      }
    };
    if (!publicStatus) {
      fetchLinks();
    }else{
      fetchPublicLinks()
    }
    
  }, [userId, token]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenListDialog = () => {
    setOpenListDialog(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLabel('');
    setNewUrl('');
    setEditLink(null);
  };

  const handleCloseListDialog = () => {
    setOpenListDialog(false);
  };

  const handleEditLink = (link) => {
    setEditLink(link);
    setSelectedLabel(link.linkType);
    setNewUrl(link.url);
    handleClickOpen();
  };

  const handleDeleteLink = async (editLink) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/links/${editLink.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setLinksData(linksData.filter(link => link.id !== editLink.id));
      handleClose();
    } catch (error) {
      console.error("Error deleting link", error);
    }
  };

  const handleAddOrUpdateLink = () => {
    const selectedLink = predefinedLinks.find(link => link.enum === selectedLabel);
    if (selectedLink) {
      const linkRequest = {
        url: newUrl || selectedLink.url,
        linkType: selectedLink.enum,
      };

      axios.post(`${baseUrl}/api/v1/links/createOrUpdate`, linkRequest, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
          setLinksData(response.data);
          handleClose();
        })
        .catch(error => {
          console.error("Error updating link", error);
        });
    }
  };

  // Extract existing link types
  const existingLinkTypes = new Set(linksData.map(link => link.linkType));

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography color="primary" variant="h6">Researcher Links</Typography>
        {!publicStatus && (user.id == userId && <Box>
          <Button startIcon={<Add />} edge="end" aria-label="edit" onClick={handleClickOpen}>
            Add Link
          </Button>
          <Button startIcon={<Edit />} onClick={handleOpenListDialog} color="primary">
            Edit Links
          </Button>
        </Box>)}
      </Box>

      <List>
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <ListItem key={index}>
                <Skeleton variant="rectangular" width="100%" height={20} />
              </ListItem>
            ))}
          </>
        ) : linksData.length > 0 ? (
          linksData.map((link, index) => (
            <ListItem
              key={index}
              sx={{ backgroundColor: '#f5f5f5', cursor: 'pointer', borderRadius: 3, mb: 0.5 }}
            >
              <ListItemIcon>
                {predefinedLinks.find(pre => pre.enum === link.linkType && link.type != "UNIVERSITY_RESEARCH_TOOL") ?
                  <img style={{ width: 24, height: 24, marginRight: 8 }} src={predefinedLinks.find(pre => pre.enum === link.linkType && link.type != "UNIVERSITY_RESEARCH_TOOL")?.icon} alt="" />
                  : <LanguageIcon />}
              </ListItemIcon>
              <Link target='_blank' to={link.url}><ListItemText primary={link.label} secondary={link.url?.slice(0,60)+"..."} /></Link>

            </ListItem>
          ))
        ) : (
          <Typography variant="body2" sx={{ p: 2 }}>No links added yet.</Typography>
        )}
      </List>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>{editLink ? 'Edit Link' : 'Add New Link'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <Select
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Select link label' }}
            >
              <MenuItem value="" disabled>Select Link Label</MenuItem>
              {predefinedLinks.map((link, index) => (
                <MenuItem key={index} value={link.enum} disabled={existingLinkTypes.has(link.enum)}>
                  <Box display="flex" alignItems="center">
                    {link.icon == null ? <LanguageIcon /> : <img src={link.icon} alt={link.label} style={{ width: 24, height: 24, marginRight: 8 }} />}
                    {link.label.slice(0, 100)}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Link URL (optional)"
            type="url"
            fullWidth
            variant="outlined"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            inputProps={{ maxLength: 255 }} // Limit to 255 characters
          />
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginTop: 8 }} // Add some space above the count
          >
            {newUrl.length} / 255
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button onClick={handleAddOrUpdateLink}>{editLink ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      {/* New Dialog for Viewing Links */}
      <Dialog fullWidth open={openListDialog} onClose={handleCloseListDialog}>
        <DialogTitle>Edit Researcher Links</DialogTitle>
        <DialogContent>
          <List>
            {loading ? (
              <ListItem>
                <Skeleton variant="rectangular" width="100%" height={20} />
              </ListItem>
            ) : linksData.length > 0 ? (
              linksData.map((link, index) => {
                // Use find to get the link object
                
                return (
                  <ListItem
                    key={index}
                    sx={{ backgroundColor: '#f5f5f5', cursor: 'pointer', borderRadius: 3, mb: 0.5 }}
                  >
                    <ListItemIcon>
                      {
                        predefinedLinks.find(pre => pre.enum === link.linkType && link.type != "UNIVERSITY_RESEARCH_TOOL") ?
                          <img style={{ width: 24, height: 24, marginRight: 8 }} src={predefinedLinks.find(pre => pre.enum === link.linkType && link.type != "UNIVERSITY_RESEARCH_TOOL")?.icon} alt="" />
                          : <LanguageIcon />
                      }
                    </ListItemIcon>
                    <ListItemText primary={link.label} secondary={link.url} />
                    <IconButton edge="end" onClick={() => handleEditLink(link)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteLink(link)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItem>
                );
              })
            ) : (
              <Typography variant="body2" sx={{ p: 2 }}>No links available.</Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseListDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ResearcherContact;
