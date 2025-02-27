import React, { use, useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import useTheme from "../context/themeContext";
import { MdOutlineDashboard } from "react-icons/md";
import { toast } from 'react-toastify';
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice.js";
import axios from "axios";
import { toggleTheme } from "../redux/themeSlice.js"; 
import { axiosInstance } from '../api/axios.js';

function Nvabar() {
  const [openModal, setOpenModal] = useState(false);
  // const { user, dispatch  } = use(AuthContext);  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.theme);
  
  // const {theme, lightThemeMode, darkThemeMode } = useTheme()
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "FEATURES",
      slug: "/about",
    },
    {
      name: 'SHOP',
      slug: '/shop',
    },
    {
      name: 'BLOG',
      slug: '/blog',
    },
    {
      name: 'CONTACT',
      slug: '/contact',
    },
  ]
  const [isOpen, setIsOpen] = useState(false);

  const handleTheme = () => {
    dispatch(toggleTheme())
  } 
  
    // if(theme === "light") {
    // //   darkThemeMode();
    //   console.log(theme);
    // }else {
    //   // lightThemeMode();
    // }

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
        dispatch(logout());
        toast.success(response.data.message);
        // dispatch({type: "AUTH_LOGOUT"})
    } catch (error) {
      dispatch(logout());
        // dispatch({type: "AUTH_LOGOUT", payload: error.response?.data.message})
        toast.error(error.response?.data.message)
    }
  }

  return (
    <div className={isOpen ? '' : 'w-full bg-white sticky top-0 z-10 drop-shadow-md '}>
      <div className='flex flex-wrap justify-between place-items-center px-2 py-3 pl-5 pr-4 dark:bg-gray-900 dark:text-white'>
        <div className='sm:hidden'>
          { isOpen ? '' : <FaBars onClick={() => setIsOpen(!isOpen)} />}
        </div>
        <div>
          <Link to='/' className='font-bold text-3xl '>
            WOOD <span className='text-yellow-500 '>COM</span>
          </Link>
        </div>
        <div className={`${isOpen ? "transform translate-x-0" : 'transform -translate-x-full'} sm-flex bg-white fixed inset-y-0 left-0 z-50  w-64 overflow-y-auto transition-transform ease-in-out duration-300`} style={{zIndex: '1111'}}>
          <FaTimes onClick={() => setIsOpen(!isOpen)} className='absolute top-3 right-3' />
          <ul className='flex flex-col p-4 m-8 font-bold '>
          {
            navItems?.map((nav) => (
              <li key={nav.name}>
                <NavLink
                  to={nav.slug}
                  className={({ isActive }) => `px-2.5 py-2 ${isActive && 'bg-red-400'} block text-gray-700 cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2`}>
                  {nav.name}
                </NavLink>
              </li>
            ))
          }
          </ul>
        </div>

        <div className='hidden sm:flex '>
        <ul className='flex uppercase font-semibold '>
          {
            navItems?.map((nav) => (
              <li key={nav.name}>
                <NavLink
                  to={nav.slug}
                  className={({ isActive }) => `px-2.5 py-2 ${isActive && 'bg-red-400'} block text-gray-700 cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2`}>
                  {nav.name}
                </NavLink>
              </li>
            ))
          }

          </ul>
        </div>

        <div className='padding: 10px flex items-center gap-x-2'>
          <button onClick={() => setOpenModal(!openModal)} type="button" className="relative size-11  font-bold text-[22px] rounded-full flex items-center justify-center bg-gray-300 text-sm focus:outline-none focus:ring-white">
               {user.user.slice(0, 1).toUpperCase()}
          </button>
          <div className={` ${openModal ? "block" : "hidden"} absolute right-1  top-14 z-10 mt-1 w-[132px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none`}>
          <button onClick={handleTheme}
            className="flex items-center justify-center w-full font-semibold gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700">
           {theme}
            { theme == "light" ? <IoSunnyOutline className="font-bold w-12" size={23} />  :  <IoSunny className="font-bold w-12" size={23}/> }      
          </button>
          <button onClick={handleLogout}
            className="flex items-center justify-center w-full font-semibold gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700">
            Sign Out
            <RiLogoutCircleRLine className="font-bold w-9" size={19} />
          </button>
          {user.admin && <button
            className="flex flex-1 items-center justify-center w-full font-semibold gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700">
              <Link to="/dashboard">Dashboard</Link>
            <MdOutlineDashboard className="font-bold w-9" size={19} />
          </button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nvabar