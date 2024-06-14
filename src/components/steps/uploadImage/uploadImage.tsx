import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { useUserContext } from 'context/user.context';
import { StorageContext } from 'context/storage.context';

import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { StepsProps } from '../nameAndDescription/nameAndDescription';

const UploadImage: React.FC<StepsProps> = ({ submitStep, setSubmitStep }) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [imgUrl, setImgUrl] = useState<string>();

  const { currentUser } = useUserContext();
  const {
    imgToStore,
    recipeToUpload,
    setDisplayMessage,
    setImgToStore,
    setRecipeToUpload,
  } = useContext(StorageContext);

  const maxTabLandSize = useMediaQuery('(max-width:1200px)');
  const phoneSize = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (imgToStore) {
      const url = URL.createObjectURL(imgToStore);
      setImgUrl(url);
    } else if (recipeToUpload?.thumbnail_url) {
      setImgUrl(recipeToUpload.thumbnail_url);
    }
  }, []);

  useEffect(() => {
    if (submitStep.initialized && currentUser) {
      try {
        if (!file && !imgUrl) {
          setSubmitStep({ ...submitStep, initialized: false });
          throw new Error('Image required');
        }
        const recipeId = recipeToUpload?.id || Date.now().toString();

        setImgToStore(file);
        setRecipeToUpload({
          ...recipeToUpload,
          id: recipeId,
        });
        setSubmitStep({ initialized: false, submitted: true });
      } catch (error) {
        setDisplayMessage((error as Error).message);
      }
    }
  }, [submitStep.initialized]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];

    const url = URL.createObjectURL(droppedFile);

    setImgUrl(url);
    setFile(droppedFile);
    setDragging(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      const url = URL.createObjectURL(selectedFile);

      setImgUrl(url);
      setFile(selectedFile);
    }
  };

  const handleFileSelect = () => {
    document?.getElementById('fileInput')?.click();
  };

  const handleResetImgFile = () => {
    setImgUrl(undefined);
    setFile(undefined);
  };

  return (
    <>
      <Typography variant="h4">Upload an image</Typography>

      <Paper
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={
          phoneSize
            ? {
                width: '80vw',
                minHeight: '50vh',
                textAlign: 'center',
                backgroundColor: dragging ? '#f0f0f0' : '#fff',
                border: dragging ? '2px dashed #3f51b5' : '2px dashed #ccc',
                position: 'relative',
                margin: '5rem auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }
            : {
                minWidth: maxTabLandSize ? '95%' : '50%',
                minHeight: '65%',
                textAlign: 'center',
                backgroundColor: dragging ? '#f0f0f0' : '#fff',
                border: dragging ? '2px dashed #3f51b5' : '2px dashed #ccc',
                position: 'relative',
                margin: '2rem auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }
        }
      >
        {imgUrl ? (
          <>
            <IconButton
              sx={{ position: 'absolute', top: '2px', right: '2px' }}
              onClick={handleResetImgFile}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="body1">
              {file?.name || imgToStore?.name}
            </Typography>
            <img
              src={imgUrl}
              style={{
                height: '40vh',
                maxHeight: '35rem',
                maxWidth: '40rem',
                margin: '2rem 0 2rem',
              }}
            />
          </>
        ) : (
          <Box>
            <Typography variant="body1" gutterBottom>
              Drag & Drop your photo here or
            </Typography>
            <input
              id="fileInput"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileSelect}
            >
              Select Photo
            </Button>
          </Box>
        )}
      </Paper>
    </>
  );
};

export default UploadImage;
