import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import logoIcon from "../../assets/img/logo-icon.png";
import { ReactComponent as HeartIcon } from "../../assets/icons/SVG/heart.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/SVG/user.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/SVG/search.svg";
import "./navigation.styles.scss";

const defaultIsUserDropdownOpen = false;

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(
    defaultIsUserDropdownOpen
  );

  useEffect(() => {
    if (isUserDropdownOpen) {
      return setIsUserDropdownOpen(false);
    }
  }, []);

  const toggleUserBox = () => {
    if (!isUserDropdownOpen) {
      return setIsUserDropdownOpen(true);
    } else {
      return setIsUserDropdownOpen(false);
    }
  };

  return (
    <div>
      <div className="nav">
        <img src={logoIcon} alt="Logo" className="nav__logo-icon" />
        {currentUser ? (
          <div className="nav--main">
            {/* ///// SEARCH BOX /////*/}
            <div className="nav--main__search">
              {/* <div className="nav--main__search__box"> */}

              <input type="text" placeholder="food or main incredient" className="nav--main__search__input" />
              <SearchIcon className="nav--main__search__icon" />
              {/* </div> */}
            </div>

            {/* /// HEART ICON ///*/}
            <div className="nav--main__saved-items">
              <HeartIcon className="nav--main__saved-items__heart-icon" />
              <span className="nav--main__saved-items__items-num">2</span>
            </div>

            {/* /// PROFILE ///*/}
            <div className="nav--main__user">
              <button
                id="user_btn"
                onClick={toggleUserBox}
                className="nav--main__user__btn"
              >
                <div className="nav--main__user__btn__icon-box">
                  <UserIcon className="nav--main__user__btn__icon-box--default" />
                </div>
                {currentUser.displayName}
              </button>

              {isUserDropdownOpen ? (
                <label htmlFor="user_btn" className="nav--main__user__label">
                  <ul className="nav--main__user__label__list">
                    <li>
                      <a href="/auth" className="nav--main__user__label__list__link">Profile</a>
                    </li>
                    <li>
                      <a href="/auth" className="nav--main__user__label__list__link">Stored recipes</a>
                    </li>
                    <li>
                      <button onClick={signOutUser} className="nav--main__user__label__list__btn">Sign out</button>
                    </li>
                  </ul>
                </label>
              ) : (
                <div></div>
              )}
            </div>
            {/* <button onClick={signOutUser}>Sign out</button> */}

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
