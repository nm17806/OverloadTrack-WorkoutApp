import { useEffect, useState } from "react";
import axios from "axios";
import ConvertDate from "../Shared/ConvertDate";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function SeePreviousSessions({ openAccordion }) {
  const [allSessions, setAllSessions] = useState([]);

  // I need to record the useState of which accrodian is open, in RecordSession.jsx and pass it here as a prop.

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("api/sessions", { headers: { Authorization: `Bearer ${currentUser.token}` } })
      .then(function (res) {
        console.log(JSON.stringify(res.data[0], null, 2));
        setAllSessions(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [currentUser.token]);

  const filterExercise = allSessions.filter((session) => session.exercise_id == openAccordion);

  // Group sessions by record_id
  const groupedSessions = filterExercise.reduce((grouped, session) => {
    (grouped[session.record_id] = grouped[session.record_id] || []).push(session);
    return grouped;
  }, {});

  return (
    <div>
      {Object.keys(groupedSessions).length > 0 && (
        <h2>
          {groupedSessions[Object.keys(groupedSessions)[0]][0].exercise_name}, (
          {groupedSessions[Object.keys(groupedSessions)[0]][0].body_part})
        </h2>
      )}
      {Object.entries(groupedSessions).map(([recordId, sessions]) => (
        <div key={recordId}>
          <h4>{ConvertDate(sessions[0].workout_date)}</h4>
          {sessions.map((session, index) => (
            <p key={index}>
              Weight: {session.weight}, Reps: {session.reps}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
