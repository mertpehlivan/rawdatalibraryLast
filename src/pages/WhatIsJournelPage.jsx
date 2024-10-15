import { Box, Container, Stack, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import Logo from '../assets/logo 1.svg';

const WhatIs = () => {
    return (
        <Container maxWidth="md">
            <Stack bgcolor="background.default" p={4} spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {/* Back Button */}
                    <IconButton href="/" color="primary">
                        <ArrowBackIcon />
                    </IconButton>
                    {/* Logo */}
                    <Box component="img" width={300} src={Logo} />
                    {/* Empty space to balance the layout */}
                    <Box width={48} />
                </Stack>

                <Typography variant='h6'  fontFamily="Times New Roman,sans-serif" gutterBottom>
                    By publishing articles in scientific journals, researchers, authors, and students choose suitable journals for their articles as a requirement for academic advancement, sharing new findings with the scientific community, and sometimes even for graduating from higher education.

                    This process contributes to the publication of a quality publication, especially thanks to the quality referee comments and necessary revisions received during the review process of the articles.

                    However, the fact that publications usually have a page limit at the printing stage creates the problem of presenting all data only by tabulating with summarized data and makes it difficult for another researcher to use the raw data of the relevant study.

                    The graphs presented in the publications are processed data, and it is very difficult to obtain the raw data to be used for further studies. RDL presents the raw data for that processed data given in articles. In addition, RDL particularly provides data that are mentioned but not given in such publications.

                    At this point, the Raw Data Library has an important place in terms of sharing researchers' data and bringing income to researchers.
                </Typography>

                <Typography variant='h6' color="primary.main" fontFamily="Times New Roman,sans-serif" fontWeight="bold" >
                    Journal Rights
                </Typography>
                <Typography variant='h6'  fontFamily="Times New Roman,sans-serif" gutterBottom>
                    Journal rights are seriously protected by RDL. For this reason, it is forbidden to share the full texts of articles published in journals.

                    One of the main goals of RDL is the sharing of other data mentioned but not presented in the articles.
                </Typography>
                <Typography fontWeight="bold" variant='h6' color="primary.main" fontFamily="Times New Roman,sans-serif" >
                Mentioned but not Presented Data in Articles
                </Typography>
                <Typography variant='h6'  fontFamily="Times New Roman,sans-serif">
                    It is necessary to refer to the relevant article and the raw data library within the scope of the study in that journal, a citation to the paper published in that journal must be made by other researchers.

                    If a journal publishes the relevant raw data, model files, etc., on its own page, it is forbidden to share them on the RDL platform.
                </Typography>

                <Typography variant='h6' color="primary.main" fontFamily="Times New Roman,sans-serif" gutterBottom>
                    Raw Data Library
                </Typography>
            </Stack>
        </Container>
    );
};

export default WhatIs;
