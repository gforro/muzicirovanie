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
        <div className="py-10 flex-1 flex">
          {header && <Header>{header}</Header>}
          <main className="flex-1 flex">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};
