import React from "react";

const Achievements = props => (
    <div className="badge-container badge-earned">
        <img className="badge-image" src={props.image} alt={props.name} />
    </div>
);

export default Achievements;