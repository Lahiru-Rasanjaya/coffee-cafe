import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './cashier/pages/login/login';
import AdminLogin from './admin/pages/login/Login';
import AdminHome from './admin/pages/home/Home';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <App />,
  },
  {
    path: "/AdminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/AdminHome",
    element: <AdminHome />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
