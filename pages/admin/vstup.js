import React from 'react';
import {useForm} from 'react-hook-form';
import {useUser} from '../../lib/context/UserContext';
import {getStaticPropsWithNavigationData} from '../../lib/globalProps';

export default function Login({ siteLogo }) {
  const {user, loading, login, error} = useUser();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = ({email, password}) => login({email, password});

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img
            className="mx-auto h-12 w-auto rounded-full bg-primary-400 p-1"
            src={siteLogo.url}
            alt={siteLogo.alt}
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-neutral-900">
            Vstup do aplikácie
          </h2>
        </div>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Email address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Email adresa"
                ref={register({required: true})}
              />
            </div>
            <div className="-mt-px">
              <input
                aria-label="Password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Heslo"
                ref={register({required: true})}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                ref={register}
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm leading-5 text-neutral-900">
                Zapamätať na tomto počítači
              </label>
            </div>

            <div className="text-sm leading-5">
              <a
                href="#"
                className="font-medium text-primary-800 hover:text-primary-700 focus:outline-none focus:underline transition ease-in-out duration-150">
                Zabudli ste heslo?
              </a>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary-800 hover:bg-primary-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-primary-700 group-hover:text-primary-600 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Prihlásiť sa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const getStaticProps = getStaticPropsWithNavigationData();
