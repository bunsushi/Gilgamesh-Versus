import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import { Row, Column } from "../../components/Bootstrap";
import { UserMenu, ProgressContainer } from "../../components/MenuPage";
import API from "../../utils/API";

class Menu extends Component {

  state = {
    user: {},
    achievement: {}
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
        console.log(this.state);
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

  render() {
    return (
      <Wrapper>
        <Row>
          <Column size="col-md-3">
            <UserMenu user={this.state.user} onClick={this.signoutUser} />
          </Column>
          <Column size="col-md-9">
            <ProgressContainer />
          </Column>
        </Row>
      </Wrapper>
    );
  }
}

export default Menu;