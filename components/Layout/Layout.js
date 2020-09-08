import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { NavBar } from './NavBar';
import { Meta } from './Meta';

export const Layout = ({ navigationBarData, header = null, children }) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen bg-primary-100 flex flex-col">
        <NavBar navigationBarData={navigationBarData} />
        <div className="py-10 flex-1">
          {header && <Header>{header}</Header>}
          <main>
            <div className="container max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
              {/* Replace with your content */}
              {/*<div className="px-4 py-8 sm:px-0">*/}
              {/*  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>*/}
              {/*</div>*/}
              {/* /End replace */}
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};
