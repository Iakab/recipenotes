import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <div className="nav-bar">
        <div>
          <h3 className="">logo</h3>
        </div>
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
