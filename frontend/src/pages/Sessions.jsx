import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchSession from "../api/sessions/FetchSession";

export default function Workouts() {
  return (
    <Container>
      <Row className="workoutsRow">
        <Col xs={12} md={8}>
          <div>Fetch Sessions</div>
        </Col>
        <Col xs={12} md={4}>
          <div>Start a Session</div>
          <FetchSession />
        </Col>
      </Row>
    </Container>
  );
}
