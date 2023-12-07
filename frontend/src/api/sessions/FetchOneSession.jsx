import { useEffect } from "react";
import axios from "axios";

export default function FetchOneSession({ id, setSession }) {
  // This api shows deatils of exercises peformed in a single session
  // body_part: "Chest"
  // exercise_name: "Bench press"
  // reps: 10
  // set_id: 1
  // template_name: "Upper body"
  // weight: 50
  // workout_date: "2023-11-06T11:23:50.000Z"

  useEffect(() => {
    axios
      .get(`api/sessions/${id}`)
      .then(function (res) {
        console.log(res.data);
        setSession(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return null;
}
