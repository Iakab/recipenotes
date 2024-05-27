import { useContext, useMemo } from 'react';

import { StorageContext } from 'context/storage.context';

import { Instruction, RecipeItemToUpload, Section } from 'utils/api/api.types';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Typography,
  useMediaQuery,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Overview = () => {
  const { recipeToUpload, imgToStore } = useContext(StorageContext);

  const phoneSize = useMediaQuery('(max-width:600px)');

  const {
    description,
    instructions,
    name,
    nutrition,
    sections,
    total_time_tier: totalTimeTier,
    yields,
  } = recipeToUpload as RecipeItemToUpload;

  const ingredients = useMemo(
    () =>
      (sections as Section[])[0].components.map((item) => (
        <Typography variant="body2" key={item.id}>
          &bull;&nbsp;{item.raw_text}
        </Typography>
      )),

    [recipeToUpload],
  );

  const instructionsList = useMemo(
    () =>
      (instructions as Instruction[]).map((instruction, index) => (
        <Typography variant="body2" key={instruction.id}>
          {index + 1}.&nbsp;
          {instruction.display_text}
        </Typography>
      )),
    [recipeToUpload],
  );

  const nutritionList = useMemo(() => {
    if (nutrition) {
      return Object.entries(nutrition).map((item, index) => {
        const itemName = item[0];
        const value = item[1];

        return (
          <Typography variant="body2" key={index}>
            {itemName}: {value}
          </Typography>
        );
      });
    }
    return undefined;
  }, [recipeToUpload]);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: '2rem',
          flexWrap: phoneSize ? 'wrap' : 'nowrap',
        }}
      >
        <Box sx={{ mb: '2rem' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: '2rem',
            }}
          >
            <Typography variant="h4" sx={{ ml: '2rem' }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ mr: '2rem' }}>
              ({totalTimeTier?.display_tier})
            </Typography>
          </Box>
          <Typography variant="body2" style={{ minWidth: '25rem' }}>
            {description}
          </Typography>
        </Box>
        <Box sx={phoneSize ? { order: '-1', alignSelf: 'center' } : {}}>
          <img
            src={URL.createObjectURL(imgToStore as File)}
            style={{
              width: '17rem',
              height: '17rem',
              borderRadius: '100%',
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            flex: '1 1 auto',
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: '.5rem' }}>
            Ingredients:
          </Typography>
          <Box sx={{ ml: '1rem' }}>{ingredients}</Box>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box
          sx={{
            flex: '1 1 auto',
            maxWidth: '50%',
            ml: '2rem',
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: '.5rem' }}>
            Instructions:
          </Typography>
          <Box sx={{ ml: '1rem' }}>{instructionsList}</Box>
        </Box>
      </Box>
      <Typography variant="subtitle1" sx={{ mb: '4rem' }}>
        {yields}
      </Typography>
      {nutrition && (
        <Box
          sx={{
            mb: '3rem',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Accordion
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .03)',
              flex: '1 1 auto',
              maxWidth: '50rem',
            }}
          >
            <AccordionSummary
              aria-controls="panel1-content"
              expandIcon={<ExpandMoreIcon />}
              id="panel1-header"
            >
              <Typography variant="subtitle1">
                Nutrition
                <Typography variant="caption">
                  &nbsp;(&oslash;/100 g):
                </Typography>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{nutritionList}</AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Container>
  );
};

export default Overview;
