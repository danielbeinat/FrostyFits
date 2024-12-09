import { Link } from "react-router-dom";

import { ChevronRight, Home } from "lucide-react";

export const Breadcrumbs = ({ product }) => {
  return (
    <nav aria-label="Breadcrumb" className="font-parkinsans">
      <ol className="flex flex-wrap items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <li>
          <Link
            to={"/"}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only">Inicio</span>
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </li>
        <li>
          <Link
            to={`/${product.category.toLowerCase()}`}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            {product.category}
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </li>
        <li>
          <span
            className="text-sm font-medium text-gray-900"
            aria-current="page"
          >
            {product.name}
          </span>
        </li>
      </ol>
    </nav>
  );
};
