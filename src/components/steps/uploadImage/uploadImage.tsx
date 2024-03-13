import { Fragment, useState } from 'react';

import { Typography } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';

import { Container } from '@mui/system';

import './uploadImage.scss';

const fileTypes = ['JPG', 'PNG'];

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState('');

  const handleImageUpload = (event: any) => {
    setImgUrl(window.URL.createObjectURL(event));

    setFile(event);
  };

  return (
    <Fragment>
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
          handleChange={handleImageUpload}
          name="recipePhoto"
          types={fileTypes}
          required
          classes="drag-and-drop"
        />

        {imgUrl ? (
          <img src={imgUrl} style={{ width: '25rem', height: '25rem' }} />
        ) : (
          <div style={{ width: '25rem', height: '25rem' }}></div>
        )}
      </Container>
    </Fragment>
  );
};

export default UploadImage;
