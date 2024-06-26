import { useForm } from 'react-hook-form';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import {
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
} from '../../utils/firebase/auth';

import './sign-in.scss';

type SignInParams = {
  setDisplaySignIn: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordReset: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
  email: string;
  password: string;
};

const SignIn: React.FC<SignInParams> = ({
  setDisplaySignIn,
  setPasswordReset,
}) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //  Google Sign in
  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EXPIRED_POPUP_REQUEST) {
        console.log('Popup closed by user');
      }
    }
  };

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;
    try {
      await signInAuthWithEmailAndPassword(email, password);
    } catch (error) {
      if (
        (error as AuthError).code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS
      ) {
        alert('Wrong email or password.');
      }
      console.log(error);
    }
  };

  return (
    <div className="sign-in">
      <h2 className="form-title">Sign in</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <input
            {...register('email', { required: 'Email is required' })}
            className="input"
            placeholder="Email"
            type="email"
          ></input>
          {errors.email && (
            <p style={{ color: 'rgb(252, 51, 51)', fontWeight: '600' }}>
              {`*Email: ${errors.email.type}`}
            </p>
          )}
          <label htmlFor="email" className="label">
            Email
          </label>
        </div>

        <div className="field">
          <input
            {...register('password', { required: 'Password is required' })}
            className="input"
            placeholder="Password"
            type="password"
          ></input>
          {errors.password && (
            <p style={{ color: 'rgb(252, 51, 51)', fontWeight: '600' }}>
              {`*Password: ${errors.password.type}`}
            </p>
          )}
          <label htmlFor="password" className="label">
            Password
          </label>
        </div>

        <button type="submit" className="btn">
          Sign in
        </button>
      </form>

      <span className="span">
        Forgot your password?{' '}
        <button onClick={() => setPasswordReset(true)} className="btn-text">
          Reset password
        </button>
      </span>

      <span className="span-1">or</span>
      <button
        className="btn btn-google"
        onClick={signInWithGoogle}
        type="button"
      >
        Sign in with Google
      </button>

      <span className="span">
        Don't have an account?
        <button className="btn-text" onClick={() => setDisplaySignIn(false)}>
          Sign Up
        </button>
      </span>
    </div>
  );
};

export default SignIn;
