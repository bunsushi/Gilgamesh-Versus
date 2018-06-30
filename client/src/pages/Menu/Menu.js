import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import { Row, Column } from "../../components/Bootstrap";
import { UserMenu, ProgressContainer } from "../../components/MenuPage";

class Menu extends Component {

  render() {
    return (
      <Wrapper>
        <Row>
          <Column size="col-md-3">
            <UserMenu />
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