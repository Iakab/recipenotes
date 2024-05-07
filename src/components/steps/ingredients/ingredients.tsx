import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { StorageContext } from 'context/storage.context';

import { Box, Container } from '@mui/system';
import {
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CloseIcon from '@mui/icons-material/Close';

import { Instruction, Section, Component } from 'utils/api/api.types';

import './ingredients.scss';

import { StepsProps } from '../nameAndDescription/nameAndDescription';

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

type Instructions = Instruction[];
type Components = Component[];

const Ingredients: React.FC<StepsProps> = ({ submitStep, setSubmitStep }) => {
  const [components, setComponents] = useState<Components>([]);
  const [instructions, setInstructions] = useState<Instructions>([]);
  const [yields, setYields] = useState<string>('Servings: 1');

  const { recipeToUpload, setDisplayMessage, setRecipeToUpload } =
    useContext(StorageContext);

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
        if (!instructions || !components || !yields) {
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
      setComponents([
        ...components,
        {
          id: (components[components.length - 1]?.id as number) + 1 || 0,
          raw_text: ingredient,
        },
      ]);
      reset();
    }

    if (instructionInput) {
      setInstructions([
        ...instructions,
        {
          display_text: instructionInput,
          id: (instructions[instructions.length - 1]?.id as number) + 1 || 0,
        },
      ]);
      reset();
    }
  };

  const handleYieldsSelect = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setYields(`Servings: ${event.target.value}`);
  };

  const handleRemoveFromIngredients = (id: number) => {
    setComponents(components.filter((component) => component.id !== id));
  };

  const handleRemoveFromInstructions = (id: number) => {
    setInstructions(
      instructions.filter((instruction) => instruction.id !== id),
    );
  };

  return (
    <Container
      sx={{
        height: '100%',
        width: '100%',
        mb: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ alignSelf: 'flex-start' }}>
        Add ingredients and instructions:
      </Typography>
      <Container
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="ingredients-step"
      >
        <form className="form-ingredient" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('ingredient')}
            id="ingredient"
            label="Ingredient"
            sx={{ flex: '1 1 auto' }}
            variant="filled"
          ></TextField>
          <Button
            size="small"
            sx={{ margin: '1rem 3rem' }}
            type="submit"
            variant="contained"
          >
            Add <ArrowRightAltIcon fontSize="small" />
          </Button>
        </form>

        <Box
          className="list"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <Typography>Ingredients:</Typography>
          {components?.map((component) => (
            <Typography
              key={component.id}
              variant="body2"
              sx={{ margin: '-4px' }}
            >
              <IconButton
                onClick={() => handleRemoveFromIngredients(component.id)}
                size="small"
              >
                <CloseIcon fontSize="small" color="warning" />
              </IconButton>
              {`${component.id + 1}. ${component.raw_text}`}
            </Typography>
          ))}
        </Box>
      </Container>

      <TextField
        className="select-menu"
        id="yields"
        label="Servings"
        onChange={handleYieldsSelect}
        select
        size="small"
        sx={{ alignSelf: 'flex-start', width: '11rem', margin: 'auto 7rem' }}
        value={yields.split(' ')[1]}
        variant="filled"
      >
        {servingsOptions.map((number) => (
          <MenuItem key={number} value={number}>
            {number}
          </MenuItem>
        ))}
      </TextField>

      <Container
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="ingredients-step"
      >
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('instructionInput')}
            id="instructionInput"
            label="Instruction"
            sx={{ flex: '1 1 auto' }}
            variant="filled"
          ></TextField>
          <Button
            size="small"
            sx={{ margin: '1rem 3rem' }}
            type="submit"
            variant="contained"
          >
            Add <ArrowRightAltIcon fontSize="small" />
          </Button>
        </form>
        <Box
          className="list"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <Typography>Instructions:</Typography>
          {instructions.map((instruction) => (
            <Typography
              key={instruction.id}
              sx={{ margin: '-4px' }}
              variant="body2"
            >
              <IconButton
                onClick={() => handleRemoveFromInstructions(instruction.id)}
                size="small"
              >
                <CloseIcon fontSize="small" color="warning" />
              </IconButton>
              {`${instruction.id + 1}. ${instruction.display_text}`}
            </Typography>
          ))}
        </Box>
      </Container>
    </Container>
  );
};
export default Ingredients;
