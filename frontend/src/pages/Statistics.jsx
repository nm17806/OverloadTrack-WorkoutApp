import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { useAuthContext } from "../hooks/useAuthContext";
import Stats from "../components/StatisticsPage/Stats";

export default function Statistics() {
  const { currentUser } = useAuthContext();
  if (!currentUser) {
    return;
  }
  return (
    <Container>
      <Stats />
    </Container>
  );
}
