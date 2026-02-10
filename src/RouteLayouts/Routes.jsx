import React from 'react';
import Layouts from './Layouts';
import Login from '../components/Login';
import SignupForm from '../components/SignupForm';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import UpdateProfile from '../components/UpdateProfile';

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
        path: 'dashboard',
        element: <Dashboard />,
        children: [{ path: 'update-profile', element: <UpdateProfile /> }],
      },
    ],
  },
]);
