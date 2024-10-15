import { Paper, Stack, ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../auth/AuthProvider';
const baseUrl = process.env.REACT_APP_BASE_URL
const PieChartBox = ({ publicStatus = false }) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [timePeriod, setTimePeriod] = useState('thisYear');
    const [data, setData] = useState([
        { id: 0, value: 5, label: "Article" },
        { id: 1, value: 105, label: "Thesis" },
        { id: 2, value: 20, label: "Chapter in a book" },
        { id: 3, value: 5, label: "Conference paper" },
        { id: 4, value: 10, label: "Research project" },
        { id: 5, value: 30, label: "Company test report" },
    ])
    const { userId } = useParams();
    const { token } = useUserContext()

    // Define datasets for all time and this year


    const thisYearData = [
        { id: 0, value: 5, label: "Article" },
        { id: 1, value: 105, label: "Thesis" },
        { id: 2, value: 20, label: "Chapter in a book" },
        { id: 3, value: 5, label: "Conference paper" },
        { id: 4, value: 10, label: "Research project" },
        { id: 5, value: 30, label: "Company test report" },
    ];
    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/v1/user/${userId}/publication-counts`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            console.log(response.data)
            setData(response.data); // Assuming the response returns publication counts
            setData([
                { id: 0, value: response.data.articleCount, label: "Article" },
                { id: 1, value: response.data.thesisCount, label: "Thesis" },
                { id: 2, value: response.data.chapterInABook, label: "Chapter in a book" },
                { id: 3, value: response.data.conferencePaperCount, label: "Conference paper" },
                { id: 4, value: response.data.researchProjectCount, label: "Research project" },
                { id: 5, value: response.data.companyTestReportCount, label: "Company test report" },
            ])
        } catch (error) {
            console.error("Error fetching publication counts:", error);
        }
    };
    const fetchPublicData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/v1/no-auth/user/${userId}/publication-counts`);
            console.log(response.data)
            setData(response.data); // Assuming the response returns publication counts
            setData([
                { id: 0, value: response.data.articleCount, label: "Article" },
                { id: 1, value: response.data.thesisCount, label: "Thesis" },
                { id: 2, value: response.data.chapterInABook, label: "Chapter in a book" },
                { id: 3, value: response.data.conferencePaperCount, label: "Conference paper" },
                { id: 4, value: response.data.researchProjectCount, label: "Research project" },
                { id: 5, value: response.data.companyTestReportCount, label: "Company test report" },
            ])
        } catch (error) {
            console.error("Error fetching publication counts:", error);
        }
    };
    useEffect(() => {
        if (!publicStatus) {
            fetchData();
        }else{
            fetchPublicData()
        }
         // Fetch data on component mount
    }, [userId]);

    // Configure pie chart data
    const pieChartData = [
        {
            data: data,
            outerRadius: 100,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            cx: 110,
            label: false, // Hide labels on the pie chart
        },
    ];

    return (
        <Paper sx={{ borderRadius: 3, p: 2 }}>
            <Stack direction="column" >

                <PieChart
                    series={pieChartData}
                    height={200}
                    width={isMobile ? 300 : 400} // Make the chart responsive
                    slotProps={{
                        legend: { hidden: isMobile }, // Hide legend on mobile
                    }}
                />
            </Stack>
        </Paper>
    );
}

export default PieChartBox;
