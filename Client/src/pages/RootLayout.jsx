import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar';
import "../css/RootLayout.css";
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default RootLayout
