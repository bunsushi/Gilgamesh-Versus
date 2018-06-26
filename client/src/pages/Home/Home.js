import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import { Container, Row, Column } from "../../components/Bootstrap";

class Home extends Component {

  render() {
    return (
      <Wrapper>
        <Container size="container-fluid">
          <Row>
            <Column size="col-md-12">
              <h1>Hello, Gilgamesh</h1>
            </Column>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default Home;