import { ExercisesContext } from "../../context/ExercisesContext";
import { useContext } from "react";

export const useExercisesContext = () => {
  const context = useContext(ExercisesContext);

  if (!context) {
    throw Error("useExercisesContext must be used inside an ExercisesContextProvider");
  }

  return context;
};
