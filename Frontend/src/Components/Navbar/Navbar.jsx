import "./Navbar.scss";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/Logo.webp";
import { useState } from "react";
import { CartModal } from "../CartModal/CartModal";
import { CartIcon } from "./CartIcon/CartIcon";
import { Favorite } from "./Favorite/Favorite";
import { LoginIcon } from "./LoginIcon/LoginIcon";
import { NavLinks } from "./NavLinks/NavLinks";
import { Link } from "react-router-dom";
import { Search } from "./Search/Search";

import { SearchResponsive } from "./Search/SearchResponsive";
import { TopBar } from "./TopBar/TopBar";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <div className="fixed z-50 w-full top-0 left-0 ">
        <TopBar />
        <header
          className={`header font-parkinsans ${showMenu ? "show-menu" : ""}`}
        >
          <div className="hamburger" onClick={toggleMenu}>
            {showMenu ? <X /> : <Menu />}
          </div>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="logo">
              <img src={Logo} alt="logo" />
            </div>
          </Link>
          <nav className={`menu ${showMenu ? "show-menu" : ""}`}>
            <ul>
              <NavLinks closeMenu={closeMenu} />
            </ul>
          </nav>
          <Search />

          <div className="user">
            <div className="favorite">
              <Favorite />
            </div>
            <LoginIcon />
            <SearchResponsive />
            <CartIcon />
            <CartModal open={isOpen} setOpen={setIsOpen} />
          </div>
        </header>
      </div>
    </>
  );
};
