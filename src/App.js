import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "./context/user.context";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Home from "./routes/home/home.component";
import Profile from "./routes/profile/profile.component";


function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/auth" element={<Authentication />} />
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
