import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Container } from '@mui/system';
import {
  Button,
  Chip,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CloseIcon from '@mui/icons-material/Close';

import './ingredients.scss';

type FormValues = {
  ingredient: '';
  instruction: '';
};

const getServingOptions = () => {
  let n = 1;
  const numbers: number[] = [];
  while (n <= 30) {
    numbers.push(n);
    n++;
  }
  return numbers;
};
const servingsOptions = getServingOptions();

const Ingredients = () => {
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [instructionsList, setInstructionsList] = useState<string[]>([]);

  const { handleSubmit, register, reset } = useForm<FormValues>({
    defaultValues: { ingredient: '', instruction: '' },
  });

  const onSubmit = (data: FormValues) => {
    const { ingredient, instruction } = data;

    if (ingredient) {
      setIngredientsList([...ingredientsList, ingredient]);
      reset();
    }

    if (instruction) {
      setInstructionsList([...instructionsList, instruction]);
      reset();
    }
  };

  const handleRemoveFromIngredients = (index: number) => {
    const ingredients = [...ingredientsList];
    ingredients.splice(index, 1);

    setIngredientsList(ingredients);
  };

  const handleRemoveFromInstrucitons = (index: number) => {
    const instructions = [...instructionsList];
    instructions.splice(index, 1);

    setInstructionsList(instructions);
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

        <Stack
          gap={'.5rem'}
          className="list"
          sx={{ flexWrap: 'wrap', overflow: 'auto' }}
        >
          {ingredientsList?.map((ingredient, index) => (
            <Chip
              onDelete={() => handleRemoveFromIngredients(index)}
              key={index}
              label={ingredient}
              sx={{ width: 'fit-content', padding: '0 .5rem' }}
            ></Chip>
          ))}
        </Stack>
      </Container>

      <TextField
        id="yields"
        select
        label="Servings"
        sx={{ alignSelf: 'flex-start', width: '11rem', margin: 'auto 7rem' }}
        variant="filled"
        size="small"
        defaultValue={1}
        className="select-menu"
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
            {...register('instruction')}
            id="instruction"
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
          {instructionsList.map((instruction, index) => (
            <Typography key={index} variant="body2" sx={{ margin: '-4px' }}>
              <IconButton
                onClick={() => handleRemoveFromInstrucitons(index)}
                size="small"
              >
                <CloseIcon fontSize="small" color="warning" />
              </IconButton>
              {`${index + 1}. ${instruction}`}
            </Typography>
          ))}
        </Box>
      </Container>
    </Container>
  );
};
export default Ingredients;
