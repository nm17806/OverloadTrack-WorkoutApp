import axios from "axios";
import { createContext, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ExercisesContext = createContext();

export const ExercisesContextProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const fetchExercises = async () => {
    const res = await axios.get("api/exercises", {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setExercises(res.data);
  };

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
    console.log(res);
  };

  const deleteExercise = async (exerciseId) => {
    axios.patch(`api/exercises/${exerciseId}`, null, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
  };

  return (
    <ExercisesContext.Provider value={{ exercises, fetchExercises, postExercise, deleteExercise }}>
      {children}
    </ExercisesContext.Provider>
  );
};
