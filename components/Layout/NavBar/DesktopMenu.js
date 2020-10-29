import React from 'react';
import cn from 'classnames';
import { linkResolver } from '../../../lib/prismicHelpers';
import { ActiveLink } from '../../ActiveLink';

export const DesktopMenu = ({ menuItems }) => {
  return (
    <div className="hidden sm:-my-px sm:ml-8 sm:flex">
      {menuItems.map(({ label, link }, i) => (
        <ActiveLink
          href={linkResolver(link)}
          activeClassName={cn(
            'border-primary-700 text-neutral-900',
            'hover:border-primary-700 hover:text-neutral-900',
            'focus:border-primary-700 focus:text-neutral-900',
          )}
          key={label}>
          <a
            className={cn(
              'inline-flex items-center px-1 pt-1 border-b-2 text-xl font-medium leading-5 focus:outline-none',
              'transition duration-150 ease-in-out',
              'border-transparent text-neutral-500',
              'focus:border-neutral-300 focus:text-neutral-700',
              'hover:border-neutral-300 hover:text-neutral-700',
              { 'ml-4': i > 0 },
            )}>
            {label}
          </a>
        </ActiveLink>
      ))}
    </div>
  );
};
