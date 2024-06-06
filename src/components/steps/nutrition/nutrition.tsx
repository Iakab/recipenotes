import { Fragment, useContext, useEffect, useMemo, useState } from 'react';

import { StorageContext } from 'context/storage.context';

import { Container, TextField, Typography, useMediaQuery } from '@mui/material';

import { Nutrition as NutritionType } from 'utils/api/api.types';

import { StepsProps } from '../nameAndDescription/nameAndDescription';

const Nutrition: React.FC<StepsProps> = ({ submitStep, setSubmitStep }) => {
  const [nutrition, setNutrition] = useState<NutritionType>();

  const { setRecipeToUpload, recipeToUpload } = useContext(StorageContext);

  const phoneSize = useMediaQuery('(max-width:600px)');

  const registeredNutrition = useMemo(
    () =>
      recipeToUpload?.nutrition || {
        calories: undefined,
        carbohydrates: undefined,
        fat: undefined,
        fiber: undefined,
        protein: undefined,
        sugar: undefined,
      },

    [recipeToUpload?.nutrition],
  );

  useEffect(() => {
    if (recipeToUpload?.nutrition) {
      setNutrition(recipeToUpload.nutrition);
    }
  }, []);

  const handleMouseOut = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const { id, value } = event.target;
    if (value) {
      if (nutrition) {
        setNutrition({ ...nutrition, [id]: Number(value) });
      } else {
        setNutrition({ [id]: value });
      }
    }
  };

  useEffect(() => {
    if (submitStep.initialized) {
      if (nutrition) {
        setRecipeToUpload({
          ...recipeToUpload,
          nutrition,
        });
      }
      setSubmitStep({ initialized: false, submitted: true });
    }
  }, [submitStep.initialized]);

  return (
    <Fragment>
      <Typography variant="h4" sx={{ display: 'inline' }}>
        Nutrition{' '}
        <Typography variant="button">&nbsp; &oslash;/100 g</Typography>
      </Typography>
      <Typography variant="h5" sx={{ display: 'inline' }}>
        (optional)
      </Typography>

      <Container
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          mt: phoneSize ? '3rem' : 0,
        }}
      >
        <TextField
          defaultValue={registeredNutrition.calories}
          id="calories"
          label="Calories (g)"
          onBlur={handleMouseOut}
          size="small"
          sx={{ width: '27rem' }}
          type="number"
          variant="filled"
        ></TextField>

        <TextField
          defaultValue={registeredNutrition.fat}
          id="fat"
          label="Fat (g)"
          onBlur={handleMouseOut}
          size="small"
          sx={{ width: '27rem' }}
          type="number"
          variant="filled"
        ></TextField>

        <TextField
          defaultValue={registeredNutrition.carbohydrates}
          id="carbohydrates"
          label="Carbohydrates (g)"
          onBlur={handleMouseOut}
          size="small"
          sx={{ width: '27rem' }}
          type="number"
          variant="filled"
        ></TextField>

        <TextField
          defaultValue={registeredNutrition.protein}
          id="protein"
          label="Protein (g)"
          onBlur={handleMouseOut}
          size="small"
          sx={{ width: '27rem' }}
          type="number"
          variant="filled"
        ></TextField>

        <TextField
          defaultValue={registeredNutrition.fiber}
          id="fiber"
          label="Fiber (g)"
          onBlur={handleMouseOut}
          size="small"
          sx={{ width: '27rem' }}
          type="number"
          variant="filled"
        ></TextField>
      </Container>
    </Fragment>
  );
};

export default Nutrition;
