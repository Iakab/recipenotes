import { useEffect, useState, useContext, FormEvent, ChangeEvent } from "react";
import { UserContext } from "../../context/user.context";

import {
  uploadUserImage,
  getUserImage,
  displayNameIsUnique,
  resetPassword,
  deleteAccount,
} from "../../utils/firebase/firebase.utils";

import { ReactComponent as CameraIcon } from "../../assets/icons/SVG/camera.svg";
import { ReactComponent as PencilIcon } from "../../assets/icons/SVG/create.svg";
import "./profile.styles.scss";

type Field = {
  displayName?: string;
  userBio?: string;
  userPhotoUrl?: string;
};

const Profile = () => {
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [field, setField] = useState<Field | null | undefined>(null);
  const [renderPrompt, setRenderPrompt] = useState(false);
  const [promptPassword, setPromptPassword] = useState("");
  const [submitPrompt, setSubmitPrompt] = useState<
    { password: string } | boolean
  >(false);
  const { currentUser, setUpdateUserDoc } = useContext(UserContext);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    } else {
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

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setField({ ...field, [name]: value });
  };

  const handleBioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.textContent;
    const userBio: string = "userBio";

    setField({ ...field, [userBio]: value });
  };

  const handleSubmit = async () => {
    const updates: Field = {};
    try {
      //UPDATE NAME
      if (!field?.displayName) {
        return;
      }
      if (field.hasOwnProperty("displayName")) {
        if (!(await displayNameIsUnique(field.displayName))) {
          throw new Error("Username already in use");
        }
        updates["displayName"] = field.displayName;
      }

      // //UPDATE BIO
      if (field.hasOwnProperty("userBio")) {
        updates["userBio"] = field.userBio;
      }
      setUpdateUserDoc(updates);
      setShowInput(false);
      setField(null);
    } catch (error) {
      if ((error as Error).message === "Username already in use") {
        alert("Username already in use");
      }
      console.log(error);
    }
  };

  const handleDeleteAccount = () => {
    setRenderPrompt(true);
  };

  useEffect(() => {
    if (submitPrompt) {
      deleteAccount(promptPassword);
      setPromptPassword("");
      setRenderPrompt(false);
    }
  }, [submitPrompt]);

  const handleSubmitPrompt = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.target) {
      setSubmitPrompt(true);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value } = event.target;
    setPromptPassword(value);
  };

  return (
    <div>
      {!currentUser ? null : (
        <div className="profile">
          <div className="header">
            <h1>Your profile</h1>
          </div>

          {!renderPrompt ? null : (
            <div className="prompt">
              <form onSubmit={handleSubmitPrompt} className="form">
                <div className="password">
                  <span>Password:</span>
                  <input
                    type="password"
                    name="password"
                    value={promptPassword}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <button className="btn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          )}
          <div className="body">
            <div className="details">
              <div className="photo">
                <div className="box">
                  <img
                    src={currentUser.userPhotoUrl}
                    alt="Photo"
                    className="preview"
                  />
                  <div className="btn">
                    <input type="file" onChange={handlePhotoChange} />
                    <CameraIcon className="icon" />
                  </div>
                </div>
              </div>

              {!showInput ? (
                <div className="text">
                  <button onClick={() => setShowInput(true)} className="btn">
                    <PencilIcon className="btn-pencil" />
                  </button>

                  <div className="name">
                    <label className="label">Name:</label>

                    <h3 className="username">{currentUser.displayName}</h3>
                  </div>

                  <div className="bio">
                    <label className="label">Bio:</label>
                    {!currentUser.userBio ? (
                      <div className="empty"></div>
                    ) : (
                      <div className="content">
                        <p>{currentUser.userBio}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text">
                  <div className="name">
                    <label className="label">Name:</label>
                    <div className="box">
                      <input
                        type="text"
                        defaultValue={currentUser.displayName}
                        className="input"
                        minLength={4}
                        required
                        autoFocus
                        name="displayName"
                        onChange={handleNameChange}
                      ></input>
                    </div>
                  </div>

                  <div className="bio">
                    <label className="label">Bio:</label>
                    <div>
                      <div
                        id="editableDiv"
                        contentEditable
                        className="input"
                        suppressContentEditableWarning={true}
                        role="textbox"
                        onInput={handleBioChange}
                      >
                        {currentUser.userBio}
                      </div>
                    </div>
                  </div>
                  <button className="btn-update" onClick={handleSubmit}>
                    Save
                  </button>
                </div>
              )}
              <span
                onClick={() => resetPassword(currentUser.email)}
                className="span"
              >
                Change password
              </span>
              <span onClick={handleDeleteAccount} className="span">
                Delete account
              </span>
            </div>
            <div className="activity">
              <h3>activity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
