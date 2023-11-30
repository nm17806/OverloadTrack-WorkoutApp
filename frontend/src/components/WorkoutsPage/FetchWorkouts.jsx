import { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";

export default function FetchWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState([]);

  useEffect(() => {
    axios
      .get("api/workouts/exercises")
      .then(function (res) {
        // handle success
        setWorkouts(res.data);
        console.log(res.data);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("api/workouts")
      .then(function (res) {
        // handle success
        setWorkoutName(res.data);
        console.log(res.data);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  }, []);

  return (
    <div>
      {workoutName.map((workout) => {
        const checkForExercises = workouts.find((exercise) => exercise.Template_id == workout.template_id);

        // Filter exercises based on Template_id
        const filteredExercises = workouts.filter((exercise) => exercise.Template_id === workout.template_id);

        return (
          <div key={workout.template_id}>
            <Accordion className="workoutAccordian">
              <Accordion.Item className="workoutAccordianItem" eventKey="0">
                <Accordion.Header>{workout.template_name}</Accordion.Header>

                {checkForExercises &&
                  filteredExercises.map((exercise) => (
                    <div className="workoutAccordianBody" key={exercise.id}>
                      <Accordion.Body>{exercise.Exercise_Name}</Accordion.Body>
                      <Accordion.Body>{exercise.BodyPart}</Accordion.Body>
                    </div>
                  ))}
              </Accordion.Item>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}
