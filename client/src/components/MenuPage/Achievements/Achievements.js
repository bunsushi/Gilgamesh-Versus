import React from "react";

const Achievements = props => (
    <div className={props.className}>
        <img className="badge-image" src={props.image} alt={props.name} />
    </div>
);

export default Achievements;