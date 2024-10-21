import { BarChart } from '@mui/x-charts';
import { Paper, Stack, Typography, useTheme, useMediaQuery, CircularProgress, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllPublicationsByYear } from '../../services/publicationService';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../auth/AuthProvider';

const BarChartBox = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [publicationsByYear, setPublicationsByYear] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useParams();
    const { token } = useUserContext();

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const data = await getAllPublicationsByYear(token, userId);
                setPublicationsByYear(data || {});
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, [userId, token]);

    // Loading spinner
    if (loading) {
        return (
            <Paper sx={{ borderRadius: 3, p: 2, overflowX: 'auto' }}>
                <Stack alignItems="center" justifyContent="center" height={isMobile ? 200 : 300}>
                    <CircularProgress size={60} thickness={4} />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Loading Publications Data...
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    if (error) return <div>Error: {error}</div>;

    // Objeyi diziye dönüştürme
    const publicationsArray = Object.values(publicationsByYear).flat();

    // Yıllara ve türlere göre verileri gruplama
    const years = [...new Set(publicationsArray.map(pub => pub.year))];
    const publicationTypes = [...new Set(publicationsArray.map(pub => pub.type))];

    // Series verisini oluşturma
    const seriesData = publicationTypes.map(type => {
        return {
            data: years.map(year => {
                // Her yıl için o yayının kaç adet olduğunu buluyoruz
                const count = publicationsArray.filter(pub => pub.year === year && pub.type === type).length;
                return count;
            }),
            title: type.replace('_', ' '),  // Yayın türlerini daha okunabilir hale getirme
        };
    });

    function convertEnumToTitle(enumString) {
        // ENUM değerindeki alt çizgileri boşluklarla değiştir
        const words = enumString.toLowerCase().split('_');
        
        // Her kelimenin ilk harfini büyük yap
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return (
        <Paper sx={{ borderRadius: 3, p: 2, overflowX: 'auto' }}>
            <Stack spacing={2}>
                <Typography variant="h6">Publications by Year</Typography>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: years }]} // Yıllar ekseni
                    series={seriesData.map(series => ({
                        data: series.data,  // Her serinin verisi
                        label: convertEnumToTitle(series.title),  // Her serinin başlığı
                    }))}
                    width={isMobile ? 300 : 900}  // Cihaz boyutuna göre genişlik
                    height={isMobile ? 200 : 300}  // Cihaz boyutuna göre yükseklik
                />
            </Stack>
        </Paper>
    );
};

export default BarChartBox;
