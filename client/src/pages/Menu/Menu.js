import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import { Row, Column } from "../../components/Bootstrap";
import { UserMenu, Progress, Achievements, AchievementsContainer } from "../../components/MenuPage";
import API from "../../utils/API";
import badges from "./badges.json";
import weapons from "./weapons.json";

class Menu extends Component {

  state = {
    user: {},
    achievement: {},
    badges: badges,
    weapons: weapons,
    proceedToLoad: false,
    achvDidLoad: false
  };

  async componentDidMount() {
    this.getUser();
    await this.getAchievements();
  };

  componentDidUpdate() {
    if (this.state.proceedToLoad && !this.state.achvDidLoad) {
      this.checkAchievement();
    }
  };

  getUser = () => {
    API.getUser()
      .then(res => {
        this.setState(res.data);
      })
      .catch(err => console.log(err));
  };

  getAchievements = () => {
    API.getAchievements()
      .then(res => {
        this.setState({
          achievement: res.data.achievement,
          proceedToLoad: true
        });
      })
      .catch(err => console.log(err));
  };

  signoutUser = event => {
    event.preventDefault();
    API.signoutUser()
      .then(res => {
        if (res.data === true) {
          this.props.history.push("/");
        }
      })
      .catch(err => console.log(err));
  };

  checkAchievement = () => {
    // Clone this.state to the newState object
    const newState = this.state;
    // Update newState with results of each forEach loop
    Object.keys(newState.achievement).forEach(key => {
      Object.keys(newState.badges).forEach(token => {
        if (key === newState.badges[token].name) {
          newState.badges[token].earned = newState.achievement[key]
        }
      });
      Object.keys(newState.weapons).forEach(token => {
        if (key === newState.weapons[token].name) {
          newState.weapons[token].earned = newState.achievement[key]
        }
      });
    });
    // Set achvDidLoad to true after loops are complete to prevent infinite re-rendering
    newState.achvDidLoad = true;
    // Replace this.state with newState
    this.setState(newState);
  };

  render() {
    return (
      <Wrapper>
        <Row>
          <Column size="col-md-3">
            <UserMenu user={this.state.user} onClick={this.signoutUser} />
          </Column>
          <Column size="col-md-9">
            <Progress />
            <AchievementsContainer
              title="Achievements">
              {this.state.badges.map(badge => (
                <Achievements
                  key={badge.id}
                  image={badge.image}
                  name={badge.name}
                  className={badge.earned ? 'badge-container badge-earned' : 'badge-container'}
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
                  className={weapon.earned ? 'badge-container badge-earned' : 'badge-container'}
                />
              ))}
            </AchievementsContainer>
          </Column>
        </Row>
      </Wrapper>
    );
  }
}

export default Menu;