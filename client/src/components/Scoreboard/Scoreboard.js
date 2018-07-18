import React from "react";

const Scoreboard = props => (
    <nav className="navbar navbar-light">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">Player: {props.user}</li>
            <li className="nav-item">Score: {props.score}</li>
            <li className="nav-item">Life: {props.life}</li>
        </ul>
        <ul className="navbar-nav ml-auto">
            <li className="nav-item float-right">Find the mace and hit space to rob the citizens of Uruk!</li>
        </ul>
    </nav>
);

export default Scoreboard;
