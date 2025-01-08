import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import Otp from '../components/Otp'
import ResetPassword from '../components/Resetpass'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
          <Route path='/' element={ <Signup />} ></Route>
          <Route path='/otp' element={ <Otp />} />
          <Route path='/reset' element={ <ResetPassword /> } />
          <Route path='/signin' element={ <Signin />} />
        </>
    )
)

function Routing() {
  return (
    <RouterProvider router={router} />
  )
}

export default Routing