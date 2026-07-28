import React from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const { signout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);



  const handleSignOut = async (e) => {
    e.preventDefault()

    signout()


    navigate("/signin")

  }
  return (

    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide text-black cursor-pointer">
            TODO
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-10 text-black font-medium">
            <li>
              <a
                href="/todo"
                className="hover:text-gray-600 transition duration-200"
              >
                Dashboard
              </a>
            </li>

            <li>
              <a
                href="#"
                className="hover:text-gray-600 transition duration-200"
              >
                About Us
              </a>
            </li>
          </ul>

          {/* Profile Image */}
          <div className="relative">
            {/* Profile Image */}
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/silhouette-person-icon.svg"
              alt="Profile"
              className="w-11 h-11 rounded-full border-2 border-gray-300 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-100 rounded-lg shadow-lg border border-gray-200">


                <Link className="w-full text-left px-4 py-3 hover:bg-gray-200" block to="/profile">👤 Profile</Link>



                <Link className="w-full text-left px-4 py-3 hover:bg-gray-200 text-red-600 block"
                  onClick={handleSignOut}>  🚪 Sign Out</Link>
              </div>
            )}
          </div>

        </div>
      </nav>

    </>
  );
};

export default Navbar;
