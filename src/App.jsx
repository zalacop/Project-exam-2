import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/HomePage";
import Venues from "./pages/VenuesPage";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venues" element={<Venues />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
