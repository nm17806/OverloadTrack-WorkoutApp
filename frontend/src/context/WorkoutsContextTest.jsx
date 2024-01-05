import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../components/Hooks/useAuthContext";

export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState([]);

  const { currentUser } = useAuthContext();

  const deleteExercise = async (exerciseId) => {
    axios.patch(`api/workouts/exercises/${exerciseId}`, null, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
  };

  const deleteWorkout = async (workoutId) => {
    axios.patch(`api/workouts/${workoutId}`, null, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
  };
  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await axios.get("api/workouts", {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setWorkoutName(res.data);
    };
    fetchWorkouts();
  }, [setWorkoutName, currentUser]);

  useEffect(() => {
    const fetchWorkoutExercises = async () => {
      const res = await axios.get(`api/workouts/exercises`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setWorkouts(res.data);
    };
    fetchWorkoutExercises();
  }, [setWorkouts, currentUser]);

  return (
    <WorkoutsContext.Provider
      value={{
        workoutName,
        workouts,
        deleteExercise,
        deleteWorkout,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
