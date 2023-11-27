import { useEffect, useState } from "react";
import axios from "axios";

export default function FetchWorkouts() {
  const [workouts, setWorkouts] = useState([]);

  const organizeData = (data) => {
    const result = [];

    data.forEach((item) => {
      const { Workout_Template_Name, Exercise_Name, BodyPart } = item;

      // Find the index of the existing template in the result array
      const templateIndex = result.findIndex((template) => template.name === Workout_Template_Name);

      // If the template doesn't exist, add it to the result array
      if (templateIndex === -1) {
        result.push({
          name: Workout_Template_Name,
          exercises: [{ Exercise_Name, BodyPart }],
        });
      } else {
        // If the template exists, add the exercise to its exercises array
        result[templateIndex].exercises.push({ Exercise_Name, BodyPart });
      }
    });

    return result;
  };

  const WorkoutList = ({ data }) => {
    const organizedData = organizeData(data);
    return (
      <div>
        {organizedData.map((template) => (
          <div key={template.name}>
            <h2>{template.name}</h2>
            <ul>
              {template.exercises.map(({ Exercise_Name, BodyPart }, index) => (
                <li key={index}>
                  {Exercise_Name} - {BodyPart}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    axios
      .get("api/workouts")
      .then(function (res) {
        // handle success
        setWorkouts(res.data);
        console.log(res);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  }, []);

  return (
    <div>
      <WorkoutList data={workouts} />
    </div>
  );
}
