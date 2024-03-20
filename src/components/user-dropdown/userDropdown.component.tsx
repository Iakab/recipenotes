import { signOutUser } from 'utils/firebase/auth';
import { useUserContext } from 'context/user.context';
import './userDropdown.styles.scss';

const UserDropdown = () => {
  const { currentUser } = useUserContext();

  return (
    <div className="dropdown">
      <h3>{currentUser?.displayName}</h3>

      <ul className="list-user">
        <li>
          <a href="/profile/" className="link">
            Profile
          </a>
        </li>
        <li>
          <a href="/storage" className="link">
            Storage
          </a>
        </li>
        <li>
          <button onClick={signOutUser} className="btn_li">
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
