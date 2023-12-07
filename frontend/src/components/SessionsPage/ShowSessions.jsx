import FetchAllSessions from "../../api/sessions/FetchAllSessions";
import FetchOneSession from "../../api/sessions/FetchOneSession";
import { useState } from "react";
import ConvertDate from "../Shared/ConvertDate";
import React from "react";

export default function ShowSessions() {
  const [sessions, setAllSessions] = useState([]);
  const [oneSession, setOneSession] = useState([]);

  FetchAllSessions({ setAllSessions });

  return (
    <div>
      {sessions.map((session) => (
        <React.Fragment key={session.record_id}>
          <div>
            <div>{session.template_name}</div>
            <div>{ConvertDate(session.workout_date)}</div>
            <FetchOneSession id={session.record_id} setSession={(data) => setOneSession(data)} />
            {oneSession &&
              oneSession.map((sesh) => (
                <div key={sesh.set_id}>
                  <div>Set: {sesh.set_id}</div>
                  <div>Exercise: {sesh.exercise_name}</div>
                  <div>Body Part: {sesh.body_part}</div>
                  <div>Weight: {sesh.weight}</div>
                  <div>Reps: {sesh.reps}</div>
                </div>
              ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
