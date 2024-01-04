import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_WORKOUT_EXERCISES":
      return {
        ...state,
        workouts: action.payload,
      };
    case "FETCH_WORKOUTS":
      return {
        ...state,
        workoutName: action.payload,
      };
    case "DELETE_EXERCISE":
      return {
        workouts: state.workouts.filter((id) => id !== action.payload),
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((id) => id !== action.payload),
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: [],
    workoutName: [],
  });
  return <WorkoutsContext.Provider value={{ state, dispatch }}>{children}</WorkoutsContext.Provider>;
};
