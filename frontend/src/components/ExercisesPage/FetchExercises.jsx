import ExerciseCards from "./ExerciseCards";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import _ from "lodash";
import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useExercisesContext } from "../Hooks/useExercisesContext";

export default function FetchExercises() {
  const { exercises } = useExercisesContext();

  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    // Use lodash to filter the exercises based on the search query
    const filtered = _.filter(
      exercises,
      (exercise) =>
        _.includes(exercise.exercise_name.toLowerCase(), searchQuery.toLowerCase()) ||
        _.includes(exercise.body_part.toLowerCase(), searchQuery.toLowerCase())
    );

    // Update the filteredExercises state
    setFilteredExercises(filtered);
  }, [exercises, searchQuery]);

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
