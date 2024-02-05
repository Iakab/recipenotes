import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import { AuthError, AuthErrorCodes } from 'firebase/auth';

import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/auth';

import {
  createUserDocumentFormAuth,
  displayNameIsUnique,
} from '../../utils/firebase/db';

import './sign-up.styles.scss';

type SetDisplaySignIn = {
  setDisplaySignIn: React.Dispatch<React.SetStateAction<boolean>>;
};
type FormValues = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = ({ setDisplaySignIn }: SetDisplaySignIn) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { displayName, email, password, confirmPassword } = data;
    try {
      if (password !== confirmPassword) {
        throw new Error(`Passwords don't match`);
      }

      if (!(await displayNameIsUnique(displayName))) {
        throw new Error('Username already in use');
      }

      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
      );
      await createUserDocumentFormAuth(user, { displayName });
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Email already in use!');
      }
      if ((error as Error).message === 'Username already in use') {
        alert('Username already in use');
      }
      if ((error as Error).message === `Passwords don't match`) {
        alert(`Passwords don't match`);
      }
      console.log(error);
    }
  };

  return (
    <div className="sign-up">
      <h2 className="form-title">Sign Up</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <input
            id="name"
            type="text"
            placeholder="Name"
            {...register('displayName', { required: true })}
            className="input"
          ></input>
          {errors.displayName && (
            <p style={{ color: 'rgb(252, 51, 51)', fontWeight: '600' }}>
              {`*Name: ${errors.displayName.type}`}
            </p>
          )}
          <label htmlFor="name" className="label">
            Name:
          </label>
        </div>

        <div className="field">
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
            className="input"
          ></input>
          {errors.email && (
            <p style={{ color: 'rgb(252, 51, 51)', fontWeight: '600' }}>
              {`*Email: ${errors.email.type}`}
            </p>
          )}
          <label htmlFor="email" className="label">
            Email:
          </label>
        </div>

        <div className="field">
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'password is required',
              minLength: 6,
            })}
            className="input"
          ></input>
          {errors.password && (
            <p style={{ color: 'rgb(252, 51, 51)', fontWeight: '600' }}>
              {`*Password: ${errors.password.type}`}
            </p>
          )}
          <label htmlFor="password" className="label">
            Password:
          </label>
        </div>

        <div className="field">
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              minLength: 6,
            })}
            className="input"
          ></input>
          {errors.confirmPassword && (
            <p style={{ color: 'rgb(252, 51, 51)', fontWeight: '600' }}>
              {`*Confirm password: ${errors.confirmPassword.type}`}
            </p>
          )}
          <label htmlFor="confirmPassword" className="label">
            Confirm password:
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
