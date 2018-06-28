import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import { Container, Row, Column } from "../../components/Bootstrap";
import UserMenu from "../../components/UserMenu";

class Menu extends Component {

  render() {
    return (
      <Wrapper>
        <Row>
          <Column size="col-md-3">
            <UserMenu />
          </Column>
          <Column size="col-md-9">
            <h1>Here's the Progress Menu</h1>
          </Column>
        </Row>
      </Wrapper>
    );
  }
}

export default Menu;