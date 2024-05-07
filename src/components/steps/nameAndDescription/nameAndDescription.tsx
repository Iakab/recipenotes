import { useState, useContext, useEffect } from 'react';

import { StorageContext } from 'context/storage.context';

import { Box, Container, TextField, Typography } from '@mui/material';

type NameAndDescriptionState = {
  description: string;
  name: string;
};

const defaultNameAndDescription = {
  description: '',
  name: '',
};

export type StepsProps = {
  setSubmitStep: React.Dispatch<
    React.SetStateAction<{
      initialized: boolean;
      submitted: boolean;
    }>
  >;

  submitStep: {
    initialized: boolean;
    submitted: boolean;
  };
};

const NameAndDescription: React.FC<StepsProps> = ({
  submitStep,
  setSubmitStep,
}) => {
  const [nameAndDescription, setNameAndDescription] =
    useState<NameAndDescriptionState>(defaultNameAndDescription);

  const { recipeToUpload, setRecipeToUpload, setDisplayMessage } =
    useContext(StorageContext);

  useEffect(() => {
    if (recipeToUpload?.description && recipeToUpload.name) {
      const { description, name } = recipeToUpload;
      setNameAndDescription({ description, name });
    }
  }, []);

  useEffect(() => {
    if (submitStep.initialized) {
      try {
        const { description, name } = nameAndDescription;
        if (!description || !name) {
          setSubmitStep({ ...submitStep, initialized: false });
          throw new Error('All fields are required.');
        }

        setRecipeToUpload({ ...recipeToUpload, description, name });
        setSubmitStep({ initialized: false, submitted: true });
      } catch (error) {
        setDisplayMessage((error as Error).message);
      }
    }
  }, [submitStep.initialized]);

  const handleMouseOut = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const { id, value } = event.target;

    setNameAndDescription({ ...nameAndDescription, [id]: value });
  };

  return (
    <Container sx={{ width: '60vw' }}>
      <Typography variant="h4">Recipe's name and description</Typography>

      <Box
        sx={{
          marginTop: '4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          width: '80%',
        }}
      >
        <TextField
          defaultValue={recipeToUpload?.name}
          id="name"
          label="Name"
          onBlur={handleMouseOut}
          variant="filled"
        />
        <TextField
          defaultValue={recipeToUpload?.description}
          fullWidth
          id="description"
          label="Description"
          multiline
          onBlur={handleMouseOut}
          rows={4}
          variant="filled"
        />
      </Box>
    </Container>
  );
};

export default NameAndDescription;
