import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { displayNameIsUnique } from 'utils/firebase/db';
import { UserContext } from 'context/user.context';

import './profile-description-editor.scss';

type FieldValue = {
  displayName?: string;
  userBio?: string;
};

type ProfileEditProps = {
  setShowInputFields: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileDescriptionEditor: React.FC<ProfileEditProps> = ({
  setShowInputFields,
}) => {
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
        {...register('displayName', { minLength: 4 })}
        autoFocus
        className="input"
        type="text"
      ></input>
      {errors.displayName && (
        <p style={{ color: 'rgb(252, 51, 51)', fontWeight: '600' }}>
          {`*Password: ${errors.displayName.type}`}
        </p>
      )}

      <label className="label">Bio:</label>
      <textarea
        {...register('userBio')}
        className=" input input-bio"
        id="bio-input"
      ></textarea>

      <button type="submit" className="btn-update">
        Save
      </button>
    </form>
  );
};

export default ProfileDescriptionEditor;
