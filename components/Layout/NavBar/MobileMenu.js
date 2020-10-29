import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { linkResolver } from '../../../lib/prismicHelpers';
import { ActiveLink } from '../../ActiveLink';

export const MobileMenu = ({ menuItems }) => {
  return (
    <div>
      <div className="pt-2 pb-3">
        {menuItems.map(({ label, link }, i) => (
          <ActiveLink
            href={linkResolver(link)}
            activeClassName={cn(
              'border-primary-700 text-primary-700 bg-primary-50',
              'hover:border-primary-700 hover:text-primary-700 hover:bg-primary-50',
              'focus:border-primary-800 focus:text-primary-800 focus:bg-primary-100',
            )}
            key={label}>
            <a
              className={cn(
                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out',
                'border-transparent text-neutral-500',
                'hover:border-neutral-300 hover:text-neutral-700 hover:bg-neutral-100',
                'focus:border-neutral-300 focus:text-neutral-700 focus:bg-neutral-100',
                { 'mt-1': i > 0 },
              )}>
              {label}
            </a>
          </ActiveLink>
        ))}
        {/*<a*/}
        {/*  href="#"*/}
        {/*  className="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out">*/}
        {/*  Dashboard*/}
        {/*</a>*/}
        {/*<a*/}
        {/*  href="#"*/}
        {/*  className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">*/}
        {/*  Team*/}
        {/*</a>*/}
        {/*<a*/}
        {/*  href="#"*/}
        {/*  className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">*/}
        {/*  Projects*/}
        {/*</a>*/}
        {/*<a*/}
        {/*  href="#"*/}
        {/*  className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">*/}
        {/*  Calendar*/}
        {/*</a>*/}
      </div>
      <div className="pt-4 pb-3 border-t border-neutral-200">
        {/*<div className="flex items-center px-4">*/}
        {/*  <div className="flex-shrink-0">*/}
        {/*    <img*/}
        {/*      className="h-10 w-10 rounded-full"*/}
        {/*      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
        {/*      alt=""*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className="ml-3">*/}
        {/*    <div className="text-base font-medium leading-6 text-gray-800">*/}
        {/*      Tom Cook*/}
        {/*    </div>*/}
        {/*    <div className="text-sm font-medium leading-5 text-gray-500">*/}
        {/*      tom@example.com*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div
          className="mt-3"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu">
          <Link href="/admin/prihlaseny">
            <a className="block px-4 py-2 text-base font-medium text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:text-neutral-800 focus:bg-neutral-100 transition duration-150 ease-in-out">
              Prihlásený
            </a>
          </Link>
          <Link href="/admin/odhlasit">
            <a className="block px-4 py-2 leading-5 text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 transition duration-150 ease-in-out">
              Odhlásiť sa
            </a>
          </Link>
          {/*<a*/}
          {/*  href="#"*/}
          {/*  className=""*/}
          {/*  role="menuitem">*/}
          {/*  Your Profile*/}
          {/*</a>*/}
          {/*<a*/}
          {/*  href="#"*/}
          {/*  className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"*/}
          {/*  role="menuitem">*/}
          {/*  Settings*/}
          {/*</a>*/}
          {/*<a*/}
          {/*  href="#"*/}
          {/*  className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"*/}
          {/*  role="menuitem">*/}
          {/*  Sign out*/}
          {/*</a>*/}
        </div>
      </div>
    </div>
  );
};
