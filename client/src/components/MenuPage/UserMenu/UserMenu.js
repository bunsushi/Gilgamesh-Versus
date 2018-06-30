import React from "react";

const UserMenu = props => (
    <div className="user-menu">
        <div id="menu-gilgamesh-background">
            <img src="assets/images/gilgamesh.svg" alt="Cat Gilgamesh" id="menu-gilgamesh" />
        </div>
        <h1>Hello,</h1>
        {/* pass in our username props from Passport */}
        <h1>USERNAME!</h1>
        <div id="quit-button">QUIT</div>
    </div>
);

export default UserMenu;