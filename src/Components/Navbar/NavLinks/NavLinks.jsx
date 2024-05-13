import { NavLink } from "react-router-dom";

const link = [
  { name: "Inicio", to: "/" },
  { name: "Hombre", to: "/hombre" },
  { name: "Mujer", to: "/mujer" },
  { name: "Chicos", to: "/chicos" },
  { name: "Calzado", to: "/calzado" },
];
export const NavLinks = ({ closeMenu }) => {
  return (
    <>
      {link.map((item) => (
        <li key={item.name}>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : null)}
            to={item.to}
            onClick={closeMenu}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </>
  );
};
