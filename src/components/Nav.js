import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div className="links">
        <Link className="li li-home" to="/">
          Home
        </Link>
        <Link className="li li-register" to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
