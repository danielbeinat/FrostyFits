import { NavLink } from "react-router-dom";

const links = [
  { name: "Inicio", to: "/" },
  { name: "Hombre", to: "/men" },
  { name: "Mujer", to: "/women" },
  { name: "Chicos", to: "/kid" },
  { name: "Calzado", to: "/shoes" },
  { name: "Favoritos", to: "/login", responsive: true },
];

export const NavLinks = ({ closeMenu }) => {
  return (
    <>
      {links.map((item) => (
        <li
          key={item.name}
          className={`${item.responsive ? "md:hidden" : "relative"}`}
        >
          <NavLink
            to={item.to}
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={({ isActive }) =>
              `block px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg
              ${
                isActive
                  ? "text-gray-800 bg-gray-200"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-300"
              }`
            }
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </>
  );
};
