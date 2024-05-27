import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { StorageContext } from 'context/storage.context';

import { Box, Container } from '@mui/system';
import {
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { Instruction, Component } from 'utils/api/api.types';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CloseIcon from '@mui/icons-material/Close';

import { StepsProps } from '../nameAndDescription/nameAndDescription';

import './ingredients.scss';

type FormValues = {
  ingredient: '';
  instructionInput: '';
};

const getServingOptions = () => {
  let n = 1;
  const numbers: string[] = [];
  while (n <= 30) {
    numbers.push(n.toString());
    n++;
  }

  return numbers;
};
const servingsOptions = getServingOptions();

const Ingredients: React.FC<StepsProps> = ({ submitStep, setSubmitStep }) => {
  const [components, setComponents] = useState<Component[]>();
  const [instructions, setInstructions] = useState<Instruction[]>();
  const [yields, setYields] = useState<string>('Servings: 1');

  const { recipeToUpload, setDisplayMessage, setRecipeToUpload } =
    useContext(StorageContext);

  const maxTabLandSize = useMediaQuery('(max-width:1200px)');

  useEffect(() => {
    if (recipeToUpload) {
      if (recipeToUpload.instructions) {
        setInstructions(recipeToUpload.instructions);
      }
      if (recipeToUpload.sections) {
        setComponents(recipeToUpload.sections[0].components);
      }
      if (recipeToUpload?.yields) {
        setYields(recipeToUpload?.yields);
      }
    }
  }, []);

  useEffect(() => {
    if (submitStep.initialized) {
      try {
        if (!instructions || !components) {
          setSubmitStep({ ...submitStep, initialized: false });
          throw new Error('All fields are required.');
        }

        const sections = [{ components }];
        setRecipeToUpload({
          ...recipeToUpload,
          sections,
          instructions,
          yields,
        });

        setSubmitStep({ initialized: false, submitted: true });
      } catch (error) {
        setDisplayMessage((error as Error).message);
      }
    }
  }, [submitStep.initialized]);

  const { handleSubmit, register, reset } = useForm<FormValues>({
    defaultValues: { ingredient: '', instructionInput: '' },
  });

  const onSubmit = (data: FormValues) => {
    const { ingredient, instructionInput } = data;

    if (ingredient) {
      const lastId = components?.length
        ? components[components.length - 1]?.id
        : -1;

      if (components) {
        setComponents([
          ...components,
          {
            id: lastId + 1,
            raw_text: ingredient,
          },
        ]);
      } else {
        setComponents([{ id: lastId + 1, raw_text: ingredient }]);
      }
      reset();
    }

    if (instructionInput) {
      const lastId = instructions?.length
        ? instructions[instructions.length - 1]?.id
        : -1;

      if (instructions) {
        setInstructions([
          ...instructions,
          {
            display_text: instructionInput,
            id: lastId + 1 || 0,
          },
        ]);
      } else {
        setInstructions([
          {
            display_text: instructionInput,
            id: lastId + 1 || 0,
          },
        ]);
      }
      reset();
    }
  };

  const handleYieldsSelect = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setYields(`Servings: ${event.target.value}`);
  };

  const handleRemoveFromIngredients = (id: number) => {
    setComponents(components?.filter((component) => component.id !== id));
  };

  const handleRemoveFromInstructions = (id: number) => {
    setInstructions(
      instructions?.filter((instruction) => instruction.id !== id),
    );
  };

  const ingredientsList = useCallback(
    () =>
      components?.map((component) => {
        const { id, raw_text: rawText } = component;

        return (
          <Typography key={id} variant="body2" style={{ lineHeight: '1.5' }}>
            <IconButton
              onClick={() => handleRemoveFromIngredients(id)}
              style={{ height: '.5rem' }}
            >
              <CloseIcon fontSize="small" color="warning" />
            </IconButton>
            {`${id + 1}. ${rawText}`}
          </Typography>
        );
      }),
    [components],
  );

  const instructionsList = useCallback(
    () =>
      instructions?.map((instruction) => {
        const { id, display_text: displayText } = instruction;

        return (
          <Typography key={id} variant="body2" style={{ lineHeight: '1.5' }}>
            <IconButton
              onClick={() => handleRemoveFromInstructions(id)}
              style={{ height: '.5rem' }}
            >
              <CloseIcon fontSize="small" color="warning" />
            </IconButton>
            {`${id + 1}. ${displayText}`}
          </Typography>
        );
      }),
    [instructions],
  );

  return (
    <Container
      sx={{
        height: '100%',
        width: '100%',
        mb: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        gap: '2rem',
      }}
    >
      <Typography variant="h4" sx={{ alignSelf: 'flex-start' }}>
        Add ingredients and instructions:
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            flex: '1 0 auto',
            display: 'flex',
            justifyContent: 'stretch',
          }}
        >
          <TextField
            {...register('ingredient')}
            className="step-input"
            id="ingredient"
            label="Ingredient"
            variant="filled"
          ></TextField>
          <Button
            size="small"
            sx={{
              margin: maxTabLandSize ? '1rem 1rem' : '1rem 3rem',
              flex: '0 1 10rem',
            }}
            type="submit"
            variant="contained"
          >
            Add <ArrowRightAltIcon fontSize="small" />
          </Button>
        </form>

        <Box className="list">
          <Typography>Ingredients:</Typography>
          {ingredientsList()}
        </Box>
      </Box>

      <TextField
        className="select-menu"
        id="yields"
        label="Servings"
        onChange={handleYieldsSelect}
        select
        size="small"
        sx={{ width: '11rem' }}
        value={yields.split(' ')[1]}
        variant="filled"
      >
        {servingsOptions.map((number) => (
          <MenuItem key={number} value={number}>
            {number}
          </MenuItem>
        ))}
      </TextField>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            flex: '1 0 auto',
            display: 'flex',
            justifyContent: 'stretch',
          }}
        >
          <TextField
            {...register('instructionInput')}
            className="step-input"
            id="instructionInput"
            label="Instruction"
            variant="filled"
          ></TextField>
          <Button
            size="small"
            sx={{
              margin: maxTabLandSize ? '1rem 1rem' : '1rem 3rem',
              flex: '0 1 10rem',
            }}
            type="submit"
            variant="contained"
          >
            Add <ArrowRightAltIcon fontSize="small" />
          </Button>
        </form>
        <Box className="list">
          <Typography>Instructions:</Typography>
          {instructionsList()}
        </Box>
      </Box>
    </Container>
  );
};
export default Ingredients;
