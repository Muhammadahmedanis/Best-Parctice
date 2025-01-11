import React, { use, useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import { FiMoon } from "react-icons/fi";
import { IoHomeOutline  } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { ImStatsBars2 } from "react-icons/im";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import useTheme from "../context/themeContext";

function Nvabar() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { user, dispatch } = use(AuthContext);
  const {theme, lightThemeMode, darkThemeMode } = useTheme()
  const isAdmin = user?.admin === true
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

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      toast.success("Logout successful");
      dispatch({type: "AUTH_LOGOUT"})
    } catch (error) {
      dispatch({type: "AUTH_LOGOUT", payload: error.response?.data.message})
      toast.error(error.response?.data.message)
    }
  }

  const handleTheme = () => {
    if(theme === "light") {
      darkThemeMode();
      console.log(theme);
    }else {
      lightThemeMode();
    }
  }  
  return (
    !isAdmin ? 
    (  <nav className="relative bg-white shadow dark:bg-gray-800">
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
                <IoMdCloseCircle size={23} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between ${isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
            }`}
        >
          <ul className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
            {
              navItems?.map((nav) => (
                <li key={nav.name}>
                  <NavLink
                    to={nav.slug}
                    className={({ isActive }) => `px-2.5 py-2 ${isActive && 'bg-red-400'} text-gray-700 cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2`}
                  >
                    {nav.name}
                  </NavLink>
                </li>
              ))
            }
          </ul>
          <div className="relative ml-3">
            <div>
              <button
                onClick={() => setOpenModal(!openModal)}
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-white"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <div className="size-11 bg-gray-300 border-none font-bold text-[21px] flex items-center justify-center outline-none rounded-full">{user.user.slice(0, 1).toUpperCase()}</div>
              </button>
            </div>

            {/* Dropdown menu */}
            <div
              className={` ${openModal ? "block" : "hidden"} absolute right-0 z-10 mt-1 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex="-1"
            >
              <button
              onClick={handleTheme}
                href="#"
                className="flex items-center justify-center w-full font-semibold gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700"
                role="menuitem"
                tabIndex="-1"
                id="user-menu-item-1"
              >
                Theme
                { theme === "light" ?  <IoSunnyOutline size={23} /> : <IoSunny size={23}/> }      
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full font-semibold gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700"
                role="menuitem"
                tabIndex="-1"
                id="user-menu-item-2"
              >
                Sign Out
                <RiLogoutCircleRLine className="font-bold" size={19} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>)  :

    (<aside className="flex flex-col items-center w-16 h-screen py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700">
      <nav className="flex flex-col flex-1 space-y-6">
          {/* <a href="#"> */}
              <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" />
          {/* </a> */}
  
          <button className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <IoHomeOutline size={23}/>
          </button>
  
          <button className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
              <ImStatsBars2 size={22}/>
          </button>
  
          <button className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
             <HiOutlineUsers size={22}/>
          </button>
  
          <button className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <FiMoon size={22}/>
          </button>
      </nav>
  
      <div className="flex flex-col space-y-6">
          <button
           onClick={handleLogout}
           className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <RiLogoutCircleRLine size={22}/>
          </button>
      </div>
  </aside>
  )
  
  )
}

export default Nvabar