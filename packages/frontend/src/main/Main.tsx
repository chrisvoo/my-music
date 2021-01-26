import React from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import './Main.css';

export function Main() {
  return (
    <Container as="main">
      <Row>
        <Col className="col-sm-8">
          Main content here
        </Col>
        <Col className="col-sm-4">
          <Container fluid>
            <Row>
              <Col>
                <Card>
                  <Card.Header as="h5">Stats</Card.Header>
                  <Card.Body>
                    <Card.Title as="h6" className="text-muted">Info about your music collection</Card.Title>
                    <Card.Text>
                      Last scan occurred on Dec 28<sup>th</sup>&nbsp;
                      2020 pointed out <b>120 files</b> for <b>1.097 GB</b>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Header as="h5">Search box</Card.Header>
                  <Card.Body>
                    <Card.Title as="h6" className="text-muted">Use these filter for searching your music</Card.Title>
                    <Card.Text>
                      saffasf sf <br />
                      saffasf sf <br />
                      saffasf sf <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
