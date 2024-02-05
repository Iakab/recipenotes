import { signOutUser } from '../../utils/firebase/auth';

import './userDropdown.styles.scss';

const UserDropdown = () => (
  <div>
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
        <button onClick={signOutUser} className="btn_li">
          Sign out
        </button>
      </li>
    </ul>
  </div>
);

export default UserDropdown;
