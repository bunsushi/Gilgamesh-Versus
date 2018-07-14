import React, { Component } from "react";

const Scoreboard = props => (
    <nav className="navbar">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">Score: {props.score}</li>
            <li className="nav-item">Life: {props.life}</li>
            <li className="nav-item">Mace: {props.hasMace}</li>
        </ul>
    </nav>
);

export default Scoreboard;
