import React from "react";
import { Column, Row, Container } from "../../components/Bootstrap";

const NoMatch = () => (
  <Container fluid>
    <Row>
      <Column size="md-12">
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
      </Column>
    </Row>
  </Container>
);

export default NoMatch;
