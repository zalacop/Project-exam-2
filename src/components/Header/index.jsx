import React, { useState } from "react";

import Nav from "../Nav";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-dark px-5 py-5">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <h1 className="self-center font-semibold">HOLIDAZE</h1>
        </Link>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
