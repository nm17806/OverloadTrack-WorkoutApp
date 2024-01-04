import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AddWorkoutForm() {
  const [workout, setWorkout] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (workout) {
      setIsLoading(true);
      axios
        .post(
          "api/workouts",
          {
            template_name: workout,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        )
        .then(function (res) {
          setWorkout("");
          console.log(res);
        })
        .catch(function (err) {
          setError(err);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
