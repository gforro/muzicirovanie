import React from 'react';
import cn from 'classnames';

export default function Button({
  primary = false,
  secondary = false,
  white = false,
  disabled = false,
  className,
  children,
  ...restProps
}) {
  const buttonProps = {
    type: 'button',
    ...restProps,
  };

  return (
    <span className="flex-inline rounded-md shadow-sm">
      <button
        className={cn(
          `flex-inline items-center justify-center px-6 py-3 border text-base leading-6 font-medium rounded-md transition ease-in-out duration-150 focus:shadow-outline focus:outline-none`,
          primary &&
            `border-transparent text-white bg-primary-600 hover:bg-primary-500 focus:border-primary-700 active:bg-primary-700`,
          secondary &&
            `border-transparent text-primary-700 bg-primary-200 hover:bg-primary-50 focus:border-primary-300 active:bg-primary-200`,
          white &&
            `border-neutral-300 text-neutral-700 bg-neutral-50 hover:text-neutral-500 focus:border-primary-300 active:text-neutral-800 active:bg-neutral-50`,
          disabled && `opacity-50 cursor-not-allowed`,
          className
        )}
        {...buttonProps}>
        {children}
      </button>
    </span>
  );
}
