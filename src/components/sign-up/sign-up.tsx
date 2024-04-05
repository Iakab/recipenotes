import { useForm } from 'react-hook-form';

import { AuthError, AuthErrorCodes } from 'firebase/auth';

import { createAuthUserWithEmailAndPassword } from 'utils/firebase/auth';

import {
  createUserDocumentFormAuth,
  displayNameIsUnique,
} from 'utils/firebase/db';

import './sign-up.scss';

type SignUpProps = {
  setDisplaySignIn: React.Dispatch<React.SetStateAction<boolean>>;
};
type FormValues = {
  confirmPassword: string;
  displayName: string;
  email: string;
  password: string;
};

const SignUpForm: React.FC<SignUpProps> = ({ setDisplaySignIn }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      displayName: '',
      email: '',
      password: '',
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
            {...register('displayName', { required: true })}
            className="input"
            id="name"
            placeholder="Name"
            type="text"
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
            {...register('email', { required: 'Email is required' })}
            className="input"
            id="email"
            placeholder="Email"
            type="email"
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
            {...register('password', {
              required: 'password is required',
              minLength: 6,
            })}
            className="input"
            id="password"
            placeholder="Password"
            type="password"
          ></input>
          {errors.password?.type === 'minLength' && (
            <p style={{ color: 'rgb(252, 51, 51)', fontWeight: '600' }}>
              {`*Password: min-length: 6`}
            </p>
          )}
          <label htmlFor="password" className="label">
            Password:
          </label>
        </div>

        <div className="field">
          <input
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              minLength: 6,
            })}
            className="input"
            id="confirmPassword"
            placeholder="Confirm password"
            type="password"
          ></input>
          {errors.password?.type === 'minLength' && (
            <p style={{ color: 'rgb(252, 51, 51)', fontWeight: '600' }}>
              {`*Password: min-length: 6`}
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
