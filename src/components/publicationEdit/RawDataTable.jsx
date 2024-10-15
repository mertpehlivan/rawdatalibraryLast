import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip, Stack, Typography } from '@mui/material';
import PreviewImage from './PreviewImage';
import { useEffect } from 'react';
import { useState } from 'react';
import { getRawDataImage } from '../../services/imageServices';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../auth/AuthProvider';
import { getRawDataFile } from '../../services/publicationService';
import { Download } from '@mui/icons-material';

// Styling for the table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,

    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function RawDataTable({ rawData }) {
    const [imageUrls, setImageUrls] = useState({});
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useUserContext();


    const downloadRawData = async (id) => {
        setLoading(true);
        setError(null);

        try {
            // Fetch the pre-signed URL for the PDF file

            const pdfFileUrl = await getRawDataFile(token, id)

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
    // Fetch image and store it as a blob URL
    const fetchImage = async (id) => {
        try {
            const imageBlob = await getRawDataImage(id);
            const imageObjectUrl = URL.createObjectURL(imageBlob);
            setImageUrls((prev) => ({ ...prev, [id]: imageObjectUrl }));
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    // Fetch images when rawData changes
    useEffect(() => {
        rawData.forEach((data) => {
            if (!imageUrls[data.id]) {
                fetchImage(data.id);
            }
        });

        // Cleanup blob URLs when component unmounts
        return () => {
            Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
        };
    }, [rawData]);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, bgcolor: "primary" }} aria-label="customized table">
                <TableHead>
                    <TableRow>

                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Preview Image</StyledTableCell>
                        <StyledTableCell>Raw Data</StyledTableCell>
                        <StyledTableCell>Comment</StyledTableCell>
                        <StyledTableCell>Price Suggestion</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rawData.map((data, index) => (
                        <StyledTableRow key={data.id}>

                            <StyledTableCell><Typography>{data.name}</Typography></StyledTableCell>
                            <StyledTableCell><PreviewImage imageUrl={imageUrls[data.id]} alt={data.name} /></StyledTableCell>
                            <StyledTableCell><Stack direction="row" alignItems="center" spacing={0.5}><Link onClick={() => downloadRawData(data.id)}>{data.rawDataName.slice(37)}</Link><Download /></Stack></StyledTableCell>
                            <StyledTableCell sx={{ minWidth: 100, maxWidth: 250 }}><Typography variant='body1'>{data.comment}</Typography></StyledTableCell>
                            <StyledTableCell sx={{ minWidth: 30, maxWidth: 100 }}>{data.priceSuggestion}$</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
