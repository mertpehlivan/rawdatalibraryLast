import React from 'react';
import { Paper, Stack, Typography, List, ListItem, ListItemAvatar, ListItemText, IconButton } from '@mui/material';
import { Edit, Person } from '@mui/icons-material';

const ResearchersList = ({ authors, publication, setStep, edit = false,handleEdit }) => {
    const normalizeText = (text) =>
        text
            ? text
                .toLowerCase()
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            : '';

    return (
        <Paper>
            <Stack spacing={2} sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5" color="primary.main"><b>Researchers List</b></Typography>
                    <IconButton onClick={edit ? ()=>{handleEdit("RESEARCHERS_LIST")} : () => setStep(2)}>
                        <Edit />
                    </IconButton>
                </Stack>
                <List>
                    {authors.map((author, index) => (
                        <React.Fragment key={index}>
                            {publication.type === "Research project" && <Typography><b>{author.authorRole}:</b></Typography>}
                            <ListItem style={{ backgroundColor: '#f9f9f9', borderRadius: 8 }}>
                                <ListItemAvatar>
                                    <Person />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${author.firstname} ${author.lastname}`}
                                    secondary={`ID: ${author.id}`}
                                />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Stack>
        </Paper>
    );
};

export default ResearchersList;
