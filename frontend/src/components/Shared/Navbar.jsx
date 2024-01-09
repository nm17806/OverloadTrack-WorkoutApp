import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function MyNav() {
  const { currentUser } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand href="/">Workout-APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/exercises">Exercises</Nav.Link>
            <Nav.Link href="/workouts">Workout Routines</Nav.Link>
            <Nav.Link href="/sessions">Sessions</Nav.Link>
            <Nav.Link href="/record-session">Record a Workout</Nav.Link>
            <Nav.Link href="/statistics">Statistics</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="me-3">
            {currentUser ? (
              <>
                Signed in as:{" "}
                <strong>
                  <u>{currentUser.email}</u>
                </strong>
              </>
            ) : null}
          </Navbar.Text>
          <Navbar.Text>
            {currentUser ? (
              <a href="/login" onClick={logout}>
                Logout
              </a>
            ) : (
              <a href="/login">Login</a>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
