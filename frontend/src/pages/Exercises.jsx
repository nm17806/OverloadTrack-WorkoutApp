import Container from "react-bootstrap/Container";
import FetchExercises from "../components/ExercisesPage/FetchExercises";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddExerciseForm from "../components/ExercisesPage/AddExerciseForm";
import { ExercisesContextProvider } from "../context/ExercisesContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Exercises() {
  const { currentUser } = useAuthContext();
  if (!currentUser) {
    // I can set up a component that will tell them they need to create an account with a link to the login page
    return;
  }

  return (
    <ExercisesContextProvider>
      <Container>
        {/* Add a search bar here to search for workouts */}
        <Row className="workoutsRow">
          <Col xs={12} md={8}>
            <FetchExercises />
          </Col>
          <Col xs={12} md={4}>
            {/* This is where the add Exercises will go */}
            <AddExerciseForm />
          </Col>
        </Row>
      </Container>
    </ExercisesContextProvider>
  );
}
