import ExerciseCards from "./ExerciseCards";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function FetchExercises() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Use lodash to filter the exercises based on the search query
    const filtered = _.filter(
      exercises,
      (exercise) =>
        _.includes(exercise.exercise_name.toLowerCase(), query.toLowerCase()) ||
        _.includes(exercise.body_part.toLowerCase(), query.toLowerCase())
    );

    // Update the filteredExercises state
    setFilteredExercises(filtered);
  };

  useEffect(() => {
    axios
      .get("api/exercises")
      .then(function (res) {
        // handle success
        setExercises(res.data);
        // Initially, set filteredExercises to all exercises
        setFilteredExercises(res.data);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <Form>
        <FloatingLabel controlId="floatingInputSeartch" label="Search Exercises" className="mb-3">
          <Form.Control value={searchQuery} onChange={handleSearch} type="text" placeholder="eg. Chest" />
        </FloatingLabel>
      </Form>

      <div className="fetchExercises">
        <Row xs={2} sm={3} lg={4} className="exercisesRow">
          {filteredExercises.map((exercise) => (
            <ExerciseCards key={exercise.exercise_id} exercise={exercise} />
          ))}
        </Row>
      </div>
    </React.Fragment>
  );
}
