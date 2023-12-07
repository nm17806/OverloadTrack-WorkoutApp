import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ShowSessions from "../components/SessionsPage/showSessions";

export default function Workouts() {
  return (
    <Container>
      <Row className="workoutsRow">
        <Col xs={12} md={8}>
          <ShowSessions />
        </Col>
        <Col xs={12} md={4}>
          <div>Start a Session</div>
        </Col>
      </Row>
    </Container>
  );
}
