import { useState } from "react";
import logo from "../assets/logo.png";
import user from "../assets/user.jpg";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="flex justify-between bg-white items-center px-4 py-4 shadow-md">
      <img className="w-[150px] h-[50px]" src={logo} alt="logo" />

      <div className="flex items-center  pr-4 gap-2">
        <img
          className="w-[45px] h-[45px] rounded-full shadow-lg"
          src={user}
          alt="user"
        />
        <button onClick={() => setOpen(!open)}>
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {open && (
          <div className="fixed flex flex-col gap-2 items-start w-[200px] h-auto shadow-lg bg-white right-[20px] top-[70px] border-2 border-gray-200 rounded">
            <button className="px-4 rounded">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};
