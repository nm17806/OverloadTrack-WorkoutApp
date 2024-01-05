import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const ExercisesContext = createContext();

export const ExercisesContextProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);

  const { currentUser } = useAuthContext();

  const postExercise = async (exercise, bodyPart) => {
    const res = await axios.post(
      "api/exercises",
      {
        exercise_name: exercise,
        body_part: bodyPart,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    setExercises((oldExercises) => [
      ...oldExercises,
      { exercise_id: res.data.exercise_id, exercise_name: exercise, body_part: bodyPart },
    ]);
  };

  const deleteExercise = async (exerciseId) => {
    axios.patch(`api/exercises/${exerciseId}`, null, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setExercises((oldExercises) => oldExercises.filter((exercise) => exercise.exercise_id !== exerciseId));
  };

  useEffect(() => {
    const grabExercises = async () => {
      try {
        const res = await axios.get("api/exercises", {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        setExercises(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    grabExercises();
  }, [setExercises, currentUser]);

  return (
    <ExercisesContext.Provider value={{ exercises, setExercises, postExercise, deleteExercise }}>
      {children}
    </ExercisesContext.Provider>
  );
};
