import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { occasionsObj } from 'utils/constants';

import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

const countriesOptions = () => {
  countries.registerLocale(enLocale);
  return countries.getNames('en', { select: 'official' });
};

const timeOptions = [
  'Under 15 minutes',
  'Under 30 minutes',
  'Under 1 hour',
  'Under 2 hour',
  'Under 3 hour',
  'More than 3 hours',
];
const difficultyOptions = ['Easy', 'Medium', 'Hard'];
const mealsOptions = ['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks'];

type TagsSelections = {
  country: string;
  difficulty: string;
  meal: string;
  time: string;
};

const defaultSelections = {
  country: '',
  difficulty: '',
  meal: '',
  time: '',
};

type FormValues = {
  mainIngredients: string;
};

const Tags = () => {
  const [selections, setSelections] =
    useState<TagsSelections>(defaultSelections);
  const [mainIngredients, setMainIngredients] = useState<string[]>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      mainIngredients: '',
    },
  });

  // useEffect(() => {
  //   if (mainIngredients) {
  //     console.log(mainIngredients);
  //   }
  // }, [mainIngredients]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setSelections({ ...selections, [name]: value });
  };

  const onSubmit = (data: FormValues) => {
    if (mainIngredients) {
      if (mainIngredients?.length < 3) {
        setMainIngredients([...mainIngredients, data.mainIngredients]);
        reset();
      } else {
        setError('mainIngredients', {
          type: 'custom',
          message: 'Max limit reached',
        });
      }
    } else {
      setMainIngredients([data.mainIngredients]);
      reset();
    }
  };

  const handleDelete = (index: number) => {
    const ingredients = [...(mainIngredients as string[])];

    ingredients.splice(index, 1);

    setMainIngredients(ingredients);
  };

  return (
    <Fragment>
      <Typography variant="h4" sx={{ mb: '2rem' }}>
        Tags
      </Typography>

      <Container
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '5rem',
        }}
      >
        <Container
          sx={{
            flex: '1 1 auto',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: '1rem',
          }}
        >
          <TextField
            defaultValue=""
            id="country"
            label="Select country"
            name="country"
            onChange={handleChange}
            select
            size="small"
            sx={{ minWidth: '16rem' }}
            variant="filled"
          >
            {Object.entries(countriesOptions()).map((country, index) => (
              <MenuItem key={index} value={country[1]}>
                {country[1]}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            defaultValue=""
            id="meal"
            label="Select Meal"
            name="meal"
            onChange={handleChange}
            select
            size="small"
            sx={{ minWidth: '14rem' }}
            variant="filled"
          >
            {mealsOptions.map((meal, index) => (
              <MenuItem key={index} value={meal}>
                {meal}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            defaultValue=""
            id="difficulty"
            label="Difficulty"
            name="difficulty"
            onChange={handleChange}
            select
            size="small"
            sx={{ minWidth: '12rem' }}
            variant="filled"
          >
            {' '}
            {difficultyOptions.map((difficulty, index) => (
              <MenuItem key={index} value={difficulty}>
                {difficulty}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            defaultValue=""
            id="time"
            label="Select time"
            name="time"
            onChange={handleChange}
            select
            size="small"
            sx={{ minWidth: '13rem' }}
            variant="filled"
          >
            {' '}
            {timeOptions.map((timeOption, index) => (
              <MenuItem key={index} value={timeOption}>
                {timeOption}
              </MenuItem>
            ))}
          </TextField>
        </Container>

        <Container>
          <Autocomplete
            multiple
            id="occasion"
            // key={option => option.id}
            options={occasionsObj}
            getOptionLabel={(option) => option.name}
            getOptionKey={(option) => option.id}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.id}>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Occasions" />
            )}
          ></Autocomplete>
        </Container>

        <Container
          sx={{
            flex: '1 1 auto',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Main ingredients (max. 3)"
              variant="filled"
              sx={{ alignSelf: 'flex-start', width: '23rem' }}
              {...register('mainIngredients', { required: 'required' })}
            ></TextField>
            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{ margin: '1rem 3rem' }}
            >
              Add
            </Button>
            {errors?.mainIngredients && (
              <Alert variant="outlined" severity="warning">
                Maximum limit reached
              </Alert>
            )}
          </form>
          <Stack gap={'1rem'} sx={{ flex: '1 1 auto', margin: '1rem 2rem' }}>
            {mainIngredients?.map((ingredient, index) => (
              <Chip
                onDelete={() => handleDelete(index)}
                key={index}
                label={ingredient}
                sx={{ width: 'fit-content', padding: '0 .5rem' }}
              ></Chip>
            ))}
          </Stack>
        </Container>
      </Container>
    </Fragment>
  );
};

export default Tags;
