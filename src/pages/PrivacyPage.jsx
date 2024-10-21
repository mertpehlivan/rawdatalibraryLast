import { Box, Button, Container, Divider, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { ForkLeft } from '@mui/icons-material'
const PrivacyPage = () => {
    return (
        <Container>
            <Paper >

                <Stack p={5} spacing={3}>
                    <Stack direction="row">
                        <Link to={"/"}>

                            <Button startIcon={<ForkLeft />} variant='outlined'>Back</Button>  </Link>

                    </Stack>
                    <Stack alignItems="center">
                        <img width={200} src={Logo} />
                        <Divider />
                    </Stack>
                    <Divider />
                    <Typography variant='h5'>
                        Privacy Policy
                    </Typography>
                    <Typography>
                        RAW DATA LIBRARY provides the services rendered to you through the Raw Data Library website available at https://www.rawdatalibrary.net, and through any of its web pages and associated applications which may be available on multiple devices.
                    </Typography>
                    <Typography>
                        The main purpose of the Raw Data Library is to contribute to the scientific world by providing easy access to Experimental Raw Data, Analytical Models and Questionary Survey Forms by other researchers.
                    </Typography>
                    <Typography>
                        In this context, researchers who upload their Raw Data to the online system with their own consent provide their previously obtained raw data to the use of other researchers.
                    </Typography>
                    <Typography>
                        Researchers who upload their Raw Data to the system are paid according to the number of downloads of their data through the Raw Data Library company.
                    </Typography>
                    <Typography>
                        •	Personal information we collect. Raw Data Library collect information that you provide to us, information where we obtain automatically when you use our registration service, and information from other sources such as third-party services and organizations. The information collected by Raw Data Library is used only for academic and scientific purposes. With the purpose of academic incentives provided to authors, it is aimed to pave the way for more scientific studies.
                    </Typography>
                    <Typography>
                        •	Registration. When you register with us through the services to become a Raw Data Library member, Raw Data Library collect your name-surname, email address, university name and password. You may choose to add additional information in your profile such as your research interests and profile picture. The contact information obtained is stored only for the purpose of allowing researchers to log in to the system and contact them. The authors' interests are recorded and suggestions are presented to them by the system in order for them to follow other authors in the same field of interest.
                    </Typography>
                    <Typography>
                        •	Purchasing and selling data. We may collect personal information and details associated with your purchasing and selling the raw data including payment information. Any payments made via our services are processed by third-party payment “e.g., iyzico, https://www.iyzico.com/” processors. Raw Data Library do not directly collect or store any payment card information entered through our services. We may receive information associated with your payment card information (e.g., your billing details).
                    </Typography>
                    <Typography>
                        •	Accuracy of raw data purchased or sold. The Raw Data Library company checks each uploaded raw data so that other researchers can easily use it. However, the 100% accuracy of the data uploaded by the researchers is not guaranteed. Preview images. When the data in any article is uploaded, the technical team downloads it to the relevant article at the first stage. Then the uploaded data and the sample names in the article are checked. If the relevant data is an excel file, the technical team provides control by drawing the relevant raw data and comparing it with the data given in the article. Of course, due to the fact that it is raw data, it is not expected that all the exact data will be the same numerically. Uploaded preview images give an idea of what other researchers will have if the corresponding data or model are purchased.
                    </Typography>
                    <Typography>
                        •	Your communications with us. We may collect personal information, such as email addresses, phone numbers, or mailing addresses, when you request information about our services, request customer or technical support. If the researchers contact the technical service, the subject mentioned in question is shared only with the authorized persons. The stated problems and/or requests are not shared on any platform and only the solution of the relevant issue is focused on. In some cases, these technical problems are addressed only at meetings attended by senior managers in order to contribute to the development of the company.
                    </Typography>
                    <Typography>
                        •	How we use your information. We use your information for to contact with you and proceed the payment information. Raw Data Library contact with you if there are any problems on your own personal page for the specified problems in order to help you. In cases where we can not contact with co-authors and payments are not completed for the co-authors, a request for assistance is made by contacting the corresponding authors.
                    </Typography>
                    <Typography>
                        •	Your privacy choices and rights. If you receive an unwanted email from us, you can use the unsubscribe link found at the bottom of the email to opt out of receiving future emails or you can complete the same process by contacting us directly.
                    </Typography>
                    <Typography>
                        •	Security of your personal information. We are constantly working to ensure that your information is treated securely and in accordance with this privacy policy. Of course, no system is 100% secure. Therefore, we can not 100% guarantee the security of any information you provide. We have taken appropriate measures to protect your personal information and require our third-party service providers to have appropriate safeguards in place. Raw Data Library is constantly working on the necessary measures for the security of stored data using advanced systems. In this context, the advanced Amazon system is used for the storage of raw data uploaded by any researchers.
                    </Typography>
                    <Typography>
                        Third-party services. We use Google Analytics to evaluate the usage behavior on our service. We use Google scholar to collect the number of citations for the related uploaded article. Raw Data Library use Amazon to store the raw data uploaded by researchers.
                    </Typography>
                    <Typography>
                        •	Selling data. Raw Data Library do not sell any data that is not uploaded by the authors to our site. Moreover, Raw Data Library does not have the right to store or transfer the income obtained anywhere other than the authors.
                    </Typography>
                    <Typography>
                        •	Data sharing in other services. It is prohibited to sell data purchased from the Raw Data Library to another service or publish it without permission. If such a situation is detected, the membership of the relevant researcher is terminated.
                    </Typography>
                    <Typography>
                        •	Payment process to authors. Authors can track the number of times their data has been downloaded from their own profile page. They can also track their income from their profile page “they can track which of their data in any uploaded article was sold, on what date the sale was made, how many times it was sold. After the interim payments for the relevant data are made, the payment information is uploaded to the profile page of each author. Thus, if any of the co-authors has not received the possible interim payments for various reasons, the payment is made again for the relevant co-author.
                    </Typography>
                    <Typography>
                        •	Journal rights. Journal rights are seriously protected by Raw Data Library company. For this reason, it is forbidden to share the full texts of articles published in journals unless the published articles are open access. If any of your articles have not been published anywhere, researchers can also upload the full text of the relevant article “such as conference papers or your own studies” to the system separately along with the raw data. If your article has been published somewhere and if it is not an open access, authors can upload only the raw data of the relevant article to the system with the title of the published paper within all information of the journal is provided. In this context, Raw Data Library provides authors with options on whether article PDFs should be public or private file. Researchers can also upload another data mentioned but not presented in the related article.
                    </Typography>
                    <Stack justifyContent="flex-end" alignItems="flex-end">


                        <Box width={400} >
                            <Typography >If you have any questions about our privacy practices or this Privacy Policy, or to exercise your rights as detailed in this Privacy Policy, please contact us at:</Typography>
                            <Typography variant='h5'>RAW DATA LIBRARY</Typography>
                            <a textAlign="end" href="mailto:info@rawdatalibrary.net">info@rawdatalibrary.net</a>
                        </Box>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    )
}

export default PrivacyPage