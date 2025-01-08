import React from 'react';

const ResetPassword = () => {
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900'>
            <main id="content" role="main" className="w-full max-w-md p-6">
                <div className="bg-white border shadow-lg mt-7 rounded-xl">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <div className="flex items-end justify-center mb-8 text-2xl font-bold">
                            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
                            </div>
                            <h1 className="block text-lg font-bold text-gray-800">Reset Password</h1>
                        </div>
                        <div className="mt-5">
                            <form>
                                <div className="grid gap-y-4">
                                    <div>
                                        <label htmlFor="new_password" className="block mb-2 ml-1 text-xs font-semibold">
                                            New password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="new_password"
                                                name="new_password"
                                                className="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                                aria-describedby="new-password-error"
                                                placeholder="Enter a new password"
                                            />
                                        </div>
                                        <p className="hidden mt-2 text-xs text-red-600" id="new-password-error">
                                            Please include a password that complies with the rules to ensure security
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="confirm_new_password" className="block mb-2 ml-1 text-xs font-semibold">
                                            Confirm new password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="confirm_new_password"
                                                name="confirm_new_password"
                                                className="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                                aria-describedby="confirm-new-password-error"
                                                placeholder="Confirm your new password"
                                            />
                                        </div>
                                        <p className="hidden mt-2 text-xs text-red-600" id="confirm-new-password-error">
                                            Please include a password that complies with the rules to ensure security
                                        </p>
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Reset my password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default ResetPassword;
