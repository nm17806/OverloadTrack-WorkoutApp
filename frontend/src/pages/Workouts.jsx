import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchWorkouts from "../components/WorkoutsPage/FetchWorkouts";
import AddWorkoutForm from "../components/WorkoutsPage/AddWorkoutForm";

export default function Workouts() {
  return (
    <Container>
      <Row className="workoutsRow">
        <Col xs={12} md={8}>
          <FetchWorkouts />
        </Col>
        <Col xs={12} md={4}>
          <AddWorkoutForm />
          <div>Add exercises to a workout</div>
        </Col>
      </Row>
    </Container>
  );
}
