import { useEffect, useState } from "react";
import axios from "axios";
import ExerciseCards from "./ExerciseCards";
import Row from "react-bootstrap/Row";

export default function FetchExercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // const fetchAllExercises = async () => {
    //   try {
    //     const res = await axios.get("api/exercises");
    //     setExercises(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchAllExercises();
    axios
      .get("api/exercises")
      .then(function (res) {
        // handle success
        setExercises(res.data);
        console.log(res);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  }, []);

  return (
    <div className="fetchExercises">
      <Row xs={2} sm={3} lg={4} className="exercisesRow">
        {exercises.map((exercise) => (
          <ExerciseCards key={exercise.exercise_id} exercise={exercise} />
        ))}
      </Row>
    </div>
  );
}
