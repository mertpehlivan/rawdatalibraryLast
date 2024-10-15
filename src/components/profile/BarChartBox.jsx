import { BarChart } from '@mui/x-charts';
import { Paper, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';

// Sample publication data categorized by year
const publicationsByYear = {
    2021: [
        { id: 1, title: "Research project", count: 2 },
        { id: 2, title: "Conference paper", count: 4 },
    ],
    2022: [
        { id: 3, title: "Article", count: 5 },
        { id: 4, title: "Thesis", count: 1 },
        { id: 5, title: "Chapter in a book", count: 3 },
    ],
    2023: [
        { id: 6, title: "Article", count: 4 },
        { id: 7, title: "Thesis", count: 3 },
        { id: 8, title: "Conference paper", count: 2 },
    ],
    2024: [
        { id: 9, title: "Chapter in a book", count: 5 },
        { id: 10, title: "Conference paper", count: 1 },
        { id: 11, title: "Research project", count: 6 },
        { id: 12, title: "Company test report", count: 4 },
    ],
    2025: [
        { id: 13, title: "Company test report", count: 2 },
        { id: 14, title: "Research project", count: 3 },
        { id: 15, title: "Thesis", count: 5 },
    ],
    2026: [
        { id: 16, title: "Article", count: 6 },
        { id: 17, title: "Research project", count: 4 },
        { id: 18, title: "Conference paper", count: 2 },
        { id: 19, title: "Chapter in a book", count: 3 },
    ],
    2027: [
        { id: 20, title: "Thesis", count: 1 },
        { id: 21, title: "Article", count: 7 },
        { id: 22, title: "Conference paper", count: 5 },
        { id: 23, title: "Company test report", count: 2 },
    ],
    2028: [
        { id: 16, title: "Article", count: 6 },
        { id: 17, title: "Research project", count: 4 },
        { id: 18, title: "Conference paper", count: 2 },
        { id: 19, title: "Chapter in a book", count: 3 },
    ],
    2029: [
        { id: 20, title: "Thesis", count: 1 },
        { id: 21, title: "Article", count: 7 },
        { id: 22, title: "Conference paper", count: 5 },
        { id: 23, title: "Company test report", count: 2 },
    ],
};

const BarChartBox = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Mobil ekran kontrolü

    // Prepare data for the BarChart
    const years = Object.keys(publicationsByYear);
    const publicationTypes = [...new Set(Object.values(publicationsByYear).flat().map(pub => pub.title))]; // Get unique publication titles

    // Prepare series data for each publication type
    const seriesData = publicationTypes.map(title => ({
        title, // Publication type
        data: years.map(year => {
            const yearPublications = publicationsByYear[year];
            const pub = yearPublications.find(pub => pub.title === title);
            return pub ? pub.count : 0; // If the publication exists, return the count, otherwise return 0
        }),
    }));

    // Custom tooltip function
    const tooltipRenderer = (data) => {
        const yearIndex = data[0].dataIndex;
        const publicationType = seriesData[data[0].seriesIndex].title; // Get the publication type
        const count = seriesData[data[0].seriesIndex].data[yearIndex]; // Get the count for that year
        
        return `${publicationType}: ${count} publications in ${years[yearIndex]}`;
    };

    return (
        <Paper sx={{ borderRadius: 3, p: 2, overflowX: 'auto' }}> {/* Kaydırma için overflowX: 'auto' ekledik */}
            <Stack spacing={2}>
                <Typography variant="h6">Publications by Year</Typography>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: years }]}
                    series={seriesData.map(series => ({
                        data: series.data,
                        title: series.title,
                        tooltip: { render: tooltipRenderer }, // Attach the tooltip
                    }))}
                    width={isMobile ? 300 : 900}  // Mobil cihazda daha küçük bir genişlik kullanılır
                    height={isMobile ? 200 : 300}  // Mobilde daha küçük yükseklik ayarlaması
                />
            </Stack>
        </Paper>
    );
}

export default BarChartBox;
