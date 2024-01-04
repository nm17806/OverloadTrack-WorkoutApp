import RecordaSession from "../components/RecordSessionPage/RecordaSession";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import SeePreviousSessions from "../components/RecordSessionPage/SeePreviousSessions";
import { useAuthContext } from "../components/Hooks/useAuthContext";

export default function RecordSession() {
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    console.log(openAccordion);
  }, [openAccordion]);

  const { currentUser } = useAuthContext();
  if (!currentUser) {
    return;
  }

  return (
    <Container>
      <Row className="workoutsRow">
        <Col xs={12} md={8}>
          <RecordaSession setOpenAccordion={setOpenAccordion} openAccordion={openAccordion} />
        </Col>
        <Col xs={12} md={4}>
          <SeePreviousSessions openAccordion={openAccordion} />
        </Col>
      </Row>
    </Container>
  );
}
