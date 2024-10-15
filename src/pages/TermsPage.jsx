import { Backdrop, Button, Container, Divider, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import Logo from '../assets/logo.svg'
import { ForkLeft } from '@mui/icons-material'
import { Link } from 'react-router-dom'
const TermsPage = () => {
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
                        Terms
                    </Typography>
                    <Typography>
                        By agreeing to these terms, you acknowledge that your subscription has recurring payment features, and you accept responsibility for all recurring payment obligations prior to cancellation of your subscription by you or Raw Data Library. These terms constitute a legally binding agreement between Raw Data Library and any of its members.
                    </Typography>
                    <Typography>
                        These terms apply to your use of all Raw Data websites, applications, services and products (“Services” or individually a “Service”) that post a link to these terms and are provided worldwide ("Raw Data Library", "we", "us" or "our"). By accessing or using any of the Services, you agree to be bound by these terms.
                    </Typography>
                    <Typography>
                        Raw Data Library websites may use cookies to store and help track your information. Cookies are pieces of information that are sent to your browser from a Web server and stored on your computer's hard drive. However, you may not reverse engineer, disassemble, decompile or translate any software in the content, or otherwise attempt to derive the source code of such software, except to the extent expressly permitted under applicable law, without our prior written permission.
                    </Typography>
                    <Typography>
                        You may not use any robots, spiders, crawlers or other automated downloading programs, algorithms or devices, or equivalent manual process to continuously and automatically search, scrape, extract, deep link or index any content. You may not probe, scan or test the vulnerability of the Services or any network connected to the Services or breach or attempt to breach the security or authentication measures on the services or any network connected to the Services.
                    </Typography>
                    <Typography>
                        When you purchase a raw data you authorize us to charge you for such transaction. Any payments made via our services are processed by third-party payment “e.g., iyzico, https://www.iyzico.com/” processors. Raw Data Library do not directly collect or store any payment card information entered through our services. We may receive information associated with your payment card information (e.g., your billing details).
                    </Typography>
                    <Typography>
                        For payments, data owners are contacted and paid via Western union. In this context, bank names and first-last name information are requested from the authors in order to process the related payment. It is forbidden for a researcher to make data purchases without permission with card information that does not belong to him.
                    </Typography>
                    <Typography>
                        Raw Data Library may change and improve the terms at any time. Researchers will become subject to the new terms. We will provide such notice by sending you an email and/or notifying you on the service. If any user do not agree with the new terms they must close their account.
                    </Typography>
                    <Typography>
                        Members must not store, post or share any pornographic, immoral, sexually inappropriate, or violence-glorifying materials and racist rhetoric. It is forbidden for authors to become members on behalf of another author and use the information. It is forbidden for authors to make sales and profit by showing articles and/or data that do not belong to them as if they belong to them. Preview images. When the data in any article is uploaded, the technical team downloads it to the relevant article at the first stage. Then the uploaded data and the sample names in the articles are checked. If the relevant data is an excel file, the technical team provides control by drawing the relevant raw data and comparing it with the data given in the article. Of course, due to the fact that it is raw data, it is not expected that all the exact data will be the same numerically. Uploaded preview images give an idea of what other researchers will have if the corresponding data or model are purchased. In this context, uploading misleading data and profiting from them has been taken under control by the company.
                    </Typography>
                    <Typography>

                        If you use a password to access a service, you must not reveal your password and must take reasonable steps to keep your password confidential and secure. You agree to immediately notify Raw Data Library if you become aware of or have reason to believe that there is any unauthorized use of your password or account or any other breach of security. In the same way, you agree to immediately notify Raw Data Library when you notice that your own and uploaded raw data has been uploaded by someone else.
                    </Typography>
                    <Typography>
                        By agreeing to these terms, researchers are responsible to protect the journal rights. Journal rights are seriously protected by Raw Data Library company. For this reason, it is forbidden to share the full texts of articles published in journals unless the published articles are open access. If any of your articles have not been published anywhere, researchers can also upload the full text of the relevant article “such as conference papers or your own studies” to the system separately along with the raw data. If your article has been published somewhere and if it is not an open access, authors can upload only the raw data of the relevant article to the system with the title of the published paper within all information of the journal is provided. In this context, Raw Data Library provides authors with options on whether article PDFs should be public or private file. Researchers can also upload another data mentioned but not presented in the related article.
                    </Typography>
                    <Stack justifyContent="flex-end">
                        <Typography textAlign="end" variant='h4'>Raw Data Library</Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    )
}

export default TermsPage