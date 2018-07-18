import React, { Component } from "react";

const Scoreboard = props => (
    <nav className="navbar navbar-light">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">Player: {props.user}</li>
            <li className="nav-item">Score: {props.score}</li>
            <li className="nav-item">Life: {props.life}</li>
        </ul>
    </nav>
);

export default Scoreboard;
