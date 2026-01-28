import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user.jpg";

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user: authUser, logout } = useAuth();

  const menuItems = [
    { label: "Profile Settings", action: () => {} },
    { label: "Notifications", action: () => {} },
    { label: "Help & Support", action: () => {} },
    { label: "Logout", action: logout, danger: true },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm relative z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="rounded-xl p-2">
            <img
              className="w-32 h-10 object-contain"
              src={logo}
              alt="Frosty Fits Admin"
            />
          </div>
          <div className="hidden md:block">
            <h1 className="text-gray-900 text-xl font-bold tracking-wide">
              Admin Panel
            </h1>
            <p className="text-gray-500 text-sm">Manage your store</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Online</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 bg-white border border-gray-200 rounded-xl p-2 hover:bg-gray-50 transition-all duration-200 group shadow-sm"
            >
              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-gray-300 transition-colors duration-200"
                  src={user}
                  alt="Admin User"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
              </div>

              <div className="hidden md:block text-left">
                <p className="text-gray-900 text-sm font-semibold">
                  {authUser?.name || "Admin User"}
                </p>
                <p className="text-gray-500 text-xs">Administrator</p>
              </div>

              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                ></div>

                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-20 slide-in">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                        src={user}
                        alt="Admin User"
                      />
                      <div>
                        <p className="text-gray-900 font-semibold">
                          {authUser?.name || "Admin User"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {authUser?.email || "admin@frostyfits.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition-colors duration-200 flex items-center space-x-3 ${
                          item.danger
                            ? "text-red-600 hover:bg-red-50"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {item.label === "Logout" && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                        )}
                        {item.label === "Profile Settings" && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        )}
                        {item.label === "Notifications" && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12-1.21 12-2.683m-12 2.683a17.925 17.925 0 01-7.132-8.317M12 21V9m0 0a3 3 0 103 3 3 3 0 00-3-3z"
                            />
                          </svg>
                        )}
                        {item.label === "Help & Support" && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                        <span className="text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
