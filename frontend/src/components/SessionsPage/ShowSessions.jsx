import { useState, useEffect } from "react";
import axios from "axios";
import ConvertDate from "../Shared/ConvertDate";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ShowSessions({ onGroupedSessions, selectedRecordId }) {
  const [allSessions, setAllSessions] = useState([]);
  const [groupedSessions, setGroupedSessions] = useState({});

  // Helper function to group by record_id
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("api/sessions", {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
      .then(function (res) {
        setAllSessions(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [currentUser]);

  useEffect(() => {
    const grouped = groupBy(allSessions, "record_id");
    setGroupedSessions(grouped);
  }, [allSessions]);

  useEffect(() => {
    if (groupedSessions) {
      onGroupedSessions(groupedSessions);
    }
  }, [groupedSessions, onGroupedSessions]);

  const filteredSessions = Object.fromEntries(
    Object.entries(groupedSessions).filter(([recordId]) => recordId === selectedRecordId)
  );

  return (
    <div>
      {Object.entries(filteredSessions).map(([recordId, sessions]) => (
        <div key={recordId}>
          <h2 style={{ textAlign: "center" }}>
            Date: {ConvertDate(sessions[0].workout_date)}
            <span> </span>
            {sessions[0].template_name}
          </h2>

          <table style={{ width: "100%", border: "1px solid black", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ width: "40%", border: "1px solid black" }}>Exercise Name</th>
                <th style={{ width: "20%", border: "1px solid black" }}>Body Part</th>
                <th style={{ width: "20%", border: "1px solid black" }}>Weight</th>
                <th style={{ width: "20%", border: "1px solid black" }}>Reps</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.set_id}>
                  <td style={{ width: "20%", border: "1px solid black" }}>{session.exercise_name}</td>
                  <td style={{ width: "20%", border: "1px solid black" }}>{session.body_part}</td>
                  <td style={{ width: "20%", border: "1px solid black" }}>{session.weight}</td>
                  <td style={{ width: "20%", border: "1px solid black" }}>{session.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
