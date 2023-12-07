import { useEffect, useState } from "react";
import axios from "axios";

export default function FetchSession() {
  const [session, setSession] = useState([]);

  useEffect(() => {
    axios
      .get("api/sessions")
      .then(function (res) {
        console.log(res.data);
        setSession(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  return <div>SessionAPI</div>;
}
