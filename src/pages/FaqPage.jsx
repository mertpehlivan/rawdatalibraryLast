import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import Figure2 from '../assets/incentive.png'
import Figure1 from '../assets/faq.png'
import Figure3 from '../assets/man.png'

const FaqPage = () => {
  return (
    <Stack spacing={3}>


      <Container maxWidth>
        <Stack >
          <Grid container sx={{ opacity: 1, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} bgcolor="white" borderRadius={3}  >
            <Grid item sm={12} md={5}>
              <Stack height="100%">
                <Box component="img" src={Figure1} width="100%" height="100%" sx={{ objectFit: 'cover' }} />
              </Stack>

            </Grid>
            <Grid item sm={12} md={7}>

              <Stack spacing={3} p={10} bgcolor="white" >
                <Typography fontFamily="Times New Roman,sans-serif" color="primary.main" variant='h3'>FREQUENTLY ASKED QUESTIONS</Typography>

                <Typography fontFamily="Times New Roman,sans-serif" color="primary.main" variant='h4'>Can I upload the data of a published article?</Typography>

                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  Of course.
                </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  In the published articles, the data are presented as a summarized table or graphically. This makes it difficult to reuse the data by other researchers.
                </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  Many of the outputs mentioned in the relevant articles (for example: graphical representations) cannot be presented due to the page limit.
                </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  It may not be possible to present survey data or provide graphs of all the results.
                </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  RDL platform was established to ensure that the data in the studies can be easily discovered and accessed and to offer academic incentives to researchers.
                </Typography>

              </Stack>

            </Grid>
          </Grid>
        </Stack>

      </Container>
      <Container maxWidth>
        <Stack >
          <Grid container sx={{ opacity: 1, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} bgcolor="white" borderRadius={3}  >
            <Grid item sm={12} md={5}>

              <Box component="img" src={Figure2} width="100%" height="100%" sx={{ objectFit: 'cover' }} />
            </Grid>
            <Grid item sm={12} md={7}>

              <Stack spacing={3} p={10} bgcolor="white" >

                <Typography fontFamily="Times New Roman,sans-serif" color="primary.main" variant='h4'>Am I doing commercial business by uploading my data? </Typography>

                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  No.
                </Typography>

                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  The fee for the sold data is not transferred directly to the data owner's account during the sale. The fee for the sold data is transferred to the official bank account of the RDL company. Commercial transactions are taxed by being made by the RDL company.
                </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  Therefore, RDL company sells the raw data of the data owners. RDL company then provides academic incentives to data owners from the income earned.
                </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  Academicians can receive different incentive awards. Sometimes from a journal, sometimes from an applied award program.
                </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  As with the incentives received in different ways, RDL company provides academic incentives to researchers thanks to this platform and supports their further research.
                </Typography>


              </Stack>

            </Grid>
          </Grid>
        </Stack>

      </Container>
      <Container maxWidth>
        <Stack >
          <Grid container sx={{ opacity: 1, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} bgcolor="white" borderRadius={3}  >
            <Grid item sm={12} md={5}>
              <Stack height="100%">
              <Box component="img" src={Figure3} width="100%" height="100%" sx={{ objectFit: 'cover' }} />
              </Stack>

            </Grid>
            <Grid item sm={12} md={7}>

              <Stack spacing={3} p={10} bgcolor="white" >

                <Typography fontFamily="Times New Roman,sans-serif" color="primary.main" variant='h4'>Why does the number of downloads need to reach 5 for my income from data sales? </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  In order for data owners to earn income, it is not only a requirement that the total number of data downloads reach 5.

                </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  If the data owners do not reach a total of 5 downloads, they receive their income within 3 months from the date of sale of their first data.
                </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  Since the data sales online pay system is provided by third parties, RDL company does not store the bank information of the data owners.
                </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  Due to the large number of data and the pricing of each data varies for each data, a defined process is needed for the RDL company to transfer data revenues to data owners in the most accurate way, initiate accounting transactions, reach all data owners and receive feedback.
                </Typography>
                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                  The other most important reason why the data owner is not paid instantly for the sold data is the protection of the rights of the researchers who purchased the data. In case of inconsistency in the purchased data, it is aimed to establish communication with the data owner. RDL academics are obliged to make the right decision for both the data owner and other researchers who will use the data by examining the relevant data.
                </Typography>

              </Stack>

            </Grid>
          </Grid>
        </Stack>

      </Container>
    </Stack>
  )
}

export default FaqPage