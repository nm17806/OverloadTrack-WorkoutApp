import { useEffect, useState } from "react";
import axios from "axios";
import ConvertDate from "../Shared/ConvertDate";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function SeePreviousSessions({ openAccordion }) {
  const [allSessions, setAllSessions] = useState([]);

  // It currently choose the three most recent sessions based on the record_id

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("api/sessions", { headers: { Authorization: `Bearer ${currentUser.token}` } })
      .then(function (res) {
        setAllSessions(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [currentUser]);

  const filterExercise = allSessions.filter((session) => session.exercise_id == openAccordion);

  // Group sessions by record_id
  const groupedSessions = filterExercise.reduce((grouped, session) => {
    (grouped[session.record_id] = grouped[session.record_id] || []).push(session);
    return grouped;
  }, {});

  console.log(groupedSessions[Object.keys(groupedSessions)[Object.keys(groupedSessions).length - 1]]);

  return (
    <div>
      {Object.keys(groupedSessions).length > 0 && (
        <>
          <div>
            <h2>
              {groupedSessions[Object.keys(groupedSessions)[Object.keys(groupedSessions).length - 3]][0].exercise_name},
              ({groupedSessions[Object.keys(groupedSessions)[Object.keys(groupedSessions).length - 3]][0].body_part})
            </h2>
            <h4>
              {ConvertDate(
                groupedSessions[Object.keys(groupedSessions)[Object.keys(groupedSessions).length - 3]][0].workout_date
              )}
            </h4>
          </div>
          {groupedSessions[Object.keys(groupedSessions)[Object.keys(groupedSessions).length - 3]].map((sets) => (
            <div key={sets.set_id}>
              <p>
                Weight: {sets.weight}, Reps: {sets.reps}
              </p>
            </div>
          ))}
          <div>
            <h4>
              {ConvertDate(
                groupedSessions[Object.keys(groupedSessions)[Object.keys(groupedSessions).length - 2]][0].workout_date
              )}
            </h4>
          </div>
          {groupedSessions[Object.keys(groupedSessions)[Object.keys(groupedSessions).length - 2]].map((sets) => (
            <div key={sets.set_id}>
              <p>
                Weight: {sets.weight}, Reps: {sets.reps}
              </p>
            </div>
          ))}
          <div>
            <h4>
              {ConvertDate(
                groupedSessions[Object.keys(groupedSessions)[Object.keys(groupedSessions).length - 1]][0].workout_date
              )}
            </h4>
          </div>
          {groupedSessions[Object.keys(groupedSessions)[Object.keys(groupedSessions).length - 1]].map((sets) => (
            <div key={sets.set_id}>
              <p>
                Weight: {sets.weight}, Reps: {sets.reps}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
