import { useState, useContext } from "react";
import { UserContext } from "../../context/user.context";

import {
  signInAuthWithUserAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = ({ setDisplaySignIn }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  //set form fields
  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  //Google Sign in
  const signInWithGoogle = async (event) => {
    event.preventDefault();

    try {
      await signInWithGooglePopup();
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.log("Popup closed by user");
      }
    }
  };

  //Sign in
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthWithUserAndPassword(email, password);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Wrong email or password.");
      }
      console.log(error);
    }
    resetFormFields();
  };

  const switchForms = () => {
    setDisplaySignIn({ signIn: false });
  };

  return (
    <div className="sign-in">
      <h2 className="sign-in__form-title">Sign in</h2>
      <form className="sign-in__form" onSubmit={handleSubmit}>
        <div className="sign-in__form__field">
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={handleChange}
            className="sign-in__form__field__input"
          ></input>
          <label htmlFor='email' className="sign-in__form__field__label">Email</label>
        </div>
        <div className="sign-in__form__field">
          <input
            type="password"
            placeholder="Password"
            minLength={6}
            required
            name="password"
            value={password}
            onChange={handleChange}
            className="sign-in__form__field__input"
          ></input>
          <label htmlFor='password' className="sign-in__form__field__label">Password</label>
        </div>

        <button type="submit" className="sign-in__btn sign-in__btn-submit">
          Submit
        </button>
      </form>

      <span className="sign-in__span sign-in__span-1">or</span>

      <button
        type="googleButton"
        onClick={signInWithGoogle}
        className="sign-in__btn sign-in__btn-google"
      >
        Sign in with Google
      </button>

      <div className="sign-in__path">
        <span className="sign-in__span">Don't have an account?</span>
        <button className="sign-in__path__btn-text" onClick={switchForms}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
