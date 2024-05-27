import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from 'context/user.context';
import { StorageContext } from 'context/storage.context';

import { uploadImage, getImage } from 'utils/firebase/storage';

import { Box } from '@mui/system';
import {
  Button,
  MobileStepper,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
} from '@mui/material';

import Ingredients from 'components/steps/ingredients/ingredients';
import NameAndDescription from 'components/steps/nameAndDescription/nameAndDescription';
import Nutrition from 'components/steps/nutrition/nutrition';
import Overview from 'components/steps/overview/overview';
import Tags from 'components/steps/tags/tags';
import UploadImage from 'components/steps/uploadImage/uploadImage';

import { RecipeItem } from 'utils/api/api.types';

import './upload.scss';

export type SubmitStep = {
  initialized: boolean;
  submitted: boolean;
};
const defaultSubmitStep = {
  initialized: false,
  submitted: false,
};

const UploadRecipe = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitStep, setSubmitStep] = useState(defaultSubmitStep);
  const navigate = useNavigate();

  const { currentUser } = useUserContext();

  const {
    imgToStore,
    recipeToUpload,
    setDisplayMessage,
    setImgToStore,
    setRecipeToUpload,
    uploadNewRecipe,
  } = useContext(StorageContext);

  const phoneSize = useMediaQuery('(max-width: 600px)');

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setSubmitStep({ ...submitStep, initialized: true });
  };

  useEffect(() => {
    if (submitStep.submitted) {
      setActiveStep(activeStep + 1);
      setSubmitStep({ ...submitStep, submitted: false });
    }
  }, [submitStep.submitted]);

  const steps = [
    {
      label: 'Upload image',
      content: (
        <UploadImage submitStep={submitStep} setSubmitStep={setSubmitStep} />
      ),
      id: '1',
    },
    {
      label: 'Name and description',
      content: (
        <NameAndDescription
          submitStep={submitStep}
          setSubmitStep={setSubmitStep}
        />
      ),
      id: '2',
    },
    {
      label: 'Ingredients',
      content: (
        <Ingredients submitStep={submitStep} setSubmitStep={setSubmitStep} />
      ),
      id: '3',
    },
    {
      label: 'Select tags',
      content: <Tags submitStep={submitStep} setSubmitStep={setSubmitStep} />,
      id: '4',
    },
    {
      label: 'Nutrition (optional)',
      content: (
        <Nutrition submitStep={submitStep} setSubmitStep={setSubmitStep} />
      ),
      id: '5',
    },
    { label: 'Overview', content: <Overview />, id: '6' },
  ];

  const handleSubmit = async () => {
    const recipeId = (recipeToUpload as RecipeItem).id;

    if (!currentUser) return;
    const { userUid } = currentUser;

    try {
      await uploadImage(imgToStore as File, userUid, `recipes/${recipeId}`);

      const recipeImage = await getImage(
        `images/${userUid}/recipes/${recipeId}`,
      );

      if (!recipeImage) {
        throw new Error('Failed to upload image');
      }

      uploadNewRecipe({
        ...(recipeToUpload as RecipeItem),
        thumbnail_url: recipeImage,
      });

      navigate('/storage');
      setDisplayMessage('Recipe successfully uploaded');
      setRecipeToUpload(undefined);
      setImgToStore(undefined);
    } catch (error) {
      setDisplayMessage((error as Error).message);
    }
  };

  const forwardButton = useMemo(() => {
    if (activeStep === steps.length - 1) {
      return (
        <Button type="submit" onClick={handleSubmit} size="large">
          Submit
        </Button>
      );
    }
    return (
      <Button type="submit" onClick={handleNext} size="large">
        Next
      </Button>
    );
  }, [activeStep]);

  const backButton = useMemo(
    () => (
      <Button onClick={handleBack} size="large" disabled={activeStep === 0}>
        Back
      </Button>
    ),
    [activeStep],
  );

  if (phoneSize) {
    return (
      <Box
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2rem',
        }}
      >
        <Box
          sx={{
            mb: '2rem',
          }}
        >
          {steps[activeStep].content}
        </Box>
        <MobileStepper
          activeStep={activeStep}
          backButton={backButton}
          nextButton={forwardButton}
          position="static"
          steps={steps.length}
        ></MobileStepper>
      </Box>
    );
  }
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

      <Box className="step">
        {steps[activeStep].content}
        <Box width={'100%'} className="buttons">
          {backButton}
          {forwardButton}
        </Box>
      </Box>
    </Box>
  );
};

export default UploadRecipe;
