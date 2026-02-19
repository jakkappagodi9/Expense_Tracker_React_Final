import React from 'react';
import Layouts from './Layouts';
import Login from '../components/Login';
import SignupForm from '../components/SignupForm';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import UpdateProfile from '../components/UpdateProfile';
import Emailverification from '../components/Emailverification';
import ForgotPassword from '../components/ForgotPassword';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignupForm />,
      },
      {
        path: 'emailverification',
        element: <Emailverification />,
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassword />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [{ path: 'update-profile', element: <UpdateProfile /> }],
      },
    ],
  },
]);
