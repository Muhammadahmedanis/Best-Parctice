import axios from 'axios';
import React, { useEffect } from 'react'
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

function Table() {
    let token = JSON.parse(localStorage.getItem("token"));
    const fetchData = async () => {
        const res = await axios.get("/api/v1/admin/getUsers", {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwidXNlck5hbWUiOiJpbml0IiwiaXNBZG1pbiI6ImluaXQiLCJpc1ZlcmlmaWVkIjoiaW5pdCIsIl9pZCI6ImluaXQiLCJleHBpcmVzSW4iOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJ1c2VyTmFtZSI6dHJ1ZSwiZW1haWwiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpc1ZlcmlmaWVkIjp0cnVlLCJleHBpcmVzSW4iOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJfX3YiOnRydWV9fX0sInNraXBJZCI6dHJ1ZX0sIiRpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX2lkIjoiNjc4NjYxNmQ0ZDg2NjA0Yzc0YjUzNGYzIiwidXNlck5hbWUiOiJBaW1hbiIsImVtYWlsIjoiYXltYW5hbmlzNzI5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFJrNW5CNzlTZ2t2WFFUb0tLc2VxT3VDcWJudGdKbVdSMHQuZC4uTmhEVHFvcFdMUEN1M2EuIiwiaXNBZG1pbiI6dHJ1ZSwiaXNWZXJpZmllZCI6dHJ1ZSwiZXhwaXJlc0luIjoiMjAyNS0wMS0xNFQxMzoxNjo1My44NjBaIiwiY3JlYXRlZEF0IjoiMjAyNS0wMS0xNFQxMzowNjo1My44NjFaIiwidXBkYXRlZEF0IjoiMjAyNS0wMS0xNFQxMzoxMTo0MC43NjJaIiwiX192IjowfSwiaWF0IjoxNzM2ODc4NTgxLCJleHAiOjE3MzY5NjQ5ODF9.gTZv8Dl48Kzj7MrAnyQfZvx3v-DCNKvqACpUnfx8gJg`,
            },
        });
        
        console.log(res.data);
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <section className="container shadow-lg border border-gray-400 rounded my-5 px-4 mx-auto">
            <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">Users</h2>
            </div>

            <div className="flex flex-col mt-2 ">
                <div className="-mx-4 -my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full  py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-200 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                <span>user Id</span>
                                            </div>
                                        </th>

                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <span>Name</span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <button className="flex items-center gap-x-2">
                                                <span>Status</span>
                                                <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                    <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                    <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                </svg>
                                            </button>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <button className="flex items-center gap-x-2">
                                                <span>Join</span>
                                            </button>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address</th>

                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-200 divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {/* Repeat the following <tr> block for each member */}
                                    <tr>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                <div className="flex items-center gap-x-2">
                                                    <h4 className="font-normal text-gray-800 dark:text-white ">6786616d4d86604c74b534f3</h4>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <div className="flex items-center gap-x-2">
                                                    <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                                    <div>
                                                        <h2 className="font-medium text-gray-800 dark:text-white ">Arthur Melo</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                <h2 className="text-sm font-normal text-emerald-500">Active</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">5 Jan 2024</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">authurmelo@example.com</td>
                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <button type="button" className="text-[20px] text-blue-600 dark:text-blue-400"><FiEdit /></button>
                                                <button type="button" className="text-[20px] text-red-600 dark:text-red-400"><IoTrashOutline /></button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Repeat ends */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Table