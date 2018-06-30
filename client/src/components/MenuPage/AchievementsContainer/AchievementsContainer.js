import React from "react";

const AchievementsContainer = props => (
    <div className="progress-container">
        <h1>{props.title}</h1>
        {props.children}
    </div>
);

export default AchievementsContainer;