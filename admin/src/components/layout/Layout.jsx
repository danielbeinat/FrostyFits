import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <div
          className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="absolute inset-0 lg:relative">
            <Sidebar onClose={() => setSidebarOpen(false)} />
            {sidebarOpen && (
              <div
                className="absolute inset-0 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </div>
        </div>

        <main className="flex-1 min-h-screen lg:ml-0 bg-white">
          <div className="relative">
            <div className="lg:hidden fixed top-20 left-4 z-40">
              <button
                onClick={() => setSidebarOpen(true)}
                className="bg-white p-3 rounded-xl shadow-md hover:bg-gray-50 transition-all duration-200 border border-gray-200 text-gray-900"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            <div className="pt-4 lg:pt-8 px-4 lg:px-8">
              <div className="bg-white rounded-tl-3xl lg:rounded-tl-[3rem] shadow-2xl min-h-[calc(100vh-6rem)]">
                <div className="p-6 lg:p-10">{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
