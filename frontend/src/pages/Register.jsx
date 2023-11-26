import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../index.scss";

export default function Register() {
  return (
    // Need to add a section for the user's NAME
    <Container fluid>
      <Row className="loginContainer">
        <Col sm={2} md={3}></Col>
        <Col sm={8} md={6} className="loginColumn">
          <Form className="loginForm">
            <h1 className="text-center pb-4">Register</h1>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control className="mb-5" type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control className="mb-5" type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div className="pt-4 text-center text-danger">Error</div>
            <div className="pt-4">
              Already have a account?
              <a className="ps-1" href="/login">
                Login
              </a>
            </div>
          </Form>
        </Col>
        <Col sm={2} md={3}></Col>
      </Row>
    </Container>
  );
}
