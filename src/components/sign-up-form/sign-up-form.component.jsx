import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFormAuth,
  displayNameIsUnique,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = ({ setDisplaySignIn }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw new Error(`Passwords don't match`);
      }
      if (!(await displayNameIsUnique(displayName))) {
        throw new Error("Username already in use");
      }

      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      createUserDocumentFormAuth(user, { displayName });

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use!");
      }
      if (error.message === "Username already in use") {
        alert("Username already in use");
      }
      console.log(error);
    }
  };

  const switchForms = () => {
    setDisplaySignIn({
      signIn: true,
    });
  };

  return (
    <div className="sign-up">
      <h2 className="sign-up__form-title">Sign Up</h2>
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <div className="sign-up__form__field">
          <input
            type="text"
            placeholder="Name"
            required
            name="displayName"
            value={displayName}
            onChange={handleChange}
            className="sign-up__form__field__input"
          ></input>
          <label htmlFor='name' className="sign-up__form__field__label">Name</label>
        </div>

        <div className="sign-up__form__field">
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={handleChange}
            className="sign-up__form__field__input"
          ></input>
          <label htmlFor='email' className="sign-up__form__field__label">Email</label>
        </div>

        <div className="sign-up__form__field">
          <input
            type="password"
            placeholder="Password"
            minLength={6}
            required
            name="password"
            value={password}
            onChange={handleChange}
            className="sign-up__form__field__input"
          ></input>
          <label htmlFor='password' className="sign-up__form__field__label">Password</label>
        </div>

        <div className="sign-up__form__field">
          <input
            type="password"
            placeholder="Confirm password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="sign-up__form__field__input"
          ></input>
          <label htmlFor='confirmPassword' className="sign-up__form__field__label">Confirm password</label>
        </div>

        <button type="submit" className="sign-up__btn sign-up__btn-submit">
          Submit
        </button>
      </form>

      <div className="sign-up__path">
        <span className="sign-up__span">Already have an account?</span>
        <button onClick={switchForms} className="sign-up__path__btn-text">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
