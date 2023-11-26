import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
  return (
    <Container className="home">
      <Row>
        <Col xs className="row1 border">
          <h1>Welcome to my APP</h1>
        </Col>
      </Row>
      <Row>
        <Col xs md={6} className="row2 border">
          Column 1
        </Col>
        <Col xs md={6} className="row2 border">
          Column 2
        </Col>
      </Row>
    </Container>
  );
}
