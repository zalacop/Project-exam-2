import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/HomePage";
import Venues from "./pages/VenuesPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Profile from "./pages/ProfilePage";
import SingleVenue from "./pages/SingleVenuePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venues" element={<Venues />} />
          <Route path="venue/:id" element={<SingleVenue />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
