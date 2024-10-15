import { Box, Container, IconButton, Paper, Skeleton, Stack, Typography, makeStyles } from '@mui/material'
import Photo from '../assets/9.png'
import Incentive from '../assets/incentive.png'
import React, { useState } from 'react'
import { ArrowBack, Toys } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo 1.svg';

const AboutUs = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL

  return (
    <Container  maxWidth="md">
      <Paper sx={{px:2}}>
        <Stack sx={{pt:4,px:2}} direction="row" alignItems="center" justifyContent="space-between">
          {/* Back Button */}
          <IconButton href="/" color="primary">
            <ArrowBack />
          </IconButton>
          {/* Logo */}
          <Box component="img" width={300} src={Logo} />
          {/* Empty space to balance the layout */}
          <Box width={48} />
        </Stack>
        <Stack spacing={2} padding={3}>

          <Typography variant='h6' fontFamily="Times New Roman,sans-serif">
            In the development of technological innovations and scientific models, extensive analytical and experimental research is essential,
            typically supported by scientific project grants. However, in many theses, articles, and reports, raw data and models are often only
            presented in graphical form, with the actual underlying data rarely made available. This limitation underscores the need for an international
            platform where researchers can share raw data and numerical models from their experimental and analytical work,
            enhancing accessibility and accelerating scientific progress worldwide.
          </Typography>
          <Typography variant='h6' fontFamily="Times New Roman,sans-serif">
            To address this need, the <b>Raw Data Library</b> platform was created as a global repository, enabling researchers from various
            scientific fields to upload and share raw data and models with the broader academic community. This includes any form of raw data
            (also known as primary, source, or unprocessed data), covering everything from laboratory and field experiments to survey results and questionnaires. By facilitating access to such data,
            the platform allows researchers to build upon the work of others, transforming isolated studies into collaborative advancements.
            Furthermore, the platform provides universities and research institutions with a tool to optimize their research efforts.
            By accessing previously collected raw data, institutions can reduce the number of experimental samples needed, streamline research processes,
            and cut down on overall project timelines, leading to substantial cost savings. In doing so, the platform helps mitigate redundant research efforts, promoting efficiency and cost-effectiveness in scientific investigations.
          </Typography>
          <Typography variant='h6' fontFamily="Times New Roman,sans-serif">
            In addition to fostering collaboration, the platform offers financial incentives. Researchers, institutions, and companies can monetize their raw data through a sales model, retaining 70% of the revenue from each sale while allocating 30% to the platform. This sustainable model rewards researchers for sharing their data, while also advancing the principles of open science.
          </Typography>
          <Typography variant='h6' fontFamily="Times New Roman,sans-serif">
            The <b>Raw Data Library</b> not only enhances individual research but also drives global scientific progress. By cultivating an environment of open data sharing, the platform plays a critical role in accelerating scientific advancements and benefiting humanity.
          </Typography>
        </Stack>
      </Paper>


    </Container>
  );
}

export default AboutUs