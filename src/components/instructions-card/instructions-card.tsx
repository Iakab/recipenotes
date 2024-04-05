import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Instruction } from 'utils/constants';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

type InstructionsCardProps = {
  details: Instruction;
};

const InstructionsCard: React.FC<InstructionsCardProps> = ({ details }) => {
  const [cardAction, setCardAction] = useState('');
  const { action, btnLabel, guidelines, image, title } = details;
  const navigate = useNavigate();

  const handleNavigateToStorage = () => {
    navigate('/storage');
  };

  const handleNavigateToUpload = () => {
    navigate('/upload');
  };

  const handleNavigateToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (cardAction === 'handleNavigateToStorage') {
      handleNavigateToStorage();
    }
    if (cardAction === 'handleNavigateToUpload') {
      handleNavigateToUpload();
    }
    if (cardAction === 'handleNavigateToTop') {
      handleNavigateToTop();
    }
  }, [cardAction]);

  return (
    <>
      {!image ? (
        <Card
          sx={{
            maxWidth: '30rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: '2.5rem' }}>
              {title}
            </Typography>

            {guidelines.map((guideline, index) => (
              <Typography variant="body1" key={index}>
                <ArrowRightIcon fontSize="small" sx={{ mb: '-.3rem' }} />
                {guideline}
              </Typography>
            ))}
          </CardContent>
          <CardActions>
            <Button onClick={() => setCardAction(action)}>{btnLabel}</Button>
          </CardActions>
        </Card>
      ) : (
        <Card sx={{ maxWidth: '30rem' }}>
          <CardActionArea onClick={() => setCardAction(action)}>
            <CardMedia
              alt="notebook"
              component="img"
              height="200"
              image={image}
              sx={{ objectFit: 'cover', objectPosition: 'center' }}
            />

            <CardContent>
              <Typography variant="h6">{title}</Typography>

              {guidelines.map((guideline, index) => (
                <Typography variant="body1" key={index}>
                  <ArrowRightIcon fontSize="small" sx={{ mb: '-.3rem' }} />
                  {guideline}
                </Typography>
              ))}
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

export default InstructionsCard;
