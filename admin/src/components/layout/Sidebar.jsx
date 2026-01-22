import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    name: "Dashboard",
    icon: (
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
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    to: "/",
    description: "Store overview",
  },
  {
    name: "Add Product",
    icon: (
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
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),
    to: "/addproduct",
    description: "Create new products",
  },
  {
    name: "Product List",
    icon: (
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
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    to: "/productlist",
    description: "Manage existing products",
  },
];

export const Sidebar = ({ onClose }) => {
  return (
    <nav className="bg-white h-screen w-64 shadow-xl border-r border-gray-200 flex flex-col relative overflow-hidden">
      <div className="relative p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 p-3 rounded-xl">
            <svg
              className="w-8 h-8 text-gray-900"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-900 text-lg font-bold tracking-wide">
              Dashboard
            </h1>
            <p className="text-gray-500 text-xs">Store Management</p>
          </div>
        </div>
      </div>

      <div className="relative flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 overflow-hidden border ${
                  isActive
                    ? "bg-gray-50 text-gray-900 border-gray-300 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gray-900 rounded-r-full"></div>
                  )}

                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 transition-colors duration-200 ${
                      isActive ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {item.description}
                    </div>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="relative p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="text-gray-900 text-sm font-medium">
                System Status
              </div>
              <div className="text-green-600 text-xs">
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
