import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export default function AddExerciseToWorkout() {
  const [workoutName, setWorkoutName] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("Select a Workout");
  const [exercises, setExercises] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedWorkoutId, setselectedWorkoutId] = useState([]);

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(function CustomMenu(
    { children, style, className, "aria-labelledby": labeledBy },
    ref
  ) {
    const [value, setValue] = useState("");

    return (
      <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-75"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) => !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(selectedItems[0]);
    console.log(selectedWorkoutId);

    if (selectedItems && selectedItems.length > 0) {
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
          // handle success
          console.log(responses);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  const onSelection = (item, id) => {
    setSelectedWorkout(item);
    setselectedWorkoutId(id);
  };

  const handleChange = (e) => {
    // Update the selectedItems array based on the button that was clicked
    // value = Number(value)
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
        console.log(res.data);
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
          <Dropdown.Menu className="w-100" as={CustomMenu}>
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
      </Form>

      <div className="exerciseButtonsDiv" value={selectedItems} onChange={handleChange}>
        {exercises &&
          exercises.map((exercise) => (
            <Button
              type="checkbox"
              key={exercise.exercise_id}
              // variant="outline-primary"
              className="exerciseButtons"
              variant="outline-primary"
              value={exercise.exercise_id}
              onClick={handleChange}
              style={{
                backgroundColor: selectedItems.includes(exercise.exercise_id) ? "blue" : "transparent",
                color: selectedItems.includes(exercise.exercise_id) ? "white" : "blue",
              }}
            >
              {exercise.exercise_name + " " + exercise.body_part}
            </Button>
          ))}
      </div>
    </div>
  );
}
