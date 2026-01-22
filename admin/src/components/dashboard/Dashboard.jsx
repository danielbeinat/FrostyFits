import { useState, useEffect } from "react";
import { API_URL } from "../../config/config.js";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStockProducts: 0,
    categories: {},
    recentProducts: [],
    topCategories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/allproducts`);
      const data = await response.json();
      const products = data.products || [];

      if (products && Array.isArray(products)) {
        // Calculate statistics
        const totalProducts = products.length;
        const totalStock = products.reduce(
          (sum, product) => sum + (product.stock || 0),
          0,
        );
        const lowStockProducts = products.filter(
          (product) => (product.stock || 0) < 10,
        ).length;

        // Categories breakdown
        const categories = products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});

        // Recent products (last 5 added)
        const recentProducts = products
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        // Top categories by product count
        const topCategories = Object.entries(categories)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 4)
          .map(([name, count]) => ({ name, count }));

        setStats({
          totalProducts,
          totalStock,
          lowStockProducts,
          categories,
          recentProducts,
          topCategories,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: "📦",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      trend: null,
    },
    {
      title: "Total Stock",
      value: stats.totalStock.toLocaleString(),
      icon: "📊",
      color: "bg-green-50 text-green-600 border-green-200",
      trend: null,
    },
    {
      title: "Low Stock Items",
      value: stats.lowStockProducts,
      icon: "⚠️",
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
      trend: stats.lowStockProducts > 0 ? "warning" : "good",
    },
    {
      title: "Categories",
      value: Object.keys(stats.categories).length,
      icon: "🏷️",
      color: "bg-purple-50 text-purple-600 border-purple-200",
      trend: null,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-3">
          <svg
            className="animate-spin w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-gray-700">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your store performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl p-6 border-2 ${stat.color} shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                {stat.trend === "warning" && (
                  <p className="text-xs mt-2 font-medium">⚠️ Needs attention</p>
                )}
                {stat.trend === "good" && (
                  <p className="text-xs mt-2 font-medium">✅ All good</p>
                )}
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Products
          </h2>
          <div className="space-y-3">
            {stats.recentProducts.map((product, index) => (
              <div
                key={product._id}
                className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200"
              >
                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ${product.price} • Stock: {product.stock || 0}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.category === "women"
                        ? "bg-pink-50 text-pink-700"
                        : product.category === "men"
                          ? "bg-blue-50 text-blue-700"
                          : product.category === "kid"
                            ? "bg-green-50 text-green-700"
                            : "bg-purple-50 text-purple-700"
                    }`}
                  >
                    {product.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Top Categories
          </h2>
          <div className="space-y-4">
            {stats.topCategories.map((category, index) => {
              const percentage = (
                (category.count / stats.totalProducts) *
                100
              ).toFixed(1);
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {category.count} products ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {stats.lowStockProducts > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800">
                Low Stock Alert
              </h3>
              <p className="text-yellow-700 mt-1">
                You have {stats.lowStockProducts} products with less than 10
                units in stock. Consider restocking soon to avoid running out of
                popular items.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
