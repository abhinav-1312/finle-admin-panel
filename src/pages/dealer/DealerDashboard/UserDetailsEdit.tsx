/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */


import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import UserDetailFrom from './DelearStepperForm/UserDetailFrom'
import DealerDetails from './DelearStepperForm/DealerDetails';
import VehicleDetails from './DelearStepperForm/VehicleDetails';

const steps = ['User Details', 'Dealer Details', 'Vehicle Details'];

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (stepIndex: number): JSX.Element | null => {
    switch (stepIndex) {
      case 0:
        return <UserDetailFrom />;
      case 1:
        return <DealerDetails />;
      case 2:
        return <VehicleDetails />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>{renderStepContent(activeStep)}</div>
        <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default StepperForm;
