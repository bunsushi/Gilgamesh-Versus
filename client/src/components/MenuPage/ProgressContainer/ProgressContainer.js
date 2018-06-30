import React, { Component } from "react";
import Progress from "../Progress";
import AchievementsContainer from "../AchievementsContainer";
import Achievements from "../Achievements";
import badges from "./badges.json";
import weapons from "./weapons.json";

class ProgressContainer extends Component {
    state = {
        badges: badges,
        weapons: weapons
    }

    // Write a function that checks our database to see if a player has earned a badge or a weapon
    // If so, add class "badge-earned"; else default class "badge-image"

    render() {
        return (
            <div>
                <Progress />
                <AchievementsContainer
                    title="Achievements">
                {this.state.badges.map(badge => (
                    <Achievements
                        key={badge.id}
                        image={badge.image}
                        name={badge.name}
                    />
                ))}
                </AchievementsContainer>
                <AchievementsContainer
                    title="Weapons">
                {this.state.weapons.map(weapon => (
                    <Achievements
                        key={weapon.id}
                        image={weapon.image}
                        name={weapon.name}
                    />
                ))}
                </AchievementsContainer>
            </div>
        )
    }
}

export default ProgressContainer;