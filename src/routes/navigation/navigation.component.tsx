import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Loading from 'react-loading';

import { UserContext } from 'context/user.context';

import NavigationBar from 'components/nav-bar/nav-bar.component';

import './navigation.styles.scss';
import Footer from 'components/footer/footer.component';

const Navigation = () => {
  const { currentUser, userIsLoading } = useContext(UserContext);


  const navigate = useNavigate();

  useEffect(() => {
    if (!userIsLoading && !currentUser) {
      navigate('/auth');
    }
  }, [currentUser]);


  return (
    <div className="navigation">
      {userIsLoading ? (
        <Loading type="spin" color="#000" className="loading" />
      ) : (
        <div>
          <NavigationBar currentUser={currentUser} />
          <Outlet />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Navigation;
