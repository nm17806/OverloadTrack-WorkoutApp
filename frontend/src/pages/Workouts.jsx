import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchWorkouts from "../components/WorkoutsPage/FetchWorkouts";
import AddWorkoutForm from "../components/WorkoutsPage/AddWorkoutForm";
import AddExerciseToWorkout from "../components/WorkoutsPage/AddExerciseToWorkout";
import { useAuthContext } from "../hooks/useAuthContext";
import { WorkoutsContextProvider } from "../context/WorkoutsContext";

export default function Workouts() {
  const { currentUser } = useAuthContext();
  if (!currentUser) {
    return;
  }
  return (
    <WorkoutsContextProvider>
      <Container>
        <Row className="workoutsRow">
          <Col xs={12} md={8}>
            <FetchWorkouts />
          </Col>
          <Col xs={12} md={4}>
            <AddWorkoutForm />
            <br />
            <AddExerciseToWorkout />
          </Col>
        </Row>
      </Container>
    </WorkoutsContextProvider>
  );
}
