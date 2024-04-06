import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { StorageContext } from 'context/storage.context';
import { UserContext } from 'context/user.context';

import Footer from 'components/footer/footer';
import Loading from 'react-loading';
import NavigationBar from 'components/nav-bar/nav-bar';

import { Box, IconButton, Snackbar } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import './navigation.scss';

const Navigation = () => {
  const { currentUser, userIsLoading } = useContext(UserContext);
  const { displayMessage, setDisplayMessage } = useContext(StorageContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userIsLoading && !currentUser) {
      navigate('/auth');
    }
  }, [currentUser, userIsLoading]);

  const handleCloseMessage = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setDisplayMessage(undefined);
  };

  const messageAction = (
    <IconButton
      aria-label="close"
      color="inherit"
      onClick={handleCloseMessage}
      size="small"
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div className="navigation">
      {userIsLoading ? (
        <Loading type="spin" color="#000" className="loading" />
      ) : (
        <div className="page-content">
          <NavigationBar currentUser={currentUser} />
          {displayMessage && (
            <Box sx={{ width: 500, bgcolor: 'red' }}>
              <Snackbar
                action={messageAction}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={4000}
                message={(displayMessage as Error).message}
                onClose={handleCloseMessage}
                open={true}
              />
            </Box>
          )}
          <Outlet />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Navigation;
