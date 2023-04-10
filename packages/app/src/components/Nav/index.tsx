import React, { FC, useState } from 'react';
import { User } from 'phosphor-react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/User/index.selectors';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import path from 'path';
import LogoutLink from '../LogoutLink';

const navigationMapping = [
  {
    url: '/',
    name: 'Home',
  },
  {
    url: '/my-profile',
    name: 'My Profile',
  },
];

const Navigation: FC = () => {
  const { pathname } = useLocation();
  const isLoggedIn = useSelector(selectAccessToken);
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-defaultBlack relative">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="block h-8 w-auto lg:hidden" src="vite.svg" alt="Vite logo" />
              <img className="hidden h-8 w-auto lg:block" src="vite.svg" alt="Vite logo" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {isLoggedIn && (
                  <>
                    {navigationMapping?.map((link) => (
                      <Link
                        key={link.name}
                        to={link.url}
                        className={`${
                          link.url === pathname && 'bg-red-500'
                        } text-gray-300 hover:bg-red-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!isLoggedIn ? (
              <Link
                to={'/login'}
                className="text-gray-300 hover:bg-red-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Login
              </Link>
            ) : (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsOpenProfile((prev) => !prev)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <User color="#fff" className="h-8 w-8 rounded-full" />
                  </button>
                </div>

                {isOpenProfile && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <Link
                      to={'/my-profile'}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </Link>
                    <LogoutLink
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                    >
                      Log Out
                    </LogoutLink>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        {mobileMenuOpen && (
          <div className="space-y-1 px-2 pb-3 pt-2">
            {!isLoggedIn ? (
              <Link
                to={'/login'}
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Log In
              </Link>
            ) : (
              <>
                {navigationMapping?.map((link) => (
                  <Link
                    key={link.name}
                    to={link.url}
                    className={`${
                      link.url === pathname && 'bg-red-500'
                    } text-gray-300 hover:bg-red-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                  >
                    {link.name}
                  </Link>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
