import { Routes, Route } from 'react-router-dom';

import Authentication from './routes/authentication/authentication.component';
import Favourites from './routes/favourites/favourites.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Profile from './routes/profile/profile.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/auth" element={<Authentication />} />
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favourites" element={<Favourites />} />
      </Route>
    </Routes>
  );
}

export default App;
