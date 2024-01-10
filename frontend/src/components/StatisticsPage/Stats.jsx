import { useEffect, useState } from "react";
import axios from "axios";
import ConvertDateNoYear from "../Shared/ConvertDateNoYear";
import { useAuthContext } from "../../hooks/useAuthContext";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import Dropdown from "react-bootstrap/Dropdown";

export default function Stats() {
  const [exercises, setExercises] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("Select an Exercise");
  const [selectedExerciseId, setselectedExerciseId] = useState([]);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionsRes = await axios.get("api/sessions", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setAllSessions(sessionsRes.data);

        const exercisesRes = await axios.get("api/exercises", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setExercises(exercisesRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentUser]);

  const filteredSessions = allSessions.filter((session) => session.exercise_id === selectedExerciseId);

  const groupSessionsByRecordId = () => {
    const groupedSessions = [];

    filteredSessions.forEach((session) => {
      const { record_id } = session;
      let existingGroup = groupedSessions.find((group) => group[0].record_id === record_id);

      if (!existingGroup) {
        groupedSessions.push([session]);
      } else {
        existingGroup.push(session);
      }
    });
    return groupedSessions;
  };

  const reorganizeData = () => {
    return groupSessionsByRecordId().map((session) => {
      const volumeArray = session.map((set) => set.reps * set.weight);
      const repsArray = session.map((set) => set.reps);
      const weightArray = session.map((set) => set.weight);

      const date = ConvertDateNoYear(session[0].workout_date);
      const setCounter = session.length;

      const volumeSum = volumeArray.reduce((acc, val) => acc + val, 0);
      const repsSum = repsArray.reduce((acc, val) => acc + val, 0);
      const repsAverage = repsSum / repsArray.length;
      const weightSum = weightArray.reduce((acc, val) => acc + val, 0);
      const weightAverage = weightSum / weightArray.length;

      return {
        workout_date: date,
        total_volume: volumeSum,
        average_reps: repsAverage,
        average_weight: weightAverage,
        total_sets: setCounter,
      };
    });
  };

  let organizedSessions = reorganizeData();

  if (organizedSessions.length > 3) {
    organizedSessions = organizedSessions.slice(0, 10);
  }

  const onSelection = (item, id) => {
    setSelectedExercise(item);
    setselectedExerciseId(id);
  };

  return (
    <div>
      <div>Choose Exercise</div>
      <Dropdown>
        <Dropdown.Toggle className="p-3 w-50" variant="outline-secondary">
          {selectedExercise}
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-50">
          {exercises &&
            exercises.map((exercise) => (
              <Dropdown.Item
                key={exercise.exercise_id}
                onClick={() => onSelection(exercise.exercise_name, exercise.exercise_id)}
              >
                {exercise.exercise_name}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      {/* This needs changing to handle errors and cases of no sessions recorded */}
      {organizedSessions.length > 0 && (
        <div className="charts-container">
          <LineChart
            width={500}
            height={300}
            data={organizedSessions}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Line type="monotone" dataKey="total_volume" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="workout_date" />
            <YAxis />
            <Tooltip />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={organizedSessions}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Line type="monotone" dataKey="average_reps" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="workout_date" />
            <YAxis />
            <Tooltip />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={organizedSessions}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Line type="monotone" dataKey="average_weight" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="workout_date" />
            <YAxis />
            <Tooltip />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={organizedSessions}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Line type="monotone" dataKey="total_sets" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="workout_date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      )}
    </div>
  );
}
