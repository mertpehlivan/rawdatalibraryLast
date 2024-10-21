import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { deletePublication, getPdfFile, getPublicationEdit, getRawDataFile } from '../services/publicationService';
import { useUserContext } from '../auth/AuthProvider';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Stack, Typography } from '@mui/material';
import PublicationInfo from '../components/publicationEdit/PublicationInfo';
import ResearchersList from '../components/publicationEdit/ResearchersList'
import PDFInfo from '../components/publicationEdit/PdfInfo';
import axios from 'axios';
import RawDataInfo from '../components/publicationEdit/RawDataInfo';
import NewPublicationProvider from '../context/NewPublicationProvider';
import PublicationEdit from '../components/publicationEdit/edit/PublicationEdit';
import ResearchersListEdit from '../components/publicationEdit/edit/ResearchersListEdit';
import RawDataInfoEdit from '../components/publicationEdit/edit/RawDataInfoEdit';
import PDFInfoEdit from '../components/publicationEdit/edit/PDFInfoEdit';
import { ArrowBack, Delete } from '@mui/icons-material';
const baseUrl = process.env.REACT_APP_BASE_URL;
const PublicationEditPage = () => {
  const { publicationId } = useParams(); // Get publicationId from URL parameters
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useUserContext();
  const [edit, setEdit] = useState(null)
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
      setOpenDialog(true);
  };

  const handleClose = () => {
      setOpenDialog(false);
  };
  useEffect(() => {
    console.log("PublicationEditPage", publicationId)
    const fetchPublication = async () => {
      setLoading(true);
      try {
        const response = await getPublicationEdit(token, publicationId); // Await the promise
        console.log(response)
        setData(response);
        setError(null);
      } catch (err) {
        setError('Error fetching publication details.');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [publicationId, token]);

  const handleEdit = (type) => {
    setEdit(type)
  }

  const handleDeletePublication = async () => {
    deletePublication(token, publicationId).then(() => {
      navigate("/")
    }).catch((e) => {
      console.log(e)
    });

  }

  const downloadPdf = async () => {
    setLoading(true);
    setError(null);
    const { id } = data.pdfFileResponse;
    try {
      // Fetch the pre-signed URL for the PDF file

      const pdfFileUrl = await getPdfFile(id)

      if (!pdfFileUrl || pdfFileUrl.startsWith('PDF file not found')) {
        throw new Error('Failed to fetch PDF file URL.');
      }

      // Redirect to the pre-signed URL
      window.location.href = pdfFileUrl;

    } catch (err) {
      setError(`Download failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No publication found.</div>;
  }

  return (


    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 2, mb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Button onClick={() => navigate(-1)} startIcon={<ArrowBack />}>
            Back
          </Button>
          <Button onClick={handleClickOpen} variant='contained' color='error' startIcon={<Delete />}>
            Delete Publication
          </Button>
        </Stack>
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this publication? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeletePublication} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
      {edit == null && <Stack spacing={2}>



        <PublicationInfo
          handleEdit={handleEdit}
          publication={{ data: data.publication }}
          comment={data.publication.comment}
          references={data.publication.references}
          edit={true}
        />
        <ResearchersList
          handleEdit={handleEdit}
          authors={data.authors}
          publication={{ data: data.publication }}
          edit={true}
        />
        <PDFInfo
          handleEdit={handleEdit}
          handleDownload={downloadPdf}
          publication={data}
          edit={true}
        />
        <Paper>
          <Stack p={2}>
            <Typography mb={1} fontWeight="bold" color="primary" variant='h5'>Raw data info</Typography>
            <RawDataInfo handleEdit={handleEdit} folders={data.folders} />
          </Stack>
        </Paper>

      </Stack>}
      {
        edit == "PUBLICATION_EDIT" && <PublicationEdit publication={data.publication} type={data.type} />
      }
      {
        edit == "RESEARCHERS_LIST" && <ResearchersListEdit authors={data.authors} type={data.type} />
      }
      {
        edit == "PDF_INFO" && <PDFInfoEdit pdfDownload={downloadPdf} pdfFileResponse={data.pdfFileResponse} type={data.type} />

      }
      {
        edit == "RAW_DATA_INFO" && <RawDataInfoEdit />
      }

    </Container>

  );
};

export default PublicationEditPage;
