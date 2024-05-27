import { useContext, useEffect, useMemo, useState } from 'react';

import { StorageContext } from 'context/storage.context';
import { useUserContext } from 'context/user.context';

import {
  Box,
  Container,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { Credit } from 'utils/api/api.types';

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
  const [credits, setCredits] = useState<Credit[]>();

  const { recipeToUpload, setRecipeToUpload, setDisplayMessage } =
    useContext(StorageContext);
  const { currentUser } = useUserContext();

  const maxTabLandSize = useMediaQuery('(max-width:1200px)');

  const registeredCredit = useMemo(() => {
    if (recipeToUpload?.credits) {
      return recipeToUpload.credits[0].name;
    }
    if (currentUser) {
      setCredits([{ name: currentUser.displayName, type: 'internal' }]);
      return currentUser?.displayName;
    }
  }, [recipeToUpload]);

  useEffect(() => {
    const { description, name } = recipeToUpload || {};
    if (description && name) {
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

        setRecipeToUpload({ ...recipeToUpload, description, name, credits });
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

    if (id === 'credits') {
      setCredits([{ name: value, type: 'internal' }]);
    }

    setNameAndDescription({ ...nameAndDescription, [id]: value });
  };

  return (
    <Container
      style={{
        width: maxTabLandSize ? '100%' : '80%',
        flex: '1 1 auto',
        marginBottom: '2rem',
        height: '100%',
      }}
    >
      <Typography variant="h4">Recipe name and description</Typography>

      <Box
        style={{
          width: '100%',
          minHeight: '100%',
          marginTop: '5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: '3rem',
        }}
      >
        <TextField
          defaultValue={recipeToUpload?.name}
          fullWidth
          id="name"
          label="Recipe name"
          onBlur={handleMouseOut}
          variant="filled"
        />
        <TextField
          defaultValue={recipeToUpload?.description}
          id="description"
          label="Description"
          multiline
          onBlur={handleMouseOut}
          rows={6}
          variant="filled"
        />

        <TextField
          defaultValue={registeredCredit}
          id="credits"
          label="Author"
          onBlur={handleMouseOut}
          variant="filled"
        />
      </Box>
    </Container>
  );
};

export default NameAndDescription;
