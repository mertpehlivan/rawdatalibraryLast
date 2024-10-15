import { ArrowBack, ArrowRight, ArrowRightAlt, Error, NextPlan } from '@mui/icons-material'
import { Button, ButtonGroup, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNewPublicationContext } from '../../context/NewPublicationProvider'

const PublicationStepperController = () => {
    const { step, setStep, publication, textValidation, editRawDataMode, editFolderMode } = useNewPublicationContext()
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
        if (step == 3) {
            if (publication.pdf.only == "NOT_PDF" || publication.pdf.file != null) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        } else if (step == 1) {
            console.log(textValidation)
            setDisabled(!textValidation)
        } else if (step == 4) {
            setDisabled(editRawDataMode || editFolderMode)
        }
    }, [step, publication, textValidation, editRawDataMode, editFolderMode]);
    return (
        <Paper elevation={5} >
            <Stack direction="row" alignItems="center" justifyContent={step == 4 && disabled ? "space-between": "end"} p={1}>
                {step == 4 && disabled &&
                    <Stack direction="row" alignContent="center" spacing={1} color="error">
                        <Error color='error'/>
                        <Typography color="error"><b> Ensure that all raw data is saved and that there are no empty folders left. </b></Typography>
                    </Stack>}
                <ButtonGroup>
                    <Button onClick={() => setStep(prev => prev - 1)} color='warning' variant='outlined' startIcon={<ArrowBack />}>Back</Button>
                    <Button disabled={disabled} onClick={() => setStep(prev => prev==1 && publication.type == "Thesis" ? prev + 2 : prev + 1)} variant='contained' startIcon={<ArrowRightAlt />}>continue</Button>
                </ButtonGroup>
            </Stack>
        </Paper>
    )
}

export default PublicationStepperController