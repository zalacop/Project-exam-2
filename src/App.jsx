import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/HomePage";
import Venues from "./pages/VenuesPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Profile from "./pages/ProfilePage";
import SingleVenue from "./pages/SingleVenuePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/venues", element: <Venues /> },
        { path: "/venue/:id", element: <SingleVenue /> }, 
        { path: "/login", element: <Login /> }, 
        { path: "/register", element: <Register /> },
        { path: "/profile", element: <Profile /> }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
