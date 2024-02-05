import { useEffect, useState, useContext, FormEvent, ChangeEvent } from 'react';

import { UserContext } from '../../context/user.context';

import { uploadUserImage, getUserImage } from '../../utils/firebase/storage';

import { resetPassword, deleteAccount } from '../../utils/firebase/auth';

import ProfileDescriptionEditor from '../../components/profile-descritpion-editor/profile-description-editor.component';
import ReauthPrompt from '../../components/reauth-prompt/reauth-prompt.component';

import { ReactComponent as CameraIcon } from '../../assets/icons/SVG/camera.svg';
import { ReactComponent as PencilIcon } from '../../assets/icons/SVG/create.svg';
import './profile.styles.scss';

const Profile = () => {
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [showInputFields, setShowInputFields] = useState(false);

  const [reauthModal, setReauthModal] = useState(false);

  const { currentUser, setUpdateUserDoc } = useContext(UserContext);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUserPhoto(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (userPhoto && currentUser) {
      const handleUpload = async () => {
        try {
          await uploadUserImage(userPhoto, currentUser.userUid);
          const userPhotoUrl = await getUserImage(currentUser.userUid);
          if (!userPhotoUrl) return;
          setUpdateUserDoc({ [userPhotoUrl]: userPhotoUrl });
        } catch (error) {
          console.log(error);
        }
      };
      handleUpload();
    }
  }, [userPhoto]);

  return (
    <div className="profile">
      <div className="header">
        <h1>Your profile</h1>
      </div>

      <div className="body">
        <div className="details">
          <div className="photo">
            <div className="box">
              <img
                src={currentUser?.userPhotoUrl}
                alt="Photo"
                className="preview"
              />
              <div className="btn">
                <input type="file" onChange={handlePhotoChange} />
                <CameraIcon className="icon" />
              </div>
            </div>
          </div>

          {!showInputFields ? (
            <div className="preview">
              <div className="text">
                <button
                  onClick={() => setShowInputFields(true)}
                  className="btn"
                >
                  <PencilIcon className="btn-pencil" />
                </button>

                <div className="name">
                  <label className="label">Name:</label>

                  <h3 className="username">{currentUser?.displayName}</h3>
                </div>

                <div className="bio">
                  <label className="label">Bio:</label>
                  {currentUser?.userBio && (
                    <div className="content">
                      <p>{currentUser?.userBio}</p>
                    </div>
                  )}
                </div>
              </div>
              <span
                onClick={() => resetPassword(currentUser?.email)}
                className="span"
              >
                Change password
              </span>
              <span
                onClick={() => setReauthModal(!reauthModal)}
                className="span"
              >
                Delete account
              </span>
            </div>
          ) : (
            <ProfileDescriptionEditor setShowInputFields={setShowInputFields} />
          )}
        </div>
        {reauthModal && <ReauthPrompt setReauthModal={setReauthModal} />}
        <div className="activity">
          <h3>activity</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
