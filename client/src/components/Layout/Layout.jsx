import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
        {/*Adding/ importing the header component here */}
        <Header />
        <div className="content">

            {/*Main content inside here  */}
            {children} {/*Showing all the cild elements here  */}

        </div>
        <Footer />

    </>
  );
};

export default Layout;