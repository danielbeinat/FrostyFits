import { NavLink } from "react-router-dom";

const link = [
  { name: "Inicio", to: "/" },
  { name: "Hombre", to: "/men" },
  { name: "Mujer", to: "/women" },
  { name: "Chicos", to: "/kid" },
  { name: "Calzado", to: "/shoes" },
];
export const NavLinks = ({ closeMenu }) => {
  return (
    <>
      {link.map((item) => (
        <li key={item.name}>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : null)}
            to={item.to}
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </>
  );
};
