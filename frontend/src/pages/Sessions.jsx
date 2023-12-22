import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ShowSessions from "../components/SessionsPage/ShowSessions";
import { Link } from "react-router-dom";

export default function Sessions() {
  return (
    <Container>
      <Row className="workoutsRow">
        <Col xs={12} md={8}>
          <ShowSessions />
        </Col>
        <Col xs={12} md={4}>
          <Link to="/record-session">
            <button href="/record-session">Start a Session</button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
