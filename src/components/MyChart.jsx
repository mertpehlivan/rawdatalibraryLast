import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { Article, Assignment, Book, BusinessCenter, School, Science } from '@mui/icons-material';

const MyChart = () => {
    const [seriesData, setSeriesData] = useState([
        { data: [35, 44, 24, 34, 20, 10] }, // Initial data
    ]);

    const publications = [
        { id: 0, key: "Article", value: "Article", icon: <Article /> },
        { id: 1, key: "Thesis", value: "Thesis", icon: <School /> },
        { id: 2, key: "Chapter in a book", value: "Chapter in a book", icon: <Book /> },
        { id: 3, key: "Conference paper", value: "Conference paper", icon: <Assignment /> },
        { id: 4, key: "Research project", value: "Research project", icon: <Science /> },
        { id: 5, key: "Company test report", value: "Company test report", icon: <BusinessCenter /> }
    ];

    const xAxisData = publications.map(pub => ({
        label: pub.value,
        icon: pub.icon,
    }));

    // Function to generate random data
    const generateRandomData = () => {
        return Array.from({ length: publications.length }, () => Math.floor(Math.random() * 100));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setSeriesData([{ data: generateRandomData() }]);
        }, 1000); // Update every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const labelFormatter = (value) => {
        const pub = xAxisData.find(pub => pub.label === value);
        return (
            <Box display="flex" flexDirection="column" alignItems="center">
                {pub.icon}
                <Typography variant="caption">{pub.label}</Typography>
            </Box>
        );
    };

    return (
        <BarChart
            colors={["#091582"]}
            series={seriesData}
            height={290}
            xAxis={[{ 
                data: xAxisData.map(pub => pub.label), 
                scaleType: 'band',
                labelFormatter: labelFormatter
            }]} 
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
    );
};

export default MyChart;
