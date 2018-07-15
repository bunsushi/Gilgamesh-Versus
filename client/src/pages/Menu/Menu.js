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
  };

  componentDidMount() {
    this.getUser();
    this.getAchievements();
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
        this.setState({ achievement: res.data.achievement });
        // console.log(this.state);
        this.checkAchievement();
      })
      .catch(err => console.log(err));
  };

  signoutUser = event => {
    event.preventDefault();
    API.signoutUser()
      .then(res => {
        console.log(res.data);
        if (res.data === true) {
          this.props.history.push("/");
        }
      })
      .catch(err => console.log(err));
  };

  checkAchievement = () => {
    Object.keys(this.state.achievement).forEach(key => {
      Object.keys(this.state.badges).forEach(token => {
        if (key === this.state.badges[token].name) {
          this.state.badges[token].earned = this.state.achievement[key]
        }
      });
      Object.keys(this.state.weapons).forEach(token => {
        if (key === this.state.weapons[token].name) {
          this.state.weapons[token].earned = this.state.achievement[key]
        }
      });
    });
  };

  render() {
    this.checkAchievement();
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