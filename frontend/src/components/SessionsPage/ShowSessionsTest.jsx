import React, { useEffect, useState } from "react";
import axios from "axios";
import ConvertDate from "../Shared/ConvertDate";

export default function ShowSessions() {
  const [sessions, setAllSessions] = useState([]);
  const [oneSession, setOneSession] = useState({});

  useEffect(() => {
    // Fetch all sessions
    const fetchAllSessions = async () => {
      try {
        const response = await axios.get("api/sessions");
        console.log(response.data);
        setAllSessions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllSessions();
  }, []);

  const fetchOneSession = async (id) => {
    try {
      const response = await axios.get(`api/sessions/${id}`);
      console.log(response.data);

      // Use functional update to ensure the correct state is used
      setOneSession((prevOneSession) => ({
        ...prevOneSession,
        [id]: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {sessions.map((session) => (
        <React.Fragment key={session.record_id}>
          <div>
            <div>{session.template_name}</div>
            <div>{ConvertDate(session.workout_date)}</div>
            <button onClick={() => fetchOneSession(session.record_id)}>Fetch Details</button>
            {oneSession[session.record_id] && (
              <div key={oneSession[session.record_id].set_id}>
                <div>Set: {oneSession[session.record_id].set_id}</div>
                <div>Exercise: {oneSession[session.record_id].exercise_name}</div>
                <div>Body Part: {oneSession[session.record_id].body_part}</div>
                <div>Weight: {oneSession[session.record_id].weight}</div>
                <div>Reps: {oneSession[session.record_id].reps}</div>
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
