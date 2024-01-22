import { useState } from "react";

import {
  signInAuthWithUserAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = ({ setDisplaySignIn, setShowPasswordReset }) => {
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
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Wrong email or password.");
      }
      console.log(error);
    }
  };

  return (
    <div className="sign-in">
      <h2 className="form-title">Sign in</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={handleChange}
            className="input"
          ></input>
          <label htmlFor="email" className="label">
            Email
          </label>
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            minLength={6}
            required
            name="password"
            value={password}
            onChange={handleChange}
            className="input"
          ></input>
          <label htmlFor="password" className="label">
            Password
          </label>
        </div>

        <button type="submit" className="btn">
          Sign in
        </button>
      </form>

      <span className="span">
        Forgot your password?{" "}
        <button onClick={() => setShowPasswordReset(true)} className="btn-text">
          Reset password
        </button>
      </span>

      <span className="span-1">or</span>

      <button
        type="googleButton"
        onClick={signInWithGoogle}
        className="btn btn-google"
      >
        Sign in with Google
      </button>

      <div className="path">
        <span className="span">Don't have an account?</span>
        <button className="btn-text" onClick={() => setDisplaySignIn(false)}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
