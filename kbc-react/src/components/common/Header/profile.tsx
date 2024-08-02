import { useState } from "react";
import { capitalizeFirstLetter } from "../../../utils/functions";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants/routes";
import { authAPI } from "../../../service/api/auth";

export default function ProfileComponent() {
  const [profileDropdownload, setProfileDropdownload] = useState(false);
  const user = JSON.parse(
    localStorage.getItem("userKaunBanegaCarorpati") as string
  );

  return (
    <div className="">
      <button
        type="button"
        id="user-menu-button"
        onClick={() => setProfileDropdownload(!profileDropdownload)}
      >
        <img
          className="w-10 h-10 rounded-full border-2 border-indigo-500 p-[2px] object-cover"
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
          alt="img"
        />
      </button>
      {/* Dropdown menu */}
      <div
        className={`z-50 my-1 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow absolute ${
          profileDropdownload ? "" : "hidden"
        }`}
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-black">{`${capitalizeFirstLetter(
            user?.firstName
          )} ${user?.lastName}`}</span>
          <span className="block text-sm truncate">{user?.email}</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a
              href="adsfadsf"
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              My profile
            </a>
          </li>
          <li>
            <Link
              to={ROUTES.myQuiz}
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              My Quiz
            </Link>
          </li>
          <li>
            <button
              onClick={() => authAPI.logout()}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
