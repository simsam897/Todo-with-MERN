import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const { signout, user } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSignOut = async (e) => {
    e.preventDefault();

    await signout();
    navigate("/signin", { replace: true });
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg z-50">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/todo"
          className="text-2xl font-extrabold tracking-wider text-white"
        >
          TODO
          <span className="text-green-300">.</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10 font-medium">
          <li>
            <Link
              to="/todo"
              className="text-blue-100 hover:text-white transition duration-200"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/featuers"
              className="text-blue-100 hover:text-white transition duration-200"
            >
              Features
            </Link>
          </li>
        </ul>

        {/* Profile */}
        <div
          className="relative"
          ref={dropdownRef}
        >
          <img
            src={
              user?.profilePicture ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/silhouette-person-icon.svg"
            }
            alt="Profile"
            onClick={() => setIsOpen(!isOpen)}
            className="w-11 h-11 rounded-full border-2 border-white object-cover cursor-pointer hover:scale-105 transition duration-200 shadow-md"
          />

          {isOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Mobile Navigation */}
              <div className="md:hidden">
                <Link
                  to="/todo"
                  onClick={() => setIsOpen(false)}
                  className="block px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  📋 Dashboard
                </Link>

                <Link
                  to="/featuers"
                  onClick={() => setIsOpen(false)}
                  className="block px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  ✨ Features
                </Link>

                <hr className="border-gray-100" />
              </div>

              {/* User Info */}
              <div className="px-5 py-4 bg-gray-50">
                <p className="text-xs text-gray-500">
                  Signed in as
                </p>

                <p className="font-semibold text-gray-800 truncate">
                  {user?.email}
                </p>
              </div>

              <hr className="border-gray-100" />

              {/* Profile */}
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                👤 My Profile
              </Link>

              <hr className="border-gray-100" />

              {/* Logout */}
              <button
                onClick={handleSignOut}
                className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
              >
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;