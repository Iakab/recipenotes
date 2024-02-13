import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { DocumentData } from 'firebase/firestore';

import UserDropdown from '../user-dropdown/userDropdown.component';

import logoIcon from '../../assets/img/logo-icon.png';
import { ReactComponent as HeartIcon } from '../../assets/icons/SVG/heart.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/SVG/search.svg';

import './nav-bar.styles.scss';

type NavBar = {
  currentUser: DocumentData | null | undefined;
};

const NavigationBar: React.FC<NavBar> = ({ currentUser }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userMenu = useRef<null | HTMLInputElement>(null);
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const closeUserMenu = (event: MouseEvent) => {
    if (
      isUserDropdownOpen &&
      !userMenu.current?.contains(event.target as Node)
    ) {
      setIsUserDropdownOpen(false);
    }
  };
  document.addEventListener('mousedown', closeUserMenu);

  const returnHome = () => {
    navigate('/');
  };

  return (
    <div className="nav">
      <button onClick={returnHome} className="logo">
        <img src={logoIcon} alt="Logo" className="icon" />
      </button>

      {currentUser && (
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
            <button id="user_btn" onClick={toggleUserMenu} className="btn_user">
              <div className="icon-box">
                <img src={currentUser.userPhotoUrl} className="photo" />
              </div>
              {currentUser.displayName}
            </button>

            {isUserDropdownOpen && <UserDropdown />}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
