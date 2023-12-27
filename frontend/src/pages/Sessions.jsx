import Container from "react-bootstrap/Container";
import ShowSessions from "../components/SessionsPage/ShowSessions";
import SessionCalendar from "../components/SessionsPage/SessionCalendar";
import { useState } from "react";

export default function Sessions() {
  const [groupedSessions, setGroupedSessions] = useState(null);
  const [recordID, setRecordID] = useState(null);

  const handleGroupedSessions = (data) => {
    setGroupedSessions(data);
  };

  const handleRecordId = (data) => {
    setRecordID(data);
  };

  return (
    <Container>
      <SessionCalendar onSelectedRecordId={handleRecordId} sessions={groupedSessions} />
      <br />
      <ShowSessions onGroupedSessions={handleGroupedSessions} selectedRecordId={recordID} />
    </Container>
  );
}

// [
//   { date: subDays(new Date(), 6), title: "Post video" },
//   { date: subDays(new Date(), 1), title: "Edit video" },
//   { date: addDays(new Date(), 3), title: "Code" },
// ]
