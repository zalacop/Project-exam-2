import React, { useState } from "react";

import { CgProfile } from "react-icons/cg";
// import Nav from "../Nav";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-dark px-5 py-5">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <h1 className="self-center font-semibold">HOLIDAZE</h1>
        </a>
        <button
          onClick={toggleMenu}
          type="text"
          className="text-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm md:hidden"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only"></span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isMenuOpen ? "" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="mt-4 flex flex-col items-center p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0 rtl:space-x-reverse">
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 md:bg-transparent md:p-0"
                aria-current="page"
              >
                Venues
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 md:bg-transparent md:p-0"
              >
                Log in
              </a>
            </li>
            <li className="block rounded px-3 py-2 md:mx-auto md:bg-transparent md:p-0">
              <CgProfile className="h-5 w-5 md:h-10 md:w-7" />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
