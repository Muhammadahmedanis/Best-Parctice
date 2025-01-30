// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from 'react-router-dom'
import Signup from './routes/Signup'
import Signin from './routes/Signin'
import Otp from './routes/Otp'
import ResetPassword from './routes/Resetpass'
import Forgotpass from './routes/Forgotpass'
import Layout from '../src/layout/Layout'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import { AuthContext } from './context/authContext'
import { use } from 'react';
import Dashboard from './Admin/components/Dashboard.jsx'
import { useSelector } from 'react-redux'


function App() {
  // const { user } = use(AuthContext);
    const { user } =  useSelector((state) => state.auth)
    // console.log(user?.user);
    const isExist = user?.user;
    const isAdmin = user?.admin;
    console.log("user:- ",isExist);

    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/otp' element={ <Otp />} />
          <Route path='/signin' element={ !isExist ?  <Signin /> : <Navigate to="/" /> } />
          <Route path='/forgotpass' element={ <Forgotpass /> } />
          <Route path='/change-password/:token' element={ <ResetPassword /> } />
          <Route path='*' element={<NotFound />} />
  
          <Route path='/' element={ isExist ?  <Layout />  : <Navigate to="/signin" />}>
            <Route index element={<Home />} />
          </Route>

          {isExist && <Route path='/dashboard' element={ isAdmin ?  <Dashboard /> : <Navigate to="/" /> } />} 
        </>
      )
    );
    
  return <RouterProvider router={router} /> 
}

export default App