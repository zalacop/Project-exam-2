import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
