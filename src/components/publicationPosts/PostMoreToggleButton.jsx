import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Divider } from '@mui/material';
import { BookmarkOutlined, BookmarksOutlined, MoreVert, PersonOutlined, ReportOutlined, Send } from '@mui/icons-material';
import { useUserContext } from '../../auth/AuthProvider';
import { createCoAuthorRequest } from '../../services/invitationServices';

const PostMoreToggleButton = ({data, userCoAuthorInvitation, publicationId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false); // Dialog state
    const {token} = useUserContext();
    const [loading, setLoading] = useState(false);
    const open = Boolean(anchorEl);
    const handleCoAuthorRequest = async () => {
        setLoading(true); // Butonun bekleme durumunu göstermek için
        try {
            console.log('Confirmed as co-author');
            const response = await createCoAuthorRequest(token, publicationId); // Servis çağrısı
            console.log('Co-author request sent successfully:', response);
            handleDialogClose(); // Dialog'u kapatma
        } catch (error) {
            console.error('Error sending co-author request:', error);
        } finally {
            setLoading(false); // Yükleme durumu sona erdi
        }
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAuthor = () => {
        setOpenDialog(true); // Dialogu aç
        handleClose(); // Menü kapat
    };

    const handleDialogClose = () => {
        setOpenDialog(false); // Dialogu kapat
    };

    const handleReport = () => {
        console.log("Report clicked");
        // Report işlemleri
        handleClose(); // Menü kapat
    };

    const handleSave = () => {
        console.log("Save clicked");
        // Save işlemleri
        handleClose(); // Menü kapat
    };

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: 4.5 * 48,
                            width: '23ch',
                        },
                    },
                }}
            >
                {data.type !== "THESIS" && <MenuItem disabled={userCoAuthorInvitation} key="AUTHOR" onClick={handleAuthor}>
                    <PersonOutlined style={{ marginRight: 8 }} />
                    <Typography>
                        Are you a co-author?
                    </Typography>
                </MenuItem>}

                <MenuItem key="SAVE" onClick={handleSave}>
                    <BookmarksOutlined style={{ marginRight: 8 }} />
                    <Typography>
                        Save
                    </Typography>
                </MenuItem>

                <MenuItem key="REPORT" onClick={handleReport}>
                    <ReportOutlined color='error' style={{ marginRight: 8 }} />
                    <Typography color='error'>
                        Report
                    </Typography>
                </MenuItem>
            </Menu>

            {/* Dialog for "Are you a co-author?" */}
            <Dialog open={openDialog} onClose={handleDialogClose} sx={{ borderRadius: 3 }}>
                <DialogTitle bgcolor="primary.main" color="white">Are you a co-author?</DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText>

                        If you are a co-author of this study and would like to add this study to your profile, please send a request to the corresponding author.

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Send />}
                        onClick={handleCoAuthorRequest} // Buton tıklandığında servisi çağırır
                        color="primary"
                        autoFocus
                        disabled={loading} // Yüklenme sırasında buton devre dışı bırakılır
                    >
                        {loading ? 'Sending...' : 'Send request'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PostMoreToggleButton;
