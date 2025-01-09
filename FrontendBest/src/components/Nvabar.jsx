import React, { useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Nvabar() {
    const navigate = useNavigate();
      const navItems = [
            {
                name: "Home",
                slug: "/",
              }, 
              {
                name: "About",
                slug: "/about",
              },
              {
                name: 'Contact',
                slug: '/contact',
              },
        ]
      const [isOpen, setIsOpen] = useState(false);

      const handleLogout = async() => {
        try {
            await axios.post("/api/v1/auth/logout");
            toast.success("Logout successful");
            navigate("/signin")
        } catch (error) {
            toast.error(error.response?.data.message)
        }
        
      }
  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
        <div className="container px-6 py-3 mx-auto md:flex">
        <div className="flex items-center justify-between">
            <a href="#">
            <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt="Logo" />
            </a>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
            >
                {!isOpen ? (
                <GiHamburgerMenu size={23} />
                ) : (
                <IoMdCloseCircle size={23}/>
                )}
            </button>
            </div>
        </div>

        {/* Mobile Menu */}
        <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between ${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
            }`}
        >
            <ul className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
            {
                navItems?.map((nav) => (
                    <li key={nav.name}>
                    <NavLink 
                        to={nav.slug}
                        className={({isActive}) => `px-2.5 py-2 ${isActive && 'bg-red-400' } text-gray-700 cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2`}
                    >
                        {nav.name}
                    </NavLink>
                    </li>
                ))
            }
            </ul>
            <div className="relative mt-4 md:mt-0">
            <button onClick={handleLogout} className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            <span className="mx-1">Logout</span>
                <RiLogoutCircleRLine className="font-bold" size={20} />
            </button>
            </div>
        </div>
        </div>
    </nav>
  )
}

export default Nvabar