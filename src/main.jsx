// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'

// We'll create these files in the next step
import ScanScreen from './pages/ScanScreen.jsx';
import VerifiedScreen from './pages/VerifiedScreen.jsx';
import WarningScreen from './pages/WarningScreen.jsx';
import CriticalScreen from './pages/CriticalScreen.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScanScreen />, // The main "Scan" page is our home
  },
  {
    path: "/verified",
    element: <VerifiedScreen />,
  },
  {
    path: "/warning",
    element: <WarningScreen />,
  },
  {
    path: "/critical",
    element: <CriticalScreen />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)