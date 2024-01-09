import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "./context/user.context";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Home from "./routes/home/home.component";

// {currentUser ? (
//   <div>
//     <button onClick={signOutUser}>Sign out</button>
//     <Navigate to="/" />
//   </div>
// ) : (
//   <Navigate to="/auth" />
// )}

function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
        {/* {currentUser ? (
        ) : (
        )} */}
      </Route>
    </Routes>
  );
}

export default App;
