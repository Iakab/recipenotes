import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from 'context/user.context';

import { uploadImage, getImage } from 'utils/firebase/storage';

import { resetPassword } from 'utils/firebase/auth';

import ProfileDescriptionEditor from 'components/profile-descritpion-editor/profile-description-editor';
import ReauthPrompt from 'components/reauth-prompt/reauth-prompt';

import { ReactComponent as CameraIcon } from 'assets/icons/SVG/camera.svg';
import { ReactComponent as PencilIcon } from 'assets/icons/SVG/create.svg';
import './profile.scss';

const Profile = () => {
  const [userPhoto, setUserPhoto] = useState<File>();
  const [showInputFields, setShowInputFields] = useState(false);
  const navigate = useNavigate();

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
          await uploadImage(userPhoto, currentUser.userUid, 'profile');
          const userPhotoUrl = await getImage(
            `images/${currentUser.userUid}/profile`,
          );
          const name = 'userPhotoUrl';

          setUpdateUserDoc({ [name]: userPhotoUrl });
        } catch (error) {
          console.log(error);
        }
      };
      handleUpload();
    }
  }, [userPhoto]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
  });

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
                alt="Photo"
                className="preview"
                src={currentUser?.userPhotoUrl}
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
                  className="btn"
                  onClick={() => setShowInputFields(true)}
                >
                  <PencilIcon className="btn-pencil" />
                </button>

                <div className="name">
                  <label className="label">Name:</label>

                  <h3 className="username">{currentUser?.displayName}</h3>
                </div>

                <>
                  <label className="label">Bio:</label>
                  {currentUser?.userBio && (
                    <div className="content">
                      <p>{currentUser?.userBio}</p>
                    </div>
                  )}
                </>
              </div>
              <span
                onClick={() => resetPassword(currentUser?.email)}
                className="span"
              >
                Change password
              </span>
              <span
                className="span"
                onClick={() => setReauthModal(!reauthModal)}
              >
                Delete account
              </span>
            </div>
          ) : (
            <ProfileDescriptionEditor setShowInputFields={setShowInputFields} />
          )}
        </div>
        {reauthModal && <ReauthPrompt setReauthModal={setReauthModal} />}
        <div className="activity">{/* <h3>activity</h3> */}</div>
      </div>
    </div>
  );
};

export default Profile;
