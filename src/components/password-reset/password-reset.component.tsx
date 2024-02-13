import { useForm } from 'react-hook-form';

import { resetPassword } from '../../utils/firebase/auth';

import { ReactComponent as CancelIcon } from '../../assets/icons/SVG/cross.svg';
import './password-reset.styles.scss';

type SetPasswordReset = {
  setPasswordReset: React.Dispatch<React.SetStateAction<boolean>>;
};
type FormValues = {
  email: string;
};

const PasswordReset:React.FC<SetPasswordReset> = ({ setPasswordReset }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const cancelAction = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(event.target === event.currentTarget) {
      setPasswordReset(false)
    }
  }

  return (
    <div className="password-reset" onClick={cancelAction}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <button type="button" className="cancel-btn">
          <CancelIcon
            onClick={() => setPasswordReset(false)}
            className="cancel-icon"
          />
        </button>
        <h3>Request password reset</h3>

        <h4>Your email:</h4>
        <input
          type="email"
          className="input"
          {...register('email', { required: true })}
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
