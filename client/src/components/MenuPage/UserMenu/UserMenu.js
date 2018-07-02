import React from "react";
import { Link } from "react-router-dom";

const UserMenu = props => (
    <div className="user-menu">
        <div id="menu-gilgamesh-background">
            <img src="assets/images/gilgamesh.svg" alt="Cat Gilgamesh" id="menu-gilgamesh" />
        </div>
        <h1>Hello,</h1>
        {/* pass in our username props from Passport */}
        <h1>{props.user.username}!</h1>
        <div id="quit-button">
            <Link to="/signout" onClick={props.onClick}>QUIT</Link>
        </div>
    </div>
);

export default UserMenu;