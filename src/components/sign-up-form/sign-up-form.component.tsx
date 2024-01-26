import { useState, ChangeEvent, FormEvent } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFormAuth,
  displayNameIsUnique,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type SetDisplaySignIn = {
  setDisplaySignIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpForm = ({ setDisplaySignIn }: SetDisplaySignIn) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      if (
        (error as AuthError).code === AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE
      ) {
        alert("Email already in use!");
      }
      if ((error as Error).message === "Username already in use") {
        alert("Username already in use");
      }
      console.log(error);
    }
  };

  return (
    <div className="sign-up">
      <h2 className="form-title">Sign Up</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            required
            name="displayName"
            value={displayName}
            onChange={handleChange}
            className="input"
          ></input>
          <label htmlFor="name" className="label">
            Name
          </label>
        </div>

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

        <div className="field">
          <input
            type="password"
            placeholder="Confirm password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="input"
          ></input>
          <label htmlFor="confirmPassword" className="label">
            Confirm password
          </label>
        </div>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>

      <div className="path">
        <span className="span">Already have an account?</span>
        <button onClick={() => setDisplaySignIn(true)} className="btn-text">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
