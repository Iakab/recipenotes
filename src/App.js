import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Home from "./routes/home/home.component";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/auth" element={<Authentication />} />
        <Route index element={<Home/>} />
      </Route>
    </Routes>
  );
}

export default App;
