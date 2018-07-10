import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import { Container } from "../../components/Bootstrap";

class Home extends Component {

  //TODO: make onClick events for login/sign up buttons, pass in props

  render() {
    return (
      <Wrapper>
        <Container size="container-fluid">
          "Found the game page"
        </Container>
      </Wrapper>
    );
  }
}

export default Home;