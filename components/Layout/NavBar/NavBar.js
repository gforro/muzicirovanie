import React, { useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { DesktopMenu } from './DesktopMenu';
import { Transition } from '../../utils/Transition';
import { AdminDropdownPanel } from './AdminDropdownPanel';
import { MobileMenu } from './MobileMenu';

export const NavBar = ({ navigationBarData: { title, logo, menuItems } }) => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const auth = false; //TODO manage logged in user

  return (
    <nav className="bg-primary-100 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/">
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                <img
                  className="p-1 bg-primary-400 rounded-full md:w-12 md:h-12 w-10 h-10"
                  src={logo.url}
                  alt={logo.alt}
                />
                <h1 className="block sm:hidden md:block ml-2 text-3xl font-semibold lowercase text-primary-900">
                  {title}
                </h1>
              </div>
            </Link>
            {auth && <DesktopMenu menuItems={menuItems} />}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:justify-end sm:items-stretch">
            {/* Admin menu dropdown */}
            {auth ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    className="p-1 border-2 border-transparent text-neutral-400 rounded-full hover:text-neutral-500 focus:outline-none focus:text-neutral-500 focus:bg-neutral-100 hover:bg-neutral-100 transition duration-150 ease-in-out"
                    id="admin-menu"
                    aria-label="Admin menu"
                    aria-haspopup="true"
                    onClick={() => setShowAdminPanel(!showAdminPanel)}>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="user-group w-6 h-6">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                  </button>
                </div>
                <Transition
                  show={showAdminPanel}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <AdminDropdownPanel />
                </Transition>
              </div>
            ) : (
              <DesktopMenu menuItems={menuItems} />
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 focus:text-neutral-500 transition duration-150 ease-in-out"
              onClick={() => setShowMobileMenu(!showMobileMenu)}>
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className={cn(
                  'block h-6 w-6',
                  showMobileMenu ? 'hidden' : 'block',
                )}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className={cn('h-6 w-6', showMobileMenu ? 'block' : 'hidden')}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={cn('sm:hidden', showMobileMenu ? 'block' : 'hidden')}>
        <MobileMenu menuItems={menuItems} />
      </div>
    </nav>
  );
};
