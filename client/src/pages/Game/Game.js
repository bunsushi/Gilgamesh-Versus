import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import PhaserContainer from "../../components/PhaserContainer";
import { Container } from "../../components/Bootstrap";

class Game extends Component {

  render() {
    return (
      <Wrapper>
        <Container size="container-fluid">
          <PhaserContainer />
        </Container>
      </Wrapper>
    );
  }
}

export default Game;