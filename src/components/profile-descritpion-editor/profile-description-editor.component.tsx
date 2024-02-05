import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { displayNameIsUnique } from '../../utils/firebase/db';
import { UserContext } from '../../context/user.context';

import './profile-description-editor.styles.scss';

type FieldValue = {
  displayName?: string;
  userBio?: string;
};

type ProfileEditProps = {
  setShowInputFields: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileDescriptionEditor = ({ setShowInputFields }: ProfileEditProps) => {
  const { currentUser, setUpdateUserDoc } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValue>({
    defaultValues: {
      displayName: currentUser?.displayName,
      userBio: currentUser?.userBio,
    },
  });

  const onSubmit = async (data: FieldValue) => {
    try {
      if (data.displayName && data.displayName !== currentUser?.displayName) {
        if (!(await displayNameIsUnique(data.displayName))) {
          throw new Error('Username already in use');
        }
      }

      setUpdateUserDoc(data);
      setShowInputFields(false);
    } catch (error) {
      if ((error as Error).message === 'Username already in use') {
        alert('Username already in use');
      }
      console.log(error);
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
      <label className="label">Name:</label>
      <input
        type="text"
        autoFocus
        {...register('displayName', { minLength: 4 })}
        className="input"
      ></input>
      {errors.displayName && (
        <p style={{ color: 'rgb(252, 51, 51)', fontWeight: '600' }}>
          {`*Password: ${errors.displayName.type}`}
        </p>
      )}

      <label className="label">Bio:</label>
      <textarea
        id="bio-input"
        className=" input input-bio"
        {...register('userBio')}
      ></textarea>

      <button type="submit" className="btn-update">
        Save
      </button>
    </form>
  );
};

export default ProfileDescriptionEditor;
