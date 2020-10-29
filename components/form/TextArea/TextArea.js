import React, { forwardRef } from 'react';
import cn from 'classnames';

function TextArea({
  id,
  label,
  placeholder = '',
  description = '',
  error,
  forwardedRef,
  rows = 3,
}) {
  const invalidProps = !error
    ? {}
    : {
        'aria-invalid': 'true',
        'aria-describedby': `${id}-error`,
      };
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-5 text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <textarea
          id={id}
          name={id}
          rows={rows}
          className={cn(
            'form-textarea block w-full pr-10 sm:text-sm sm:leading-5',
            !!error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red'
              : '',
          )}
          placeholder={placeholder}
          ref={forwardedRef}
          {...invalidProps}
        />
        {error && (
          <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="h-10">
        {error ? (
          <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
            {error}
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default forwardRef((props, ref) => (
  <TextArea forwardedRef={ref} {...props} />
));
