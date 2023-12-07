import { useEffect } from "react";
import axios from "axios";

export default function FetchAllSessions({ setAllSessions }) {
  // This api shows which sessions of which template was used and the workout date
  // {record_id: 1, template_name: 'Upper body', workout_date: '2023-11-06T11:23:50.000Z'}
  useEffect(() => {
    axios
      .get("api/sessions")
      .then(function (res) {
        console.log(res.data);
        setAllSessions(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [setAllSessions]);
}
