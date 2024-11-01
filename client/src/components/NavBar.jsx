/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../Contexts/AuthStates";
import { useGoogleLogin } from "../utils/googleHook";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { isLoggedIn } = useGoogleLogin();
  console.log(isLoggedIn);
  const { logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      console.log("User is logged in");
      navigate("/");
    } else {
      navigate("/login");
      console.log("User is not logged in");
    }
  }, [isLoggedIn]);
  const handleLogout = (e) => {
    e.preventDefault();
    logOut();
    window.location.reload();
  };
  const Links = [
    { name: "Home", to: "/" },
    { name: "Explore", to: "/explore" },
    { name: "Notifications", to: "/notifications" },
    { name: "Profile", to: "/profile" },
    { name: "Settings", to: "/settings" },
    { name: "Help", to: "/help" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <nav className="bg-zinc-100 backdrop:filter(blur(60px)) text-zinc-800">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Image Gram" className="h-8 w-8 mr-2" />
            <span className="font-bold text-lg">Image Gram</span>
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={togglePopover}
                  className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus:outline-none hover:bg-gray-300"
                >
                  MK
                </button>
                {isPopoverOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    {Links.map((link) => (
                      <Link
                        key={link.name}
                        to={link.to}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="inline-block px-4 py-2  hover:bg-purple-200 rounded-lg text-purple-500 hover:shadow-xl shadow-purple-200 hover:bg-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-block px-4 py-2  hover:bg-yellow-100  text-yellow-500 rounded-lg hover:shadow-xl shadow-yellow-100 hover:bg-green-600 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-purple-950 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-4 pb-2 space-y-2">
          {Links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="block text-zinc-800 hover:text-gray-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
