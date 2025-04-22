import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // import Footer

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main >
        <Outlet />
      </main>
      <Footer /> {/* footer appears on all pages */}
    </>
  );
};

export default RootLayout;
