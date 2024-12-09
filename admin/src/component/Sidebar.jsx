import React from "react";
import { NavLink } from "react-router-dom";

const link = [
  {
    name: "Add Product",
    icon: (
      <svg
        className="w-6 h-6 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    to: "/addproduct",
  },
  {
    name: "Product List",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
        />
      </svg>
    ),
    to: "/productlist",
  },
];

export const Sidebar = () => {
  return (
    <nav className="flex flex-col py-4 h-screen w-[200px] shadow-lg border-t border-gray-200 bg-white">
      <div className="flex items-center justify-center gap-2">
        <svg
          className="w-8 h-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        <h1 className="text-sm font-bold text-center">Admin</h1>
      </div>
      <hr />
      <ul className="flex flex-col px-4 py-4 gap-4">
        {link.map((item, index) => (
          <li className="" key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 flex items-center gap-2 font-medium px-2 rounded py-2"
                  : "hover:bg-gray-200 flex items-center gap-2 py-2 px-2  rounded "
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
