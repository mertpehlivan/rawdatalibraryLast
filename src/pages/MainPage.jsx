import { useTheme, keyframes } from '@emotion/react';
import { Box, Button, ButtonGroup, Container, Grid, Stack, Typography, useMediaQuery, Fade, Slide, CircularProgress, Paper, Zoom, Divider, Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import Disc from '../assets/disc.gif'
import Usablity from '../assets/Usability testing.gif'
import Aricle from '../assets/Online article.gif'
import Paid from '../assets/Paid idea.gif'
import Bussine from '../assets/Business support.gif'
import { ArrowLeft, ArrowRight, Chat, Check, Circle, FiberManualRecord, ForkLeft, ForkRight, QuestionMark } from '@mui/icons-material';
import UploadImage from '../assets/Image upload-rafiki.svg'
import ImageOne from '../assets/1.gif'
import ImageTwo from '../assets/2.gif'
import ImageThree from '../assets/4.gif'
import ImageFour from '../assets/3.gif'
import ImageFive from '../assets/5.gif'
import ImageSix from '../assets/6.gif'
import ImageSeven from '../assets/7.gif'
import ImageEight from '../assets/8.gif'
import ImageNine from '../assets/9.gif'
import ImageTen from '../assets/10.gif'
import Footer from '../components/Footer';
import MainImage from '../assets/end2.svg'
import NoAuthBar from '../components/NoAuthBar'
import axios from 'axios';
import Conferences1 from '../assets/Civil Engineering Congress 2025_Call for Abstracts_1350x420.jpg'
import Conferences2 from '../assets/Civil Engineering Congress 2025_Home Banner1350x420 (1).jpg'
import Razaqpur from '../assets/GhaniRazaqpur.jpg'
import Alemdar from '../assets/Alemdar-Bayraktar.png'
import LanguageIcon from '@mui/icons-material/Language';
import BarChartIcon from '@mui/icons-material/BarChart';
import CharlesImage from '../assets/charles.jpg'
import HamidImage from '../assets/hamid.jpg'
import JiHuanImage from '../assets/jihuan.jpg'
import TimothyImage from '../assets/timothy.jpg'
import MyChart from '../components/MyChart'
import MainPagePost from '../components/publicationPosts/MainPagePost';
const baseUrl = process.env.REACT_APP_BASE_URL;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const feedbacks = [
  {
    name: "Prof. Dr. A. Ghani Razaqpur",
    degree: "McMaster University",
    comment: "Having raw data of previous studies and comparisions of them with new studies is the one of the key to increase the chance of publications.",
    image: Razaqpur,
  },
  {
    name: "Prof. Dr. Alemdar Bayraktar",
    degree: "University of British Columbia",
    comment: "The Raw Data Library offers the opportunity to significantly advance science and benefit humanity by promoting a world where information is both shared and accessible.",
    image: Alemdar,
  },

  // Add more feedbacks as needed
];
const MainPage = () => {
  // const [videoLoaded, setVideoLoaded] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState(0)


  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
      </Stack>
    );
  }
  return (
    <Stack spacing={2}>
      <Stack spacing={3} sx={{ animation: `${fadeIn} 2s ease-in-out` }}>
        {process.env.PUBLIC_URL.toString()}
        <Container maxWidth>
          <div id="back-to-top-anchor" />
          <Grid container sx={{ mt: 3 }} alignItems="center" mb={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item md={5} sm={12}>
                  <Stack
                    mt={isSmallScreen ? 0 : 15}
                    height={isSmallScreen ? "50vh" : "20vh"}
                    mb={2}
                    spacing={3}
                    sx={{
                      justifyContent: isSmallScreen ? 'center' : 'flex-start',
                      alignItems: isSmallScreen ? 'center' : 'flex-start',
                    }}
                  >
                    <Box
                      component="img"
                      src={Logo}
                      mt={isSmallScreen ? 5 : 0}
                      width={isSmallScreen ? 300 : 400}
                      sx={{ animation: `${fadeIn} 2s ease-in-out` }}
                    />
                    <Typography
                      fontFamily="Times New Roman, sans-serif"
                      variant={isSmallScreen ? 'h5' : 'h4'}
                      sx={{ textAlign: isSmallScreen ? 'center' : 'left' }}
                    >
                      THE NEW FACE OF THE ACADEMY
                    </Typography>

                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        maxWidth: 600,
                        mx: isSmallScreen ? 'auto' : 0,
                      }}
                    >
                      <Typography
                        fontFamily="Times New Roman, sans-serif"
                        variant="h4"
                        color="primary.main"
                        mb={2}
                        sx={{ textAlign: 'center' }}
                      >
                        Turn Your Data Into Income
                      </Typography>
                      <Typography
                        fontFamily="Times New Roman, sans-serif"
                        variant="h5"
                        color="text.secondary"
                        mb={4}
                        sx={{ textAlign: 'center' }}
                      >
                        Researchers who upload their raw data can generate income by selling or sharing it with peers and institutions globally.
                      </Typography>
                      <Button
                        size="large"
                        href="/signup"
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                        }}
                      >
                        Monetize Your Research Data
                      </Button>
                    </Paper>
                  </Stack>
                </Grid>

                {!isSmallScreen && (
                  <Grid item md={7} sm={12}>
                    <MainPagePost />
                  </Grid>
                )}
              </Grid>

              <Grid
                container
                spacing={2}
                mt={4}
                justifyContent={!isSmallScreen ? 'center' : 'flex-start'}
                alignItems={!isSmallScreen ? 'center' : 'flex-start'}
                sx={{
                  maxWidth: 600,
                  mx: isSmallScreen ? 'auto' : 0,
                }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    backgroundColor: 'background.paper',
                  }}
                >
                  {/* Additional content can go here */}
                </Grid>

                {!isSmallScreen && (
                  <Grid
                    item
                    md={2}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: 'grey.100',
                    }}
                  >
                    {/* Additional sidebar content */}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Stack>

      <Stack width="100%">

        <Container>

          <Paper>
            <Stack width="100%">
              <Grid container spacing={2} p={3}>
                <Grid item md={3} sm={12} >
                  <img src={Disc} width={240} />
                  <Typography color="primary" variant='h5' mb={2}> <b>Presentation and Discussion of Multiple Outputs</b></Typography>
                  <Typography variant='h6'>
                    More than one output is obtained from an academic study. In published articles, generally some of them can be presented and discussed. In some of the related publications, outputs are only mentioned, but no data are presented.
                  </Typography>
                </Grid>
                <Grid item md={3} sm={12}>
                  <img src={Usablity} width={240} />
                  <Typography color="primary" variant='h5' mb={2}><b>Presentation and Reusability of Data</b></Typography>
                  <Typography variant='h6'>

                    In the published articles, the data are presented as a summarized table or graphically. This makes it difficult to reuse the data by other researchers.
                  </Typography>
                </Grid>
                <Grid item md={3} sm={12} >
                  <img src={Aricle} width={240} />
                  <Typography color="primary" variant='h5' mb={2}> <b>Page Limitations and Presentation of Outputs</b></Typography>
                  <Typography variant='h6' >

                    Many of the outputs mentioned in the relevant articles (for example: graphical representations) cannot be presented due to the page limit. It may not be possible to present survey data or provide graphs of all the results.
                  </Typography>
                </Grid>
                <Grid item md={3} sm={12}>
                  <img src={Paid} width={240} />
                  <Typography color="primary" variant='h5' mb={2}> <b>Establishment Purpose of RDL Platform</b></Typography>
                  <Typography variant='h6'>
                    RDL platform was established to ensure that the data in the studies can be easily discovered and accessed and to offer academic incentives to researchers.
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Container>
      </Stack>
      <Stack>
        <Container>
          <Stack>
            <Paper >
              <Stack direction="row" p={3} spacing={2}>
                <Grid container>
                  <Grid item md={4} sm={12}>
                    <img src={Bussine} width={isSmallScreen ? 250 : 350} />
                  </Grid>
                  <Grid item md={6} sm={12}>
                    <Stack direction="row" p={3} spacing={2}>
                      <Stack>
                        <Typography color="primary" variant='h5'><b>Academic Research Incentive</b></Typography>
                        <Typography variant='h6'><Check />The main purpose of the Raw Data Library is to contribute to the scientific world by providing easy access to Experimental Raw Data or Analytical Models by other researchers.</Typography>
                        <Typography variant='h6'><Check />In this context, researchers who upload their Raw Data to the online system with their own consent provide their previously obtained raw data to the use of other researchers.</Typography>
                        <Typography variant='h6'><Check />Data owners are financially supported for each of their data downloaded by other researchers.</Typography>
                      </Stack>

                    </Stack>
                  </Grid>
                  <Grid item md={2} sm={12}>
                    <Stack justifyContent="center" alignItems="center" height="100%">
                      <Link to="/signup">
                        <Button size='large' sx={{ minWidth: 100 }} variant='contained'>JOIN FOR FREE</Button>
                      </Link>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Stack>
      <Stack>
        <Container>

          <Paper>
            <Stack direction="row" p={2}>
              <Grid container>
                <Grid item md={6} sm={12}>
                  <Stack direction="row" p={2}>
                    <img src={UploadImage} width={300} />
                  </Stack>
                </Grid>
                <Grid item md={6} sm={12}>
                  <Stack p={1}>
                    <Typography color="primary" variant='h5'><b>Upload Your Data</b></Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Experimental data,</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Survey data,</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Analytical models,</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Software/Codes</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Algorithms and methods,</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Tabular Data,</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Dataset,</Typography>
                    <Typography variant='h6'>with all types of formats (e.g., excel, .txt, .docx .csv, .pdf and ext.) used in your research study.</Typography>
                  </Stack>
                </Grid>
              </Grid>

            </Stack>
          </Paper>
        </Container>
      </Stack>
      <Stack>
        <Container>

          <Typography color="primary" variant='h5'><b>Thanks to Access to Raw Data Library</b></Typography>
          <Grid container spacing={2} p={2} >
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageOne} width={150} />
                <Typography variant='h6'> Prevention of repetition of similar experimental test parameters and direct access to analytical modelling using software programs.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageTwo} width={150} />
                <Typography variant='h6'> Experimental studies can be completed with less budget.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageThree} width={150} />
                <Typography variant='h6'>More discussion opportunities and the development of more empirical or analytical models.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>



                <img src={ImageFour} width={150} />
                <Typography variant='h6'>More citation opportunities.</Typography>

              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageFive} width={150} />
                <Typography variant='h6'> Easy validations of previous data.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageSix} width={150} />
                <Typography variant='h6'> Sharing of other data mentioned but not presented in the article.,</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageSeven} width={150} />
                <Typography variant='h6'>Access to modelling of FEM, ABAQUS, ANSYS, SAP 2000, Solid Works and other computer modelling and documents.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageEight} width={150} />
                <Typography variant='h6'>Authors can track the number of times their data has been downloaded from their own profile page.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageNine} width={150} />
                <Typography variant='h6'>Authors can access their data online from anywhere in the world.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageTen} width={150} />
                <Typography variant='h6'> Payment information is uploaded to the profile page of each data owner and data owners can track their income.</Typography>
              </Paper>
            </Grid>
          </Grid>

        </Container>
      </Stack>
      <Stack width="100%">
        <Container>
          <Paper>
            <Stack p={2}>
              <Typography variant='h4' color="primary.main">
                Intellectual Property Rights of Raw Data
              </Typography>
              <Typography variant='h6'>
                Nowadays, journal publishers establish different journals that focus only on the data of articles published in other journals. Unless the processed data presented in
                research studies are presented as raw data in a journal and the author is not paid for their rights,
                the ownership and legal rights of the raw data belong to the researchers.
              </Typography>
            </Stack>
          </Paper>
        </Container>
      </Stack>
      <Stack width="100%">
        <Container>

          <Stack width="100%" spacing={2} mb={3}>
            <Paper sx={{ p: 2 }}>
              <Stack direction={isSmallScreen ? "column" : "row"} spacing={2} p={3}>
                <Avatar><QuestionMark /></Avatar>
                <Typography color="primary.main"><b>What do journals say about raw data</b></Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Stack>

                  <Typography>Dear Dr.,</Typography>
                  <Typography>Thank you for contacting journal of “….” regarding your request.</Typography>
                  <Typography>I would like to inform you that the raw data of the manuscript remains with the authors of the
                    manuscript.You can reach out to the corresponding author of the article, Dr. “…..” at
                    ....@..... to request the data however the decision to share the data remains with the author.</Typography>
                </Stack>


              </Stack>

              <Stack direction="row" justifyContent="end">
                <Typography sx={{ color: "primary.main" }}><b>Journal manager</b></Typography>
              </Stack>
            </Paper>

            <Typography color="primary" variant='h5'><b>Real Stories</b></Typography>
            <Grid container >
              {feedbacks.map((feedback, index) => (
                <Grid item xs={12} md={6} lg={4} key={index} sx={{ display: 'flex' }}>
                  <Paper
                    elevation={3}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      padding: 3,
                      minHeight: '300px', // Ensure a minimum height for consistency
                    }}
                  >
                    {index % 2 === 0 ? (
                      <Stack direction="column" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 100, height: 100 }} alt={feedback.name} src={feedback.image} />
                        <Typography variant="h6" color="primary.main" align="center">
                          {feedback.name}
                          <Typography variant="body2" color="gray">
                            {feedback.degree}
                          </Typography>
                        </Typography>
                        <Divider sx={{ width: '100%' }} />
                        <Typography variant="body1" align="center">
                          {feedback.comment}
                        </Typography>
                      </Stack>
                    ) : (
                      <Stack direction="column" spacing={2} alignItems="center">
                        <Typography variant="body1" align="center">
                          {feedback.comment}
                        </Typography>
                        <Divider sx={{ width: '100%' }} />
                        <Avatar sx={{ width: 100, height: 100 }} alt={feedback.name} src={feedback.image} />
                        <Typography variant="h6" color="primary.main" align="center">
                          {feedback.name}
                          <Typography variant="body2" color="gray">
                            {feedback.degree}
                          </Typography>
                        </Typography>
                      </Stack>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>

          </Stack>

        </Container>
      </Stack>
      <Stack width="100%">
        <Container>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Typography variant="h4" color="primary.main">
                Scientific Advisory Board - Scopus’s Top 2%
              </Typography>

              <Divider />

              <Grid container >
                <Grid item xs={12} md={6}>
                  <Stack >
                    <Typography variant="h6" p={1}>
                      A Scientific Advisory Board consisting of internationally recognized scientists is formed for each service offered by the Raw Data Library platform. Its main responsibility
                      is to participate in periodic evaluations of the scientific
                      performance of the platform and submit reports based on these findings to the chairman of the Scientific Advisory Board.
                    </Typography>

                    <Divider />

                    <Typography variant="h6" p={1}>
                      Regular evaluations are made at the end of each year. The opinions and suggestions of the members of the advisory board are taken and compiled by the rapporteur.
                      The compiled reports are presented to the members of the scientific advisory board. It is requested that the opinions and suggestions submitted to the members of the
                      Scientific Advisory Board be scored.
                    </Typography>


                  </Stack>
                </Grid>

                <Divider orientation="vertical" flexItem />

                <Grid item xs={12} md={5}>

                  <Typography variant="h6" p={1}>
                    According to the scoring obtained, decisions are reached for the next priority business plan and scientific needs.
                  </Typography>
                  <Typography variant="h6" p={1}>
                    The opinions and recommendations obtained are regularly published on the RDL website as a final report at the end of the year.
                  </Typography>
                  <Divider />
                  <Stack spacing={2} p={1} mt={3}>
                    <Typography variant="h5" color="primary.main">
                      Scientific Requirements for Becoming a Member
                    </Typography>
                    <Typography variant="h6">
                      • To be listed at Scopus’s Top 2% Scientists
                    </Typography>
                    <Typography variant="h6">
                      • To have an h-index of over 30.
                    </Typography>
                  </Stack>
                </Grid>

              </Grid>
            </Stack>
          </Paper>
        </Container>
      </Stack>
      <Stack width="100%">
        <Container >
          <Paper sx={{ p: 4 }}>
            <Stack p={1}>
              <Grid container mt={3} spacing={2}>
                <Stack spacing={1}>
                  <Typography variant='h4' color="primary.main" textAlign="center">Outstanding Members of the Scientific Advisory Board of Raw Data Library</Typography>
                  <Typography variant='h6'>The members of the Scientific Advisory Board at the Raw Data Library are internationally recognized scientists working at different universities and research facilities in different countries.  Our current members are as follows: </Typography>
                </Stack>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={6} sx={{ p: 3, borderRadius: 3, backgroundColor: '#f9f9f9' }}>
                    <Stack spacing={2} alignItems="center">
                      <Avatar
                        sx={{ width: 110, height: 110, boxShadow: 3 }}
                        src={HamidImage}
                        alt="Prof. Dr. Hamid Reza Karimi"
                      />
                      <Typography variant="h5" fontWeight="bold" align="center">
                        Prof. Dr. Hamid Reza Karimi
                      </Typography>
                      <Typography color="text.secondary" variant="body2" align="center">
                        Department of Mechanical Engineering-Politecnico di Milano
                        , IT
                      </Typography>

                      <Stack spacing={1} alignItems="center" sx={{ width: '100%' }}>
                        <IconButton href="https://mecc.polimi.it/en/research/faculty/prof-hamid-reza-karimi " target="_blank" color="primary">
                          <LanguageIcon />
                          <Typography variant="body2" sx={{ ml: 1 }}>Website</Typography>
                        </IconButton>
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                          Scopus Records
                        </Typography>
                      </Stack>

                      <Stack spacing={0.5} sx={{ width: '100%' }}>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Rank (2023):</strong> 6133
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Number of documents:</strong> 1133
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>h-index:</strong> 101
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Citations:</strong> 35228
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Scopus ID:</strong> 55534323600
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={6} sx={{ p: 3, borderRadius: 3, backgroundColor: '#f9f9f9' }}>
                    <Stack spacing={2} alignItems="center">
                      <Avatar
                        sx={{ width: 110, height: 110, boxShadow: 3 }}
                        src={CharlesImage}
                        alt="Prof. Dr. Charles M. Lieber"
                      />
                      <Typography variant="h5" fontWeight="bold" align="center">
                        Prof. Dr. Charles M. Lieber
                      </Typography>
                      <Typography color="text.secondary" variant="body2" align="center">
                        The former Chair of Chemistry and Chemical Biology Department - Harvard University, USA
                      </Typography>

                      <Stack spacing={1} alignItems="center" sx={{ width: '100%' }}>
                        <IconButton href="https://cmlresearch.org" target="_blank" color="primary">
                          <LanguageIcon />
                          <Typography variant="body2" sx={{ ml: 1 }}>Website</Typography>
                        </IconButton>
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                          Scopus Records
                        </Typography>
                      </Stack>

                      <Stack spacing={0.5} sx={{ width: '100%' }}>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Rank (2023):</strong> 45
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Number of documents:</strong> 1300
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>h-index:</strong> 198
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Citations:</strong> 181205
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Scopus ID:</strong> 35482471900
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={6} sx={{ p: 3, borderRadius: 3, backgroundColor: '#f9f9f9' }}>
                    <Stack spacing={1.4} alignItems="center">
                      <Avatar
                        sx={{ width: 110, height: 110, boxShadow: 3 }}
                        src={JiHuanImage}
                        alt="Prof. Dr. Ji-Huan He"
                      />
                      <Typography variant="h5" fontWeight="bold" align="center">
                        Prof. Dr. Ji-Huan He
                      </Typography>
                      <Typography color="text.secondary" variant="body2" align="center">
                        National Engineering Laboratory for Modern Silk, College of Textile and Clothing Engineering, Soochow University-CHN
                      </Typography>

                      <Stack spacing={1} alignItems="center" sx={{ width: '100%' }}>
                        <IconButton href="https://research.com/scientists-rankings/mathematics/cn" target="_blank" color="primary">
                          <LanguageIcon />
                          <Typography variant="body2" sx={{ ml: 1 }}>Website</Typography>
                        </IconButton>
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                          Scopus Records
                        </Typography>
                      </Stack>

                      <Stack spacing={0.5} sx={{ width: '100%' }}>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Rank (2023):</strong> 145
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Number of documents:</strong> 675
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>h-index:</strong> 102
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Citations:</strong> 49916
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Scopus ID:</strong> 55817862100
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={6} sx={{ p: 3, borderRadius: 3, backgroundColor: '#f9f9f9' }}>
                    <Stack spacing={2} alignItems="center">
                      <Avatar
                        sx={{ width: 110, height: 110, boxShadow: 3 }}
                        src={TimothyImage}
                        alt="Prof. Dr.Timothy Michael Kusky"
                      />
                      <Typography variant="h5" fontWeight="bold" align="center">
                        Prof. Dr. Timothy Michael Kusky
                      </Typography>
                      <Typography color="text.secondary" variant="body2" align="center">
                        Editor of Earth Science Reviews and Journal of Earth Science, and  Associate Editor of Geological Society of America Bulletin
                      </Typography>

                      <Stack spacing={1} alignItems="center" sx={{ width: '100%' }}>
                        <IconButton href="https://www.ae-info.org/ae/Member/Kusky_Timothy_Michael" target="_blank" color="primary">
                          <LanguageIcon />
                          <Typography variant="body2" sx={{ ml: 1 }}>Website</Typography>
                        </IconButton>
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                          Scopus Records
                        </Typography>
                      </Stack>

                      <Stack spacing={0.5} sx={{ width: '100%' }}>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Rank (2023):</strong> 14588
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Number of documents:</strong> 333
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>h-index:</strong> 73
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Citations:</strong> 20151
                        </Typography>
                        <Typography variant="body2">
                          <BarChartIcon sx={{ mr: 1 }} /> <strong>Scopus ID:</strong> 35234213100
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Container>
      </Stack>



      <Stack>
        <Container>

          <Typography color="primary" variant='h5'><b>Upcoming conferences</b></Typography>
          <Grid container spacing={2} p={2} >
            <Grid item md={12} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>

                {!isSmallScreen && <Stack >
                  <Typography variant='h5' mb={2}> World Congress on Civil, Structural, and Environmental Engineering</Typography>
                  <Grid container>
                    <Grid item xs={1}>
                      <Stack width="100%" justifyContent="center" alignItems="center" height="100%" borderRadius={3}>
                        <Button onClick={() => setSlider(0)} disabled={slider == 0} startIcon={<ArrowLeft />} variant='contained'></Button>
                      </Stack>
                    </Grid>

                    <Grid item xs={10}>
                      <Link to="https://civilengineeringconference.com/">
                        {slider == 0 && <Stack width="100%" justifyContent="center" alignItems="center">
                          <Box component="img" width="100%" src={Conferences1} />
                        </Stack>}
                        {slider == 1 && <Stack width="100%" justifyContent="center" alignItems="center">
                          <Box component="img" width="100%" src={Conferences2} />
                        </Stack>}
                      </Link>
                    </Grid>

                    <Grid item xs={1}>
                      <Stack width="100%" justifyContent="center" alignItems="center" height="100%" borderRadius={3}>
                        <Button onClick={() => setSlider(1)} disabled={slider == 1} endIcon={<ArrowRight />} variant='contained' ></Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>}
                {isSmallScreen && <Stack >
                  <Grid container spacing={1}>


                    <Grid item xs={12}>
                      <Typography variant='h6' mb={2}> World Congress on Civil, Structural, and Environmental Engineering</Typography>
                      <Link to="https://civilengineeringconference.com/">
                        {slider == 0 && <Stack width="100%" justifyContent="center" alignItems="center">
                          <Box component="img" width="100%" src={Conferences1} />
                        </Stack>}
                        {slider == 1 && <Stack width="100%" justifyContent="center" alignItems="center">
                          <Box component="img" width="100%" src={Conferences2} />
                        </Stack>}
                      </Link>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack width="100%" justifyContent="center" alignItems="center" height="100%" borderRadius={3}>
                        <Button onClick={() => setSlider(0)} disabled={slider == 0} startIcon={<ArrowLeft />} variant='contained'></Button>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack width="100%" justifyContent="center" alignItems="center" height="100%" borderRadius={3}>
                        <Button onClick={() => setSlider(1)} disabled={slider == 1} endIcon={<ArrowRight />} variant='contained' ></Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Stack>
      <Footer />
    </Stack >
  );
};

export default MainPage;