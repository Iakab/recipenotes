import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DocumentData } from 'firebase/firestore';

import { FavourtiesContext } from 'context/favourites.context';

import logoIcon from 'assets/img/logo-icon.png';
import { ReactComponent as HeartIcon } from 'assets/icons/SVG/heart.svg';

import UserDropdown from '../user-dropdown/userDropdown.component';
import SearchBar from '../search-bar/search-bar.component';

import './nav-bar.styles.scss';

type NavBar = {
  currentUser: DocumentData | null | undefined;
};

const NavigationBar: React.FC<NavBar> = ({ currentUser }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { favouriteRecipes } = useContext(FavourtiesContext);
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

  useEffect(() => {
    document.addEventListener('mousedown', closeUserMenu);
  }, []);

  const returnHome = () => {
    navigate('/');
  };

  const handleFavourites = () => {
    navigate('/favourites');
  };

  return (
    <div className="nav">
      <button onClick={returnHome} className="logo">
        <img src={logoIcon} alt="Logo" className="icon" />
      </button>

      {currentUser && (
        <div className="main">
          <SearchBar />

          <div className="favorites" onClick={handleFavourites}>
            <HeartIcon className="heart-icon" />

            {favouriteRecipes ? (
              <span className="items-num">{favouriteRecipes.length}</span>
            ) : (
              <span className="items-num">0</span>
            )}
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
