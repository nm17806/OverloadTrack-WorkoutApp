import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddExerciseToWorkout() {
  const [workoutName, setWorkoutName] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("Select a Workout");
  const [exercises, setExercises] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedWorkoutId, setselectedWorkoutId] = useState([]);
  const [error, setError] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedItems && selectedItems.length > 0 && selectedWorkoutId) {
      // Use map to create an array of promises
      const postRequests = selectedItems.map((item) =>
        axios.post("api/workouts/add-exercise", {
          template_id: selectedWorkoutId,
          exercise_id: item,
        })
      );

      // Use Promise.all to wait for all promises to resolve
      Promise.all(postRequests)
        .then(function (responses) {
          console.log(responses);
        })
        .catch(function (error) {
          setError(error);
          console.log(error);
        });
    } else {
      setError(true);
    }
  };

  const onSelection = (item, id) => {
    setSelectedWorkout(item);
    setselectedWorkoutId(id);
  };

  const handleChange = (e) => {
    // Update the selectedItems array based on the button that was clicked
    let { value } = e.currentTarget;
    value = Number(value);
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
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
    axios
      .get("api/exercises")
      .then(function (res) {
        // handle success
        setExercises(res.data);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  }, []);

  return (
    <div className="addExerciseForm">
      <h3 className="workoutsFormTitle">Add an Exercise</h3>
      <Form onSubmit={handleFormSubmit}>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary w-100 p-3">{selectedWorkout}</Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
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
        <Button className="exerciseFormBtn" variant="primary" type="submit">
          Submit
        </Button>
        {error && (
          <div className="error">
            Something Went Wrong! <br></br> Please try again later.
          </div>
        )}
      </Form>

      <div className="exerciseButtonsDiv" value={selectedItems} onChange={handleChange}>
        {exercises &&
          exercises.map((exercise) => (
            <Button
              type="checkbox"
              key={exercise.exercise_id}
              className="exerciseButtons"
              variant="outline-primary"
              value={exercise.exercise_id}
              onClick={handleChange}
              style={{
                backgroundColor: selectedItems.includes(exercise.exercise_id) ? "blue" : "transparent",
                color: selectedItems.includes(exercise.exercise_id) ? "white" : "blue",
              }}
            >
              {exercise.exercise_name + " (" + exercise.body_part + ")"}
            </Button>
          ))}
      </div>
    </div>
  );
}
