import { useEffect, useState } from "react";
import axios from "axios";
import WorkoutsLayout from "./WorkoutsLayout";

export default function FetchWorkouts() {
  const [workouts, setWorkouts] = useState([]);

  const organizeWorkouts = (data) => {
    // Could look at using .groupBy
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
    setWorkouts(result);
  };

  // const WorkoutList = () => {
  //   const organizedData = organizeWorkouts();
  //   return (
  //     <div>
  //       {organizedData.map((template) => (
  //         <div key={template.name}>
  //           <h2>{template.name}</h2>

  //           {template.exercises.map(({ Exercise_Name, BodyPart }, index) => (
  //             <div key={index}>
  //               {Exercise_Name} - {BodyPart}
  //             </div>
  //           ))}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  useEffect(() => {
    axios
      .get("api/workouts")
      .then(function (res) {
        // handle success
        organizeWorkouts(res.data);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* <WorkoutList data={workouts} /> */}
      {workouts.map((template) => (
        <WorkoutsLayout key={template.name} template={template} exercises={template.exercises} />
      ))}
    </div>
  );
}
