import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/App';
import Details from '@/components/Details';
import NotFound from '@/components/NotFound';
import Admin from '@/components/Admin';
import { AdminSignup } from '@/components/AdminSignup';
import '@/index.css';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/admin', element: <Admin /> },
  { path: '/signup', element: <AdminSignup /> },
  { path: '/movie/:id', element: <Details /> },
  { path: '*', element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);