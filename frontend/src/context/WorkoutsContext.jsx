import axios from "axios";
import { createContext, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const fetchWorkouts = async () => {
    const res = await axios.get("api/workouts", {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setWorkoutName(res.data);
    setFilteredWorkouts(res.data);
  };

  const fetchWorkoutExercises = async () => {
    const res = await axios.get(`api/workouts/exercises`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setWorkouts(res.data);
  };

  const deleteExercise = async (exerciseId) => {
    axios.patch(`api/workouts/exercises/${exerciseId}`, null, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setSelectedExercise(null);
  };

  const deleteWorkout = async (workoutId) => {
    axios.patch(`api/workouts/${workoutId}`, null, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setSelectedWorkout(null);
  };

  return (
    <WorkoutsContext.Provider
      value={{
        filteredWorkouts,
        workoutName,
        workouts,
        selectedExercise,
        selectedWorkout,
        fetchWorkouts,
        fetchWorkoutExercises,
        deleteExercise,
        deleteWorkout,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
