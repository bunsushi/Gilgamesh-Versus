import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import { Container, Row, Column } from "../../components/Bootstrap";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Title from "../../components/Title";
import Login from "../../components/Login";

class Home extends Component {

  //TODO: make onClick events for login/sign up buttons, pass in props

  render() {
    return (
      <Wrapper>
        <Container size="container-fluid">
          <Navbar />
          <Row>
            <Column size="col-md-6">
              <Header />
            </Column>
            <Column size="col-md-6">
              <Title />
              <Login />
            </Column>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default Home;