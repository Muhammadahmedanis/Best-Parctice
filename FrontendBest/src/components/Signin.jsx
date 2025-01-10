import React, { use, useActionState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEnvelope } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

function Signin() {
  const navigate = useNavigate();
  const { dispatch } = use(AuthContext);
  
   const[user, submitAction, isPending] = useActionState(async (previousState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    
    if(!email) {
       toast.error("email required")
    }else if(!/\S+@\S+\.\S+/.test(email)){
      toast.error("Invalid email format")
    }
    if (!password) {
      toast.error("Password is required")
    } else if (password.length < 7) {
      toast.error("Password must be at least 8 characters")
    }
    const userData = { email, password };
    if (userData.email.length && userData.password.length) {
      try {
        const response = await axios.post("/api/v1/auth/signin", userData)
        toast.success("Signin successful");
        const name = email.match(/^[a-zA-Z]+/)[0];
        const userInfo = {user: name, admin: response?.data.data?.isAdmin}
        console.log(userInfo);
        dispatch({type: "AUTH_SUCCESS", payload: userInfo})
        navigate("/");
      } catch (error) {
        dispatch({type: "AUTH_FAIL", payload: error.response?.data.message});
        toast.error(error.response?.data.message);
      }
    }
   }) 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
          }}
        >
        </div>
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="" />
          </div>
          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">Welcome back!</p>
          <form action={submitAction}>
          <div className='my-4'>
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress" >
                Email Address
            </label>
            <div className="relative flex items-center mt-2">
              <span className="absolute right-1">
                <FaRegEnvelope className="w-5 h-5 mx-3 text-gray-300 dark:text-gray-500"  />
              </span>
              <input type="email" name='email' required className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="abc@gmail.com" />
            </div>
          </div>

          <div className='my-2'>
          <div className="flex justify-between">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress" >
                Password
            </label>
            <Link to="/forgotPass" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">
              Forget Password?
            </Link>
            </div>
            <div className="relative flex items-center mt-2">
              <span className="absolute right-1">
                <LuEye className="w-5 h-5 mx-3 cursor-pointer text-gray-300 dark:text-gray-500"  />
              </span>
              <input type="password" name='password' required className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="••••••••" />
            </div>
          </div>

          <div className="mt-6">
            <button disabled={isPending} className="w-full inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-lg bg-indigo-500 hover:bg-indigo-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10  focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
              <div className='text-[17px]'> Sign In</div>
              { isPending && <div className="w-7 h-7 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> }
            </button>
          </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <Link to='/'>
              <div className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"> or sign up </div>
            </Link>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin