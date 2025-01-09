import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import Otp from '../components/Otp'
import ResetPassword from '../components/Resetpass'
import Forgotpass from '../components/Forgotpass'
import Layout from '../layout.jsx/Layout'
import Home from '../components/Home'
import NotFound from '../components/NotFound'
const router = createBrowserRouter(
  createRoutesFromElements(
      <>
        <Route path='/signup' element={<Signup />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/forgotpass' element={<Forgotpass />} />
        <Route path='/reset' element={<ResetPassword />} />
        <Route path='*' element={ <NotFound />} />
        <Route path='/' element={<Layout />}>
          {/* Use index route for default child */}
          <Route index element={<Home />} />
        </Route>
      </>
  )
);

function Routing() {
  return <RouterProvider router={router} />;
}


export default Routing