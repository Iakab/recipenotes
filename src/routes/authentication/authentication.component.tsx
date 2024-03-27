import { useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { UserContext } from 'context/user.context';

import SignIn from 'components/sign-in/sign-in.component';
import SignUp from 'components/sign-up/sign-up.component';
import PasswordReset from 'components/password-reset/password-reset.component';

import './authentication.styles.scss';

const Authentication = () => {
  const navigate = useNavigate();
  const [displaySignIn, setDisplaySignIn] = useState(true);
  const [passwordReset, setPasswordReset] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  return (
    <div className="auth">
      <div className="header">
        <h1>
          <span className="heading-primary">RecipeNotes</span>
          <span className="heading-secondary">Your source of inspiration</span>
        </h1>
      </div>
      <div className="body">
        <div className="app-description">
          <h3>&#8250; Access to over 365,000 recipes!</h3>
          <h3>&#8250; Share your own recipes!</h3>
          <h3>&#8250; Save and customize your favourite recipes!</h3>
        </div>

        <div className="form-container">
          <div className="background" />
          {displaySignIn ? (
            <SignIn
              setDisplaySignIn={setDisplaySignIn}
              setPasswordReset={setPasswordReset}
            />
          ) : (
            <SignUp setDisplaySignIn={setDisplaySignIn} />
          )}
        </div>

        {passwordReset && <PasswordReset setPasswordReset={setPasswordReset} />}
      </div>
      <Outlet />
    </div>
  );
};

export default Authentication;
