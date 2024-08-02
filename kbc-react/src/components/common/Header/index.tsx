import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants/routes";
import ProfileComponent from "./profile";
import { authStore } from "../../../service/store/auth";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userData } = authStore((state) => state);

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link
            to={ROUTES.myQuiz}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            My quiz
          </Link>
          <Link
            to={ROUTES.leaderboard}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Leaderboard
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userData?.accessToken ? (
            <ProfileComponent />
          ) : (
            <div className="flex max-lg:ml-auto space-x-3">
              <Link
                to={ROUTES.signIn}
                className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-indigo-600 bg-indigo-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                to={ROUTES.signup}
                className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-indigo-600 bg-indigo-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-indigo-600"
              >
                Sign up
              </Link>

              <button id="toggleOpen" className="lg:hidden">
                <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="asdfdsf" className="-m-1.5 p-1.5">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only"></span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-16">
                <Link
                  to={ROUTES.myQuiz}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-800 hover:bg-gray-50"
                >
                  My quiz
                </Link>
                <Link
                  to={ROUTES.leaderboard}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-800 hover:bg-gray-50"
                >
                  Leaderboard
                </Link>
                {!userData?.accessToken && (
                  <>
                    <button className="block px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-indigo-600 bg-indigo-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-indigo-600">
                      Login
                    </button>
                    <button className="block px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-indigo-600 bg-indigo-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-indigo-600">
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
