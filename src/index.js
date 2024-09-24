import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './cashier/pages/login/login';
import AdminLogin from './admin/pages/login/Login';
import AdminHome from './admin/pages/home/Home';
import AddItem from './admin/component/rightPane/addItem/AddItem';
import UpadatePage from './admin/component/leftPane/item/update/UpdatePage/UpadatePage';
import DeletePage from './admin/component/leftPane/item/Delete/DeletePage/DeletePage';
import AddItems from './cashier/components/rightPane/addItems/addItems';
import Sales from './Sales Report/sales';


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
  {
    path: "/AddItem",
    element: <AddItem />,
  },
  {
    path: "/Update",
    element: <UpadatePage />,
  },
  {
    path: "/Delete",
    element: <DeletePage />,
  },
  {
    path: "/AddItems",
    element: <AddItems />,
  },
  {
    path: "/sales",
    element: <Sales />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
