import { useState, useContext, useEffect, ChangeEvent } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { UserContext } from "../../context/user.context";

import { resetPassword } from "../../utils/firebase/firebase.utils";

import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import logo from "../../assets/img/logo.png";

import "./authentication.styles.scss";

const Authentication = () => {
  const [displaySignIn, setDisplaySignIn] = useState(true);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [emailField, setEmailField] = useState("");
  const { currentUser } = useContext(UserContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value } = event.target;
    setEmailField(value);
  };

  const handleSubmit = () => {
    resetPassword(emailField);
    setEmailField("");
    setShowPasswordReset(false);
  };

  return (
    <div>
      {currentUser ? (
        <Navigate to="/" />
      ) : (
        <div className="auth">
          <div className="header">
            <h1>
              <span className="heading-primary">RecipeNotes</span>
              <span className="heading-secondary">
                Your source of inspiration
              </span>
            </h1>
          </div>
          <div className="body-initial">
            {!showPasswordReset ? (
              <div className="body-main">
                <div className="app-description">
                  <h3>&#8250; Access to over 365,000 recipes!</h3>
                  <h3>&#8250; Share your own recipes!</h3>
                  <h3>&#8250; Save and customize your favourite recipes!</h3>
                </div>

                <div className="form-container">
                  <div className="background" />
                  {displaySignIn ? (
                    <SignInForm
                      setDisplaySignIn={setDisplaySignIn}
                      setShowPasswordReset={setShowPasswordReset}
                    />
                  ) : (
                    <SignUpForm setDisplaySignIn={setDisplaySignIn} />
                  )}
                </div>
              </div>
            ) : (
              <div className="body-secondary">
                <div className="form">
                  <h3>Request password reset</h3>

                  <p>Your email:</p>
                  <input
                    type="email"
                    className="input"
                    value={emailField}
                    onChange={handleChange}
                  ></input>
                  <button onClick={handleSubmit} className="btn">
                    Send email
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="footer">
            <div className="details">
              <a href="#" className="item">
                <span>CONTACT US</span>
              </a>
              <a href="#" className="item">
                <span>PRIVACY POLICY</span>
              </a>
              <a href="#" className="item">
                <span>TERMS</span>
              </a>
            </div>

            <img src={logo} alt="Logo" className="logo" />

            <div className="credit">
              &copy; 2024 by Iakab Fineas. All rights reserved.
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default Authentication;
