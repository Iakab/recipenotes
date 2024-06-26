import { Routes, Route } from 'react-router-dom';

import UploadRecipe from 'routes/upload/upload';
import Storage from 'routes/storage/storage';
import Authentication from './routes/authentication/authentication';
import Favourites from './routes/favourites/favourites';
import Home from './routes/home/home';
import Navigation from './routes/navigation/navigation';
import Profile from './routes/profile/profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/auth" element={<Authentication />} />
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/upload" element={<UploadRecipe />} />
      </Route>
    </Routes>
  );
}

export default App;
