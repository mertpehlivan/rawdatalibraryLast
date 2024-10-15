import React, { useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Typography,
    Stack,
} from '@mui/material';
import { useUserContext } from '../../auth/AuthProvider';


const baseUrl = process.env.REACT_APP_BASE_URL;

const BioEditDialog = ({ editDialogOpen, handleEditDialogClose, bio = '', setBio, handleSaveBio }) => {
    const [wordCount, setWordCount] = useState(0);
    const [error, setError] = useState('');
    const textAreaRef = useRef(null);
    const { token } = useUserContext();
    const MAX_WORD_COUNT = 500;

    useEffect(() => {
        const currentBio = bio || '';
        const wordsArray = currentBio.split(/\s+/).filter(word => word);
        setWordCount(wordsArray.length);
    }, [bio]);

    const handleBioChange = (event) => {
        const inputValue = event.target.value;
        const wordsArray = inputValue.split(/\s+/).filter(word => word);

        if (wordsArray.length <= MAX_WORD_COUNT) {
            setBio(inputValue);
            setError(''); // Clear error if within the word limit
        } else {
            setError(`Maximum word limit of ${MAX_WORD_COUNT} reached!`);
        }
        setWordCount(wordsArray.length);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setBio((prevBio) => (prevBio || '') + '\n');
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={editDialogOpen}
            onClose={handleEditDialogClose}
            disableEnforceFocus
        >
            <DialogTitle>Edit Bio</DialogTitle>
            <DialogContent>
                <Stack spacing={2} p={3}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3} // Set the minimum rows
                        value={bio || ''}
                        onChange={handleBioChange}
                        onKeyDown={handleKeyDown}
                        inputRef={textAreaRef}
                        variant="outlined"
                        label="Bio"
                        helperText={`${wordCount}/${MAX_WORD_COUNT} words`}
                        error={Boolean(error)}
                        sx={{
                            '& .MuiInputBase-root': {
                                overflow: 'auto', // Allows scrolling within the text area
                                resize: 'vertical', // Allow vertical resizing
                                minHeight: '100px', // Set a minimum height for better UX
                            },
                        }}
                        FormHelperTextProps={{
                            style: { textAlign: 'right' },
                        }}
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Stack direction="row" justifyContent="flex-end">
                        <Button onClick={handleEditDialogClose} color="secondary" sx={{ marginRight: 1 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveBio} color="primary" variant="contained" disabled={wordCount > MAX_WORD_COUNT}>
                            Save
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default BioEditDialog;
