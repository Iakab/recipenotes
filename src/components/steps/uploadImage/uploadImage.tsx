import { useContext, useEffect, useState } from 'react';

import { useUserContext } from 'context/user.context';
import { StorageContext } from 'context/storage.context';

import { Container, Typography } from '@mui/material';

import { FileUploader } from 'react-drag-drop-files';

import { StepsProps } from '../nameAndDescription/nameAndDescription';

import './uploadImage.scss';

const fileTypes = ['JPG', 'PNG'];

const UploadImage: React.FC<StepsProps> = ({ submitStep, setSubmitStep }) => {
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

  const handleImageUpload = (event: File) => {
    const url = URL.createObjectURL(event);
    setImgUrl(url);

    setFile(event);
  };

  useEffect(() => {
    if (imgToStore) {
      const url = URL.createObjectURL(imgToStore);
      setImgUrl(url);
    } else if (recipeToUpload?.thumbnail_url) {
      setImgUrl(recipeToUpload.thumbnail_url);
    }
  }, []);

  useEffect(() => {
    if (submitStep.initialized) {
      try {
        if (!file && !imgToStore) {
          setSubmitStep({ ...submitStep, initialized: false });
          throw new Error('Image required');
        }

        if (currentUser) {
          const handleUpload = async () => {
            try {
              const recipeId = recipeToUpload?.id || Date.now().toString();

              // TODO: create input for credit
              const credits = [
                { name: currentUser.displayName, type: 'internal' },
              ];

              if (file) {
                setImgToStore(file);
              }

              setRecipeToUpload({
                ...recipeToUpload,
                id: recipeId,
                credits,
              });
            } catch (error) {
              console.log(error);
            }
          };
          handleUpload();
        }

        setSubmitStep({ initialized: false, submitted: true });
      } catch (error) {
        setDisplayMessage((error as Error).message);
      }
    }
  }, [submitStep.initialized]);

  return (
    <>
      <Typography variant="h4">Upload an image</Typography>

      <Container
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <FileUploader
          classes="drag-and-drop"
          handleChange={handleImageUpload}
          name="recipePhoto"
          required
          types={fileTypes}
        />

        {imgUrl ? (
          <img src={imgUrl} style={{ width: '25rem', height: '25rem' }} />
        ) : (
          <div style={{ width: '25rem', height: '25rem' }}></div>
        )}
      </Container>
    </>
  );
};

export default UploadImage;
