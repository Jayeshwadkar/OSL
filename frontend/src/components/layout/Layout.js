import React from 'react';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import CustomRoutes from '../../routes/Routes';
import Footer from '../footer/Footer';

const Layout = () => {
  const layoutContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    margin: 0, // Ensure no margins cause overflow
    padding: 0,
    overflow: 'hidden',
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 100,
  };

  const navbarStyle = {
    position: 'fixed',
    top: '50px', // Adjust based on the Header's height
    width: '100%',
    zIndex: 100,
    margin: 0, // No extra space above navbar
  };

  const mainContentStyle = {
    flex: 1,
   
   
    padding: '10px',
    overflowY: 'auto',
    overflowX: 'hidden', // Prevent horizontal overflow
  };

  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    overflowX: 'auto', // Enable horizontal scrolling in the footer only
    whiteSpace: 'nowrap', // Prevent the content from wrapping, allowing horizontal scroll
    padding: '5px', // Optional padding for content
  };

  return (
    <div style={layoutContainerStyle}>
      <Header style={headerStyle} />
      <Navbar style={navbarStyle} />
      <main style={mainContentStyle}>
        <CustomRoutes />
      </main>
      <Footer style={footerStyle} />
    </div>
  );
};

export default Layout;
