import React, { use } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, useParams } from 'react-router-dom'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import Otp from '../components/Otp'
import ResetPassword from '../components/Resetpass'
import Forgotpass from '../components/Forgotpass'
import Layout from '../layout.jsx/Layout'
import Home from '../components/Home'
import NotFound from '../components/NotFound'
import { AuthContext } from '../context/authContext'

function Routing() {
  const { user } = use(AuthContext);
  const isExist = user?.user;
  console.log(isExist);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/signup' element={  <Signup /> } />
        <Route path='/otp' element={ <Otp />} />
        <Route path='/signin' element={ !isExist ?  <Signin /> : <Navigate to="/" /> } />
        <Route path='/forgotpass' element={ isExist ?  <Forgotpass /> : <Navigate to="/signin" />} />
        <Route path='/resetPass/:token' element={ isExist ?  <ResetPassword /> : <Navigate to="/signin" /> } />
        <Route path='*' element={<NotFound />} />

        <Route path='/' element={ isExist ?  <Layout />  : <Navigate to="/signin" />}>
          <Route index element={<Home />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />
}
export default Routing;