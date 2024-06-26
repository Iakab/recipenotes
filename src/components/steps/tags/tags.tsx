import { Fragment, useContext, useEffect, useMemo, useState } from 'react';

import { StorageContext } from 'context/storage.context';

import {
  Container,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { RecipeItemToUpload, Tag, TotalTimeTier } from 'utils/api/api.types';

import {
  difficultyOptions,
  mealsOptions,
  occasions,
  timeOptions,
} from 'utils/constants';

import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

import { StepsProps } from '../nameAndDescription/nameAndDescription';

const countriesOptions = () => {
  countries.registerLocale(enLocale);
  return countries.getNames('en', { select: 'official' });
};

type TagSelections = Tag[];

type Selections = {
  country: string;
  difficulty: string;
  meal: string;
  occasion: string;
};

type RegisteredSelections = {
  country: string;
  difficulty: string;
  meal: string;
  occasion: string;
  time: string;
};

const defaultSelections = {
  country: '',
  difficulty: '',
  meal: '',
  occasion: '',
};

const defaultSelectedTime = {
  display_tier: '',
  tier: '',
};

const Tags: React.FC<StepsProps> = ({ submitStep, setSubmitStep }) => {
  const [selections, setSelections] = useState<Selections>(defaultSelections);
  const [selectedTime, setSelectedTime] =
    useState<TotalTimeTier>(defaultSelectedTime);

  const { setRecipeToUpload, recipeToUpload, setDisplayMessage } =
    useContext(StorageContext);

  const phoneSize = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (recipeToUpload?.tags) {
      let uploadedTags: Selections = defaultSelections;

      recipeToUpload.tags.map((tag) => {
        const { type, display_name: displayName } = tag;

        uploadedTags = { ...uploadedTags, [type]: displayName };
        setSelections(uploadedTags);
      });
    }
    if (recipeToUpload?.total_time_tier) {
      setSelectedTime(recipeToUpload.total_time_tier);
    }
  }, []);

  const registeredTags = useMemo(() => {
    const registeredSelections: any = {};

    if (recipeToUpload?.tags && recipeToUpload.total_time_tier) {
      recipeToUpload.tags.map((item: Tag) => {
        registeredSelections[item.type] = item.display_name;
      });

      registeredSelections.time = recipeToUpload.total_time_tier.display_tier;
      return registeredSelections as RegisteredSelections;
    }

    return {
      country: '',
      difficulty: '',
      meal: '',
      occasion: '',
      time: '',
    };
  }, [recipeToUpload?.tags]);

  const inputStyle = {
    minWidth: phoneSize ? '25rem' : '19rem',
  };

  useEffect(() => {
    if (submitStep.initialized) {
      try {
        const tagsSelections: TagSelections = [];

        Object.entries(selections).map((tag) => {
          const name = tag[0];
          const value = tag[1];

          if (!value || !selectedTime.display_tier) {
            setSubmitStep({ ...submitStep, initialized: false });
            throw new Error('All fields are required.');
          }

          tagsSelections.push({
            display_name: value,
            id: tagsSelections.length,
            name: value.toLowerCase(),
            type: name,
          });
        });

        setRecipeToUpload({
          ...(recipeToUpload as RecipeItemToUpload),
          tags: tagsSelections,
          total_time_tier: selectedTime,
        });

        setSubmitStep({ initialized: false, submitted: true });
      } catch (error) {
        setDisplayMessage((error as Error).message);
      }
    }
  }, [submitStep.initialized]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setSelections({ ...selections, [name]: value });
  };

  const handleTimeSelection = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;

    setSelectedTime({
      display_tier: value,
      tier: value.toLowerCase().replace(/ /g, '_'),
    });
  };

  return (
    <Fragment>
      <Typography variant="h4" sx={{ mb: phoneSize ? '3rem' : '2rem' }}>
        Tags
      </Typography>

      <Container
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5rem',
        }}
      >
        <Container
          sx={{
            flex: '1 1 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: '5rem',
            flexWrap: 'wrap',
          }}
        >
          <TextField
            defaultValue={registeredTags.country}
            id="country"
            label="Select country"
            name="country"
            onChange={handleChange}
            select
            size="small"
            sx={inputStyle}
            value={selections.country}
            variant="filled"
          >
            {Object.entries(countriesOptions()).map((country, index) => (
              <MenuItem key={index} value={country[1]}>
                {country[1]}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            defaultValue={registeredTags.meal}
            id="meal"
            label="Select Meal"
            name="meal"
            onChange={handleChange}
            select
            size="small"
            sx={inputStyle}
            value={selections.meal}
            variant="filled"
          >
            {mealsOptions.map((meal, index) => (
              <MenuItem key={index} value={meal}>
                {meal}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            defaultValue={registeredTags.difficulty}
            id="difficulty"
            label="Difficulty"
            name="difficulty"
            onChange={handleChange}
            select
            size="small"
            sx={inputStyle}
            value={selections.difficulty}
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
            defaultValue={registeredTags.time}
            id="time"
            label="Select time"
            name="time"
            onChange={handleTimeSelection}
            select
            size="small"
            sx={inputStyle}
            value={selectedTime.display_tier}
            variant="filled"
          >
            {' '}
            {timeOptions.map((timeOption, index) => (
              <MenuItem key={index} value={timeOption}>
                {timeOption}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            defaultValue={registeredTags.occasion}
            id="occasion"
            label="Occasion"
            name="occasion"
            onChange={handleChange}
            select
            size="small"
            sx={inputStyle}
            value={selections.occasion}
            variant="filled"
          >
            {' '}
            {occasions.map((occasion, index) => (
              <MenuItem key={index} value={occasion}>
                {occasion}
              </MenuItem>
            ))}
          </TextField>
        </Container>
      </Container>
    </Fragment>
  );
};

export default Tags;
