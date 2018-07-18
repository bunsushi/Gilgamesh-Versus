import React from "react";

const Navbar = props => (
    <nav className="navbar">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">News</a>
            </li>
        </ul>
    </nav>
);

export default Navbar;