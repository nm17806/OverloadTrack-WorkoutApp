import { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";

export default function RecordaSession() {
  const [workoutName, setWorkoutName] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("Select a Workout");
  const [selectedWorkoutId, setselectedWorkoutId] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [formData, setFormData] = useState({
    weight: "",
    reps: "",
  });
  const [recordId, setRecordId] = useState(0); // This is the record_id from the sessions table

  // Update submittedSets state to store an array of sets for each exercise
  const [submittedSets, setSubmittedSets] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onSelection = (item, id) => {
    setSelectedWorkout(item);
    setselectedWorkoutId(id);
    setIsFormSubmitted(false); // Reset form submitted flag when workout selection changes
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Fetch workout exercises when a workout is selected
    axios
      .get(`api/workouts/${selectedWorkoutId}`)
      .then(function (res) {
        // handle success
        setWorkoutExercises(res.data);
        console.log(res.data);
        setIsFormSubmitted(true); // Set form submitted flag
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });

    axios
      .post(`api/sessions/${selectedWorkoutId}`)
      .then(function (res) {
        // handle success
        setRecordId(res.data.id);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  };

  const handleSetFormSubmit = (e, exerciseId) => {
    e.preventDefault();

    // Perform the logic to submit the form data (weight and reps) to the server
    // I need to save this information in a format that matches the backend database.
    // I should only post once I have everything, and post many in one go.

    setSubmittedSets((prevSets) => [
      ...prevSets,
      {
        record_id: recordId,
        exercise_id: exerciseId,
        weight: formData.weight,
        reps: formData.reps,
      },
    ]);
    console.log(submittedSets);
  };

  const postSetToBackend = (set) => {
    axios
      .post("api/sessions", set)
      .then(function (res) {
        // handle success if needed
        console.log(res.data);
      })
      .catch(function (err) {
        // handle error if needed
        console.log(err);
      });
  };

  const handleWorkoutSubmit = () => {
    submittedSets.forEach((set) => {
      postSetToBackend(set);
    });
  };

  useEffect(() => {
    axios
      .get("api/workouts")
      .then(function (res) {
        // handle success
        setWorkoutName(res.data);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  }, []);

  return (
    <Container>
      {isFormSubmitted ? (
        <div>
          <h2>{selectedWorkout}</h2>
          {/* Additional information or UI for the selected workout can be added here */}
        </div>
      ) : (
        <Form className="text-center" onSubmit={handleFormSubmit}>
          <Dropdown>
            <Dropdown.Toggle className="p-3 w-75" variant="outline-secondary">
              {selectedWorkout}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-75">
              {workoutName &&
                workoutName.map((workout) => (
                  <Dropdown.Item
                    key={workout.template_id}
                    onClick={() => onSelection(workout.template_name, workout.template_id)}
                  >
                    {workout.template_name}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <Button className="w-50" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
      <br />
      {/* accordions for each exercise in the workout */}
      {workoutExercises &&
        workoutExercises.map((exercise) => (
          <div key={exercise.id}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey={exercise.id}>
                <Accordion.Header>
                  {exercise.exercise_name} ({exercise.body_part})
                </Accordion.Header>
                <Accordion.Body>
                  <form onSubmit={(e) => handleSetFormSubmit(e, exercise.exercise_id)}>
                    Weight:
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          weight: parseFloat(e.target.value),
                        })
                      }
                    />
                    Reps:
                    <input
                      type="number"
                      value={formData.reps}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reps: parseFloat(e.target.value),
                        })
                      }
                    />
                    <button type="submit">Submit</button>
                  </form>
                </Accordion.Body>
                <Accordion.Body className="text-center text-decoration-underline">Submitted Sets</Accordion.Body>
                <Accordion.Body>
                  {/* Display submitted sets here based on the state */}
                  {submittedSets.map((set, index) => (
                    <div key={index}>
                      Weight: {set.weight}, Reps: {set.reps}
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
      {isFormSubmitted && (
        <div>
          <br />
          {/* Render the new submit button only when the Form dropdown has been submitted */}
          <Button variant="primary" onClick={handleWorkoutSubmit}>
            Submit Button
          </Button>
        </div>
      )}
    </Container>
  );
}
