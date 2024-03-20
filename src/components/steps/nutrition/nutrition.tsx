import { Fragment, useState } from 'react';

import { Container, TextField, Typography } from '@mui/material';

type NutritionType = {
  calories: string;
  carbohydrates: string;
  protein: string;
  saturates: string;
  sodium: string;
  sugars: string;
  totalFat: string;
};

const defaultNutrition = {
  calories: '',
  carbohydrates: '',
  protein: '',
  saturates: '',
  sodium: '',
  sugars: '',
  totalFat: '',
};

// TODO: make it optional
const Nutrition = () => {
  const [nutrition, setNutrition] = useState<NutritionType>(defaultNutrition);

  const handleMouseOut = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const { id, value } = event.target;
    setNutrition({ ...nutrition, [id]: value });
  };

  return (
    <Fragment>
      <Typography variant="h4" sx={{ display: 'inline' }}>
        Nutrition{' '}
      </Typography>
      <Typography variant="h5" sx={{ display: 'inline' }}>
        (optional)
      </Typography>

      <Container
        sx={{
          height: '100%',
          ml: '5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <Typography variant="body1">
          Nutrition facts &nbsp; &oslash;/100 g
        </Typography>
        <TextField
          id="calories"
          label="Calories (g)"
          onBlur={handleMouseOut}
          size="small"
          sx={{ width: '22rem' }}
          type="number"
          variant="filled"
        ></TextField>

        <Container
          style={{ padding: '0' }}
          sx={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'flex-start',
          }}
        >
          <TextField
            id="totalFat"
            label="Total Fat (g)"
            onBlur={handleMouseOut}
            size="small"
            sx={{ width: '22rem' }}
            type="number"
            variant="filled"
          ></TextField>
          <TextField
            id="saturates"
            label="of which Saturates (g)"
            onBlur={handleMouseOut}
            size="small"
            sx={{ width: '25rem' }}
            type="number"
            variant="filled"
          ></TextField>
        </Container>

        <Container
          style={{ padding: '0' }}
          sx={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'flex-start',
          }}
        >
          <TextField
            id="carbohydrates"
            label="Total Carbohydrates (g)"
            onBlur={handleMouseOut}
            size="small"
            sx={{ width: '22rem' }}
            type="number"
            variant="filled"
          ></TextField>
          <TextField
            id="sugars"
            label="of which Sugars (g)"
            onBlur={handleMouseOut}
            size="small"
            sx={{ width: '25rem' }}
            type="number"
            variant="filled"
          ></TextField>
        </Container>

        <TextField
          id="protein"
          label="Protein (g)"
          onBlur={handleMouseOut}
          size="small"
          sx={{ width: '22rem' }}
          type="number"
          variant="filled"
        ></TextField>

        <TextField
          id="sodium"
          label="Sodium (g)"
          onBlur={handleMouseOut}
          size="small"
          sx={{ width: '22rem' }}
          type="number"
          variant="filled"
        ></TextField>
      </Container>
    </Fragment>
  );
};

export default Nutrition;
