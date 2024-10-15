import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNewPublicationContext } from '../../context/NewPublicationProvider';

function PublicationStepper() {
    const { step, publication } = useNewPublicationContext();
    
    const steps = [
        'Publication Type',
        'Publication Info',
        'Upload PDF',
        'Upload Raw Data',
    ];

    // 'Add Researcher' adımını yalnızca 'Thesis' olmadığı durumda ekle
    if (publication.type !== "Thesis") {
        steps.splice(2, 0, 'Add Researcher');  // Üçüncü sıraya 'Add Researcher' adımını ekle
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={step} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default PublicationStepper;
