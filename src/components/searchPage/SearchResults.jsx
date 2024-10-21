import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    ListItemIcon,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';

const SearchResults = ({ searchType, results, imageUrls, fallbackImage }) => {
    return (
        <List sx={{ maxHeight: 440, overflow: 'auto' }}>
            {searchType === "researcher" && (
                results.length > 0 ? (
                    results.map((result) => (
                        <ListItem key={result.id} component={Link} to={`/researcher/${result.id}`}>
                            <ListItemAvatar>
                                <Avatar src={imageUrls[result.id] || fallbackImage} alt={result.name} />
                            </ListItemAvatar>
                            <ListItemText primary={`${result.firstname} ${result.lastname}`} secondary={`ID: ${result.id}`} />
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="No researchers found." />
                    </ListItem>
                )
            )}
            {searchType === "publication" && (
                results.length > 0 ? (
                    results.map((result) => (
                        <ListItem key={result.id} component={Link} to={`/publication/${result.id}`}>
                            <ListItemIcon>
                                <ArticleIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={result.title}
                                secondary={result.summary}
                            />
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="No publications found." />
                    </ListItem>
                )
            )}
            {searchType === "rawData" && (
                results.length > 0 ? (
                    results.map((result) => (
                        <ListItem key={result.id} component={Link} to={`/rawdata/${result.id}`}>
                            <ListItemText primary={result.title} secondary={`ID: ${result.id}`} />
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="No raw data found." />
                    </ListItem>
                )
            )}
        </List>
    );
};

export default SearchResults;
