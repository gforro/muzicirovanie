import React from 'react';
import Link from 'next/link';

export const AdminDropdownPanel = () => {
  return (
    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
      <div className="py-1 rounded-md bg-neutral-50 shadow-xs">
        <Link href="/admin/prihlaseny">
          <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
            Prihlásený
          </a>
        </Link>
        <Link href="/admin/odhlasit">
          <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
            Odhlásiť sa
          </a>
        </Link>
      </div>
    </div>
  );
};
