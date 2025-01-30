import React from 'react'
import { FiMoon } from "react-icons/fi";
import { IoHomeOutline, IoMoon   } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { ImStatsBars2 } from "react-icons/im";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiUsers, FiActivity, FiDollarSign, FiDatabase } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';
import Card from './Card.jsx'
import Chart from './Chart.jsx';
import Table from './Table.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice.js';
import { toggleTheme } from '../../redux/themeSlice.js';
import { axiosInstance } from '../../api/axios.js';
import {Link} from 'react-router-dom'

function Dashboard() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  
  const handleTheme = () => {
    dispatch(toggleTheme());
  }

const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
        dispatch(logout());
        toast.success(response.data.message);
        // dispatch({type: "AUTH_LOGOUT"})
        <Link to='/signin' />
    } catch (error) {
      dispatch(logout());
        // dispatch({type: "AUTH_LOGOUT", payload: error.response?.data.message})
        toast.error(error.response?.data.message)
    }
  }

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}> 
    <div className={`flex h-screen bg-gray-200 dark:bg-gray-900`}>
    <aside className="flex flex-col items-center w-16 h-full py-8 overflow-y-auto bg-gray-200 shadow-lg border-r rtl:border-l rtl:border-r-0 dark:bg-gray-800 dark:border-gray-700">
      <nav className="flex flex-col flex-1 space-y-6">
        <img className="w-auto h-6 dark:invert" src="https://merakiui.com/images/logo.svg" alt="Logo" />
  
        <button className="p-1.5 text-gray-700 dark:text-gray-300 focus:outline-none transition-colors duration-200 rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100">
          <IoHomeOutline size={23} />
        </button>
  
        <button className="p-1.5 text-gray-700 dark:text-gray-300 focus:outline-none transition-colors duration-200 rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100">
          <ImStatsBars2 size={22} />
        </button>
  
        <button className="p-1.5 text-gray-700 dark:text-gray-300 focus:outline-none transition-colors duration-200 rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100">
          <HiOutlineUsers size={22} />
        </button>
  
        <button onClick={handleTheme} className="p-1.5 text-gray-700 dark:text-gray-300 focus:outline-none transition-colors duration-200 rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100">
          { theme === "light" ?  <FiMoon size={22} /> : <IoMoon size={22} className="text-indigo-400" />}
        </button>
      </nav>
  
      <div className="flex flex-col space-y-6">
        <button
          onClick={handleLogout}
          className="p-1.5 text-gray-700 dark:text-gray-300 focus:outline-none transition-colors duration-200 rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100"
        >
          <RiLogoutCircleRLine size={22} />
        </button>
      </div>
    </aside>
  
    {/* Main Content */}
    <div className="flex-1 overflow-y-auto m-3 dark:bg-gray-800">
      <div className='grid grid-cols-2 md-grid-cols-2 lg:grid-cols-4 gap-3'>
        <Card 
          icon={<FiUsers className="w-6 h-6 dark:text-indigo-300" />}
          title="Active Token"
          value="2,853"
          trend="3.3% decrease"
          color="bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300"
        />
        <Card 
          icon={<FiActivity className="w-6 h-6 dark:text-emerald-300" />}
          title="Active Token"
          value="2,853"
          trend="3.3% decrease"
          color="bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-300"
        />
        <Card 
          icon={<FiDollarSign className="w-6 h-6 dark:text-rose-300" />}
          title="Active Token"
          value="2,853"
          trend="3.3% decrease"
          color="bg-rose-100 dark:bg-rose-900 dark:text-rose-300"
        />
        <Card 
          icon={<FiDatabase className="w-6 h-6 dark:text-amber-300" />}
          title="Active Token"
          value="2,853"
          trend="3.3% decrease"
          color="bg-amber-100 dark:bg-amber-900 dark:text-amber-300"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-col-2 gap-5 my-3">
        <Chart theme={theme} />
      </div>
      <div className='grid my-3'>
        <Table theme={theme} />
      </div>
    </div>
</div>
</div>
  )
}

export default Dashboard