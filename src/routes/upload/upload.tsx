import { useState, Fragment } from 'react';

import { Box } from '@mui/system';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';

import steps from 'components/steps/steps';

import './upload.scss';

const UploadRecipe = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <Box className="upload">
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className="stepper"
      >
        {steps.map((step: any, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Done {activeStep + 1}</Typography>
        </Fragment>
      ) : (
        <Box className="step">
          {steps[activeStep].content}

          <Box width={'100%'} className="buttons">
            <Button
              onClick={handleBack}
              size="large"
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              size="large"
              disabled={activeStep === steps.length - 1}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UploadRecipe;
