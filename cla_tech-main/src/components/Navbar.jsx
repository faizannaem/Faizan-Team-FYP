import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import logoImage from "../assets/images/logo.png";
import { motion } from "framer-motion";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

import "../assets/css/navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [showUserProfile, setShowUserProfile] = useState(false); // State for toggling user profile menu

  // Accessing Auth0 hooks
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  const cart = useSelector((state) => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
  };

  return (
    <>
      <header
        className={`header-top ${
          visible ? "header-top-visible" : "header-hidden"
        }`}
      >
        <div className="header-seb-container">
          <div className="cla-logo">
            <Link to="/">
              <img src={logoImage} alt="logo" />
            </Link>
          </div>
          <div className="ads-discount-main-container">
            <div className="ads-discount-container">
              <span>40% off for Graphic Cards</span>
            </div>
          </div>
          <div className="login-navbar-container">
            <div className="user-login">
              <div className="login-container">
                {!isAuthenticated ? (
                  <button
                    onClick={() => loginWithRedirect()}
                    className="login-btn"
                  >
                    <CiLogin className="login-icon" />
                    <span> Log In</span>
                  </button>
                ) : (
                  <div className="user-profile">
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="userImage"
                      onClick={toggleUserProfile}
                    />
                    {showUserProfile && (
                      <div className="user-profile-manu">
                        <h2 className="user-name">{user.name}</h2>
                        <p className="user-email">{user.email}</p>
                        <button
                          onClick={() =>
                            logout({ returnTo: window.location.origin })
                          }
                          className="logout-btn"
                        >
                          Log Out
                          <CiLogout className="logout-icon" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`navbar-main-container ${
          visible ? "navbar-visible" : "navbar-hidden"
        }`}
      >
        <div className={`navbar-sub-container ${showMenu ? "show" : ""}`}>
          <div className="hamburger" onClick={toggleMenu}>
            {showMenu ? (
              <AiOutlineClose className="humburger-close-btn" />
            ) : (
              <AiOutlineMenu />
            )}
          </div>
          <div className={`nav ${showMenu ? "show" : ""}`}>
            <ul>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/" className="link" onClick={toggleMenu}>
                  Home
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/product" className="link" onClick={toggleMenu}>
                  Products
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/about" className="link" onClick={toggleMenu}>
                  About
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/contact" className="link" onClick={toggleMenu}>
                  Contact
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/cart" className="link" onClick={toggleMenu}>
                  <span>
                    <CiShoppingCart className="shop-icon" />
                    {cartCount > 0 && (
                      <span className="cart-badge">{cartCount}</span>
                    )}
                  </span>
                </Link>
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
