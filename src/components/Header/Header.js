import React from "react";
import "./Header.css";
import Wobot from '../../Logo/Brand Logo.png'

const Header = () => {
  return (
    <div className="header-container">
      <img src={Wobot} alt="Logo" className="logo" />
      <input type="text" placeholder="Search" className="search-bar" />
    </div>
  );
};

export default Header;
