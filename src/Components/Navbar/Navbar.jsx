import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/logo.png";
import { useState } from "react";
import { CartModal } from "../CartModal/CartModal";
import { CartIcon } from "./CartIcon/CartIcon";
import { Favorite } from "./Favorite/Favorite";
import { LoginIcon } from "./LoginIcon/LoginIcon";
import { TopBar } from "./TopBar/TopBar";
import { NavLinks } from "./NavLinks/NavLinks";
import { Link } from "react-router-dom";
import { Search } from "./Search/Search";

import { SearchResponsive } from "./Search/SearchResponsive";

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
      <div className="container">
        <TopBar />
      </div>
      <header className={`header ${showMenu ? "show-menu" : ""}`}>
        <div className="hamburger" onClick={toggleMenu}>
          <FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
        </div>
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <nav className={`menu ${showMenu ? "show-menu" : ""}`}>
          <ul>
            <NavLinks closeMenu={closeMenu} />
          </ul>
        </nav>
        <Search />

        <div className="user">
          <Favorite />
          <LoginIcon />
          <SearchResponsive />
          <CartIcon />
          <CartModal open={isOpen} setOpen={setIsOpen} />
        </div>
      </header>
    </>
  );
};
