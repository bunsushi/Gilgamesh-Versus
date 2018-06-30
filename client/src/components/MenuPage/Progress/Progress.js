import React from "react";
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
                    <div className="progress-bar progress-bar-striped progress-bar-animated"></div>
                </div>
                <div id="points-achievements-reset">
                    {/* Correspond to the number of points earned; pass this percentage into the width value of progress-bar */}
                    <h5>40 / 100 XP</h5>
                    {/* Correspond to the number of achievements earned; */}
                    <h5>2 / 4 Achievements</h5>
                    {/* On-click sets progress back to 0 */}
                </div>
                <button className="btn btn-primary">Reset Progress?</button>
            </Column>
            <Column size="col-md-3">
                <div id="resume-game-button">
                    <div id="resume-game"></div>
                    <h4>PLAY</h4>
                </div>
            </Column>
        </Row>
    </div>
);

export default Progress;