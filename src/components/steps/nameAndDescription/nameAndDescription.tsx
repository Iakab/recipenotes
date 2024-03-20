import { useState } from 'react';

import { Box, Container, TextField, Typography } from '@mui/material';

type NameAndDescriptionState = {
  description: string;
  name: string;
};

const defaultNameAndDescription = {
  description: '',
  name: '',
};

const NameAndDescription = () => {
  const [nameAndDescription, setNameAndDescription] =
    useState<NameAndDescriptionState>(defaultNameAndDescription);

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
          id="name"
          label="Name"
          variant="filled"
          onBlur={handleMouseOut}
        />
        <TextField
          fullWidth
          id="description"
          label="Description"
          variant="filled"
          multiline
          rows={4}
          onBlur={handleMouseOut}
        />
      </Box>
    </Container>
  );
};

export default NameAndDescription;
