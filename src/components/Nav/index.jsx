import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(accessToken ? true : false);
  }, [isLoggedIn]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        type="text"
        className="text-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm md:hidden"
        aria-controls="navbar-default"
        aria-expanded={isMenuOpen}
      >
        <span className="sr-only">Toggle Menu</span>
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
            <Link
              to="/venues"
              className="block rounded px-3 py-2 uppercase md:bg-transparent md:p-0"
            >
              Venues
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link
                  to="/profile"
                  className="block rounded px-3 py-2 uppercase md:bg-transparent md:p-0"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block rounded px-3 py-2 uppercase md:bg-transparent md:p-0"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <li>
              <Link
                to="/login"
                className="block rounded px-3 py-2 uppercase md:bg-transparent md:p-0"
              >
                Log in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Nav;
