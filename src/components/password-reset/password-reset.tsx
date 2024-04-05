import { useForm } from 'react-hook-form';

import { resetPassword } from 'utils/firebase/auth';

import { ReactComponent as CancelIcon } from 'assets/icons/SVG/cross.svg';
import './password-reset.scss';

type SetPasswordReset = {
  setPasswordReset: React.Dispatch<React.SetStateAction<boolean>>;
};
type FormValues = {
  email: string;
};

const PasswordReset: React.FC<SetPasswordReset> = ({ setPasswordReset }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    const { email } = data;

    resetPassword(email);
    setPasswordReset(false);
  };

  const cancelAction = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      setPasswordReset(false);
    }
  };

  return (
    <div className="password-reset" onClick={cancelAction}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <button type="button" className="cancel-btn">
          <CancelIcon
            className="cancel-icon"
            onClick={() => setPasswordReset(false)}
          />
        </button>
        <h3>Request password reset</h3>

        <label htmlFor="passwordReset">Your email:</label>
        <input
          id="passwordReset"
          {...register('email', { required: true })}
          className="input"
          type="email"
        ></input>
        {errors.email && (
          <p
            style={{
              color: 'rgb(252, 51, 51)',
              fontWeight: '400',
              marginLeft: '-12rem',
            }}
          >
            {`*Email: ${errors.email.type}`}
          </p>
        )}

        <button type="submit" className="btn">
          Send email
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
