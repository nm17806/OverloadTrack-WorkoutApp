import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchWorkouts from "../components/FetchWorkouts";

export default function Workouts() {
  return (
    <Container>
      <Row className="workoutsRow">
        <Col xs={12} md={8}>
          <FetchWorkouts />
        </Col>
        <Col xs={12} md={4}>
          <div>Add a Workout</div>
          <div>Add exercises to a workout</div>
        </Col>
      </Row>
    </Container>
  );
}
