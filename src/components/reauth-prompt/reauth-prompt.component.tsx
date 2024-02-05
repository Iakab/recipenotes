import { useForm } from 'react-hook-form';

import { deleteAccount } from '../../utils/firebase/auth';

import './reauth-prompt.styles.scss';

type ReauthProps = {
  setReauthModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type FieldValue = {
  password: string;
};
const ReauthPrompt: React.FC<ReauthProps> = ({ setReauthModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValue>({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (data: FieldValue) => {
    deleteAccount(data.password);
    setReauthModal(false);
  };

  const onCancel = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      setReauthModal(false);
    }
  };

  return (
    <div className="prompt" onClick={onCancel}>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="password">
          <label htmlFor="reauth">Password:</label>
          <input
            id="reauth"
            className="input"
            type="password"
            {...register('password', { required: 'Password is required!' })}
          />
          {errors.password && (
            <p style={{ color: 'rgb(252, 51, 51)', fontWeight: '600' }}>
              {`*Password: ${errors.password.type}`}
            </p>
          )}
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReauthPrompt;
