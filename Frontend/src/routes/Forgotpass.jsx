import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { axiosInstance } from '../api/axios';
import Label from '../components/Label';

function Forgotpass() {
    const[email, setEmail] = useState('');
    const[isPending, setIspending] = useState(false);
    const haldleForgotPass = async() => {
        try {
            setIspending(true);
            await axiosInstance.post("/auth/forgot-password", { email });
            toast.success("Email sent Successful");
            setEmail(" ");   
        } catch (error) {
            toast.error(error.response?.data.message);
        }
        setIspending(false);
    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900'>
    <main id="content" role="main" className="w-full max-w-md p-6">
        <div className="bg-white border shadow-lg mt-7 rounded-xl">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                    <div className="flex items-end justify-center mb-8 text-2xl font-bold">
                    <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
                    </div>
                    <h1 className="block text-lg font-bold text-gray-800">Forgot Password</h1>
                    <p className='text-[15px] font-normal'>Enter your email and we'll send you a link to reset your password.</p>
                </div>
                <div className="mt-5">
                    <div>
                        <div className="grid gap-y-4">
                            <div>
                                <Label labelName="Email address" htmlFor="email" />
                                <div className="relative">
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        value={email}
                                        id="email"
                                        name="email"
                                        className="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Confirm your email address"
                                    />
                                </div>
                                <p className="hidden mt-2 text-xs text-red-600" id="confirm-new-password-error">
                                    Please include a password that complies with the rules to ensure security
                                </p>
                            </div>
                            <button
                            onClick={haldleForgotPass}
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-[15px] font-bold text-white transition-all bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Reset Password
                                { isPending && <div className="w-7 h-7 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> }
                            </button>
                            <button
                                className="inline-flex items-center border-gray-200 justify-center gap-2 px-4 py-3 text-sm font-bold text-gray-700 transition-all  border-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <Link to="/signin">
                                    Back to Sign in
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
  )
}

export default Forgotpass