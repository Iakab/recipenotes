import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import logoIcon from '../../assets/img/logo-icon.png'
import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <div className="nav-bar">

        <img src={logoIcon} alt='Logo' className="nav-bar__logo-icon"/>
        {currentUser ? (
          <div>
            <button onClick={signOutUser}>Sign out</button>
            <Navigate to="/" />
          </div>
        ) : (
          <Navigate to="/auth" />
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
