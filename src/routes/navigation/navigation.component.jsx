import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import Loading from "react-loading";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import logoIcon from "../../assets/img/logo-icon.png";
import { ReactComponent as HeartIcon } from "../../assets/icons/SVG/heart.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/SVG/user.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/SVG/search.svg";
import "./navigation.styles.scss";

const Navigation = () => {
  const navigate = useNavigate();
  const { currentUser, userIsLoading } = useContext(UserContext);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userMenu = useRef(null);

  useEffect(() => {
    if (isUserDropdownOpen) {
      return setIsUserDropdownOpen(false);
    }
  }, []);

  const toggleUserMenu = () => {
    if (!isUserDropdownOpen) {
      return setIsUserDropdownOpen(true);
    } else {
      return setIsUserDropdownOpen(false);
    }
  };

  const closeUserMenu = (event) => {
    if (isUserDropdownOpen && !userMenu.current?.contains(event.target)) {
      setIsUserDropdownOpen(false);
    }
  };
  document.addEventListener("mousedown", closeUserMenu);

  const returnHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="nav">
        <button onClick={returnHome} className="logo">
          <img src={logoIcon} alt="Logo" className="icon" />
        </button>

        {userIsLoading ? (
          <Loading type="spin" color="#000" className="loading" />
        ) : currentUser ? (
          <div className="main">
            <div className="search">
              <input
                type="text"
                placeholder="food or main ingredient"
                className="input"
              />
              <SearchIcon className="icon" />
            </div>

            <div className="saved-items">
              <HeartIcon className="heart-icon" />
              <span className="items-num">2</span>
            </div>

            <div className="user" ref={userMenu}>
              <button id="user_btn" onClick={toggleUserMenu} className="btn">
                {currentUser.userPhotoUrl ? (
                  <div className="icon-box">
                    <img src={currentUser.userPhotoUrl} className="photo" />
                  </div>
                ) : (
                  <div className="icon-box">
                    <UserIcon className="default" />
                  </div>
                )}
                {currentUser.displayName}
              </button>

              {isUserDropdownOpen ? (
                <ul className="list">
                  <li>
                    <a href="/profile/" className="link">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      Stored recipes
                    </a>
                  </li>
                  <li>
                    <button onClick={signOutUser} className="btn">
                      Sign out
                    </button>
                  </li>
                </ul>
              ) : null}
            </div>
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
