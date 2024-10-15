import React, { useEffect, useState } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  timelineOppositeContentClasses
} from '@mui/lab';
import { Typography, Paper, Stack, IconButton, CircularProgress, Button } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import { Add, Edit } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { getEducationsByUserId } from '../../services/educatinService';
import { useUserContext } from '../../auth/AuthProvider';
import { Icon } from '@iconify/react/dist/iconify.js';

// Define animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const EducationPage = () => {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const { token, user } = useUserContext()
  // Fetch education data using Axios
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await getEducationsByUserId(userId, token) // Replace with your actual API endpoint
        setEducationData(response);
      } catch (err) {
        setError('Failed to fetch education data');
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, []);

  if (loading) {
    return (
      <Paper sx={{ p: 4, borderRadius: 5, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" color="textSecondary">Loading...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 4, borderRadius: 5, textAlign: 'center' }}>
        <Typography variant="body1" color="error">{error}</Typography>
      </Paper>
    );
  }
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Present";
    }

    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };
  const sliceTre = (string) => {
    return string?.split("-")[1]?.toLowerCase() || "";
  };
  return (
    <Paper sx={{ p: 4, borderRadius: 5 }}>
      <Stack direction="row" justifyContent="space-between" >
        <Stack direction="row" spacing={0.5} color="primary.main" alignItems="center">
          <Icon width={20} height={20} icon="carbon:education" />
          <Typography variant="h5" fontWeight="bold">
            Education
          </Typography>
        </Stack>
        {user?.id == userId && <Link to="/education-edit">
          <Button variant="contained" startIcon={<Add />}>
            Add education
          </Button>
        </Link>}
      </Stack>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.3,
          },
          overflow: 'hidden',
        }}
      >
        {educationData.map((education, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.3 }} // Animated entrance
          >
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary" sx={{ typography: 'body2', lineHeight: 1.5 }}>
                {`${formatDate(education.beginningDate)} - ${formatDate(education.graduationDate)}`}
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot color="primary" sx={{ transform: 'scale(1.2)' }} />
                {index < educationData.length - 1 && <TimelineConnector sx={{ backgroundColor: '#1976d2' }} />}

              </TimelineSeparator>

              <TimelineContent>
                <Typography variant='h5' component="span" sx={{ fontWeight: 600 }} color="primary.main">{education.degree}</Typography>
                <Typography variant="h6" >
                  {`Field of ${education.fieldOfStudy}, Dept. of ${education.department}, Fac. of ${education.faculty}, ${education.institution}`}
                </Typography>
                <Stack direction="row" alignItems="center">
                  <img
                    style={{ marginRight: 6 }}
                    loading="lazy"
                    srcSet={`https://flagcdn.com/w40/${sliceTre(education.country)}.png 2x`}
                    src={`https://flagcdn.com/w20/${sliceTre(education.country)}.png`}
                    alt=""
                  />
                  <Typography variant="body2" color="text.secondary">
                    {education.country}
                  </Typography>
                </Stack>

              </TimelineContent>
            </TimelineItem>
          </motion.div>
        ))}
      </Timeline>
    </Paper>
  );
};

export default EducationPage;
