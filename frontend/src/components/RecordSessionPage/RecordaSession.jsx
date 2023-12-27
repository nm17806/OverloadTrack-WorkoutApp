import { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";

const now = new Date();
const localDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
  now.getDate()
).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

export default function RecordaSession({ openAccordion, setOpenAccordion }) {
  const [workoutName, setWorkoutName] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("Select a Workout");
  const [selectedWorkoutId, setselectedWorkoutId] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [formData, setFormData] = useState({
    weight: "",
    reps: "",
  });
  const [recordId, setRecordId] = useState(0);
  const [submittedSetsByExercise, setSubmittedSetsByExercise] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [dateTime, setDateTime] = useState(localDateTime);

  const onSelection = (item, id) => {
    setSelectedWorkout(item);
    setselectedWorkoutId(id);
    setIsFormSubmitted(false); // Reset form submitted flag when workout selection changes
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const sqlDateTime = dateTime.replace("T", " ") + ":00";
    // Fetch workout exercises when a workout is selected
    axios
      .get(`api/workouts/${selectedWorkoutId}`)
      .then(function (res) {
        // handle success
        setWorkoutExercises(res.data);
        setIsFormSubmitted(true); // Set form submitted flag
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });

    axios
      .post(`api/sessions/record`, {
        workout_date: sqlDateTime,
        template_id: selectedWorkoutId,
      })
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

    setSubmittedSetsByExercise((prevSets) => {
      const updatedSets = [
        ...(prevSets[exerciseId] || []),
        {
          record_id: recordId,
          exercise_id: exerciseId,
          weight: formData.weight,
          reps: formData.reps,
        },
      ];
      return {
        ...prevSets,
        [exerciseId]: updatedSets,
      };
    });

    console.log(submittedSetsByExercise);
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
    Object.values(submittedSetsByExercise).forEach((sets) => {
      sets.forEach((set) => {
        postSetToBackend(set);
      });
    });
    window.location.reload();
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

  const handleAccordionClick = (eventKey) => {
    setOpenAccordion(openAccordion === eventKey ? null : eventKey);
    console.log(openAccordion);
  };

  return (
    <Container>
      {isFormSubmitted ? (
        <div>
          <h2>{selectedWorkout}</h2>
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

          <Form.Control
            onChange={(e) => {
              setDateTime(e.target.value);
            }}
            className="p-3 w-75 d-block mx-auto"
            type="datetime-local"
            defaultValue={localDateTime}
          />

          <br />
          <Button className="w-50" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
      <br />
      {/* accordions for each exercise in the workout */}
      {workoutExercises &&
        workoutExercises.map((exercise, index) => (
          <div key={exercise.id}>
            <Accordion activeKey={openAccordion}>
              <Accordion.Item eventKey={exercise.exercise_id.toString()} key={index}>
                <Accordion.Header onClick={() => handleAccordionClick(exercise.exercise_id.toString())}>
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
                  {submittedSetsByExercise[exercise.exercise_id] &&
                    submittedSetsByExercise[exercise.exercise_id].map((set, index) => (
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
