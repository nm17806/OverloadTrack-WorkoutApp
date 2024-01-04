import ExerciseCards from "./ExerciseCards";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function FetchExercises() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchExercises = () => {
      try {
        axios
          .get("api/exercises", {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          })
          .then((res) => {
            setExercises(res.data);
          })
          .catch((error) => {
            console.error("Error fetching exercises:", error);
          });
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, [currentUser]);

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

  console.log(filteredExercises); // Log filtered exercises for debugging

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
