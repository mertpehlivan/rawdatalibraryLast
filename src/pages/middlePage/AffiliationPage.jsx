import React, { useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { IconButton, Paper, Stack, Typography, CircularProgress, Button } from '@mui/material';
import { TimelineOppositeContent, timelineOppositeContentClasses } from '@mui/lab';
import { Edit, Add } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { getAffiliationsByUserId } from '../../services/affiliationServices';
import { useUserContext } from '../../auth/AuthProvider';
import { motion } from "framer-motion";
import { Icon } from '@iconify/react/dist/iconify.js';

export default function AffiliationPage() {
    const { userId } = useParams();
    const [affiliations, setAffiliations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, user } = useUserContext();

    const formatDate = (dateString) => {
        if (!dateString) {
            return "Present";
        }

        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        const fetchAffiliations = async () => {
            try {
                setLoading(true);
                const response = await getAffiliationsByUserId(userId, token);
                setAffiliations(response);
            } catch (error) {
                console.error("Error fetching affiliations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAffiliations();
    }, [userId, token]);

    if (loading) {
        return (
            <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 6, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                <CircularProgress />
            </Paper>
        );
    }

    const sliceTre = (string) => {
        return string?.split("-")[1]?.toLowerCase() || "";
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 6, backgroundColor: '#fff', overflow: 'hidden' }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                <Stack direction="row" spacing={0.5} color="primary.main" alignItems="center">
                    <Icon width={20} height={20} icon="ph:building" />
                    <Typography letterSpacing={1} variant="h5" fontWeight="bold">
                        Affiliation
                    </Typography>
                </Stack>
                {user?.id === userId && (
                    <Link to='/affiliation-edit'>
                        <Button variant='contained' startIcon={<Add fontSize="medium" />} color="primary">
                            Add affiliation
                        </Button>
                    </Link>
                )}
            </Stack>

            <Timeline
                sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.3,
                    },
                    overflow: 'hidden',
                }}
            >
                {affiliations.map((affiliation, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.3 }} // Animated entrance
                    >
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary" sx={{ typography: 'body2', lineHeight: 1.5 }}>
                                {`${formatDate(affiliation.startDate)} - ${formatDate(affiliation.endDate)}`}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" sx={{ transform: 'scale(1.2)' }} />
                                {index < affiliations.length - 1 && <TimelineConnector sx={{ backgroundColor: '#1976d2' }} />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant='h5' component="span" sx={{ fontWeight: 600 }} color="primary">{affiliation.institution}</Typography>
                                <Typography variant="h6">
                                    {`Fac. of ${affiliation.faculty}, Dept. of ${affiliation.department}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {affiliation.position}/ {affiliation.academicDegree}
                                </Typography>
                                <Stack direction="row" alignItems="center">
                                    <img
                                        style={{ marginRight: 6 }}
                                        loading="lazy"
                                        srcSet={`https://flagcdn.com/w40/${sliceTre(affiliation.country)}.png 2x`}
                                        src={`https://flagcdn.com/w20/${sliceTre(affiliation.country)}.png`}
                                        alt=""
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        {affiliation.country}
                                    </Typography>
                                </Stack>

                            </TimelineContent>
                        </TimelineItem>
                    </motion.div>
                ))}
            </Timeline>
        </Paper>
    );
}
