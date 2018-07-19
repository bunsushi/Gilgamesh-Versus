import React from "react";
import { Link } from "react-router-dom";
import { Row, Column } from "../../Bootstrap";

const Progress = props => (
    <div className="progress-container">
        <Row>
            <Column size="col-md-9">
                {/* The tablet number should correspond to the player's current level. We can hardcode this for now because we aren't building out past Tablet I ;3 */}
                <h1>Tablet I</h1>
                {/* This tag line should correspond to the current level w/in a tablet */}
                <h5 className="quote">He who saw the Deep, the country's foundation...</h5>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: (props.xp / 80) * 100 + "%" }}></div>
                </div>
                <div id="points-achievements-reset">
                    {/* Correspond to the number of points earned; pass this percentage into the width value of progress-bar */}
                    <h5>{props.xp} / 80 XP</h5>
                    {/* Correspond to the number of achievements earned; */}
                    <h5>{props.achievements} / 2 Achievements</h5>
                    {/* On-click sets progress back to 0 */}
                </div>
                <button className="btn btn-primary">Reset Progress?</button>
            </Column>
            <Column size="col-md-3">
                <Link to="/game" onClick={props.onClick}>
                    <div id="resume-game">
                    <div id="play-button"><i className="fas fa-play"></i></div>
                    </div>
                </Link>
            </Column>
        </Row>
    </div>
);

export default Progress;