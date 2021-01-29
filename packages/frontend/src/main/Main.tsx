import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import './Main.css';

export function Main() {
  return (
    <Container as="main">
      <Row>
        <Col>
          Main content here
        </Col>
      </Row>
    </Container>
  );
}
