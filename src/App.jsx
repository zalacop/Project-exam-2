import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
