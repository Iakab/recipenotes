import { useState } from "react";

import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import "./authentication.styles.scss";

const defaultDisplaySignIn = {
  signIn: true,
};

const Authentication = () => {
  const [displaySignIn, setDisplaySignIn] = useState(defaultDisplaySignIn);

  return (
    <div className="auth">
      <div className="auth__header">
        <h2>Header</h2>
      </div>

      <div className="auth__body">
        <div className="auth__body__app-description">
          <h3>&#8250; Access to over 365,000 recipes!</h3>
          <h3>&#8250; Share your own recipes!</h3>
          <h3>&#8250; Save and customize your favourite recipes!</h3>
        </div>

        <div className="auth__body__form-container">
          <div className="auth__body__form-container__background" />
          {displaySignIn.signIn ? (
            <SignInForm setDisplaySignIn={setDisplaySignIn} />
          ) : (
            <SignUpForm setDisplaySignIn={setDisplaySignIn} />
          )}
        </div>
      </div>

      <div className="auth__footer">
        <div className="auth__footer__details">
          <a href="#" className="auth__footer__details__item">
            <span>CONTACT US</span>
          </a>
          <a href="#" className="auth__footer__details__item">
            <span>PRIVACY POLICY</span>
          </a>
          <a href="#" className="auth__footer__details__item">
            <span>TERMS</span>
          </a>
        </div>

        <h3 className="auth__footer__logo">logo</h3>

        <div className="auth__footer__credit">
        &copy; 2024 by Iakab Fineas. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Authentication;
