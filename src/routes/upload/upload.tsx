import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from 'context/user.context';
import { StorageContext } from 'context/storage.context';

import { uploadImage, getImage } from 'utils/firebase/storage';

import { Box } from '@mui/system';
import { Stepper, Step, StepLabel, Button } from '@mui/material';

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
      label: 'Nutrition(optional)',
      content: (
        <Nutrition submitStep={submitStep} setSubmitStep={setSubmitStep} />
      ),
      id: '5',
    },
    { label: 'Overview', content: <Overview />, id: '6' },
  ];

  const handleSubmit = async () => {
    const recipeId = (recipeToUpload as RecipeItem).id;
    try {
      await uploadImage(
        imgToStore as File,
        currentUser?.userUid,
        `recipes/${recipeId}`,
      );

      const recipeImage = await getImage(
        currentUser?.userUid,
        `recipes/${recipeId}`,
      );

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
          <Button onClick={handleBack} size="large" disabled={activeStep === 0}>
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button type="submit" onClick={handleSubmit} size="large">
              Submit
            </Button>
          ) : (
            <Button type="submit" onClick={handleNext} size="large">
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UploadRecipe;
