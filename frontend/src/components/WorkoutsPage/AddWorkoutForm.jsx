import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";

export default function AddWorkoutForm() {
  const { addWorkout } = useWorkoutsContext();

  const [workout, setWorkout] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (workout) {
      try {
        setIsLoading(true);
        await addWorkout(workout);

        setWorkout("");
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="addExerciseForm">
      <h3 className="exerciseFormTitle">Add a Workout</h3>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInputExercise" label="Workout Name" className="mb-3">
          <Form.Control
            onChange={(e) => setWorkout(e.target.value)}
            value={workout}
            type="text"
            placeholder="eg. Chest Press"
          />
        </FloatingLabel>
        {isLoading ? (
          <Button className="exerciseFormBtn" variant="primary" disabled>
            Submitting...
          </Button>
        ) : (
          <Button className="exerciseFormBtn" variant="primary" type="submit">
            Submit
          </Button>
        )}
        <br />
        {error && (
          <div className="error">
            Something Went Wrong! <br />
            Please try again later.
          </div>
        )}
      </Form>
    </div>
  );
}
