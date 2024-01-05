import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState([]);
  const [sortedExercises, setSortedExercises] = useState([]);

  const { currentUser } = useAuthContext();

  const deleteExercise = async (exerciseId) => {
    axios.patch(`api/workouts/exercises/${exerciseId}`, null, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setWorkouts((prev) => prev.filter((workout) => workout.id !== exerciseId));
  };

  const deleteWorkout = async (workoutId) => {
    axios.patch(`api/workouts/${workoutId}`, null, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setWorkoutName((prev) => prev.filter((workout) => workout.template_id !== workoutId));
  };

  const addWorkout = async (workout) => {
    const res = await axios.post(
      "api/workouts",
      {
        template_name: workout,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    console.log(res);
    setWorkoutName((prev) => [
      ...prev,
      { template_id: res.data.template_id, template_name: workout, user_id: res.data.user_id },
    ]);
  };

  const addExercisesToWorkout = async (selectedWorkoutId, item) => {
    await axios.post(
      "api/workouts/add-exercise",
      {
        template_id: selectedWorkoutId,
        exercise_id: item,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
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

  useEffect(() => {
    axios
      .get("api/exercises", {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
      .then(function (res) {
        const sortExercises = [...res.data].sort((a, b) => {
          // Compare the 'body_part' values
          if (a.body_part < b.body_part) {
            return -1;
          }
          if (a.body_part > b.body_part) {
            return 1;
          }
          return 0;
        });
        setSortedExercises(sortExercises);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  }, [currentUser]);

  return (
    <WorkoutsContext.Provider
      value={{
        workoutName,
        workouts,
        deleteExercise,
        deleteWorkout,
        setWorkouts,
        setWorkoutName,
        addWorkout,
        sortedExercises,
        addExercisesToWorkout,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
