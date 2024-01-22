import { useContext } from 'react';

import { UserContext } from '../../context/user.context';

import './home.styles.scss';
import userEvent from '@testing-library/user-event';




const Home = () => {
  const {currentUser} = useContext(UserContext)


  return(
    <div className="home">
      <h2>HOME page</h2>
      
    </div>
  )
}

export default Home;