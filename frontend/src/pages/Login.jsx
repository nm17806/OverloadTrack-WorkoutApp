import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../index.scss";

export default function Login() {
  return (
    <Container fluid>
      <Row className="loginContainer">
        <Col sm={2} md={3}></Col>
        <Col sm={8} md={6} className="loginColumn">
          <Form className="loginForm">
            <h1 className="text-center pb-4">Login</h1>
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
            <div className="pt-4 text-center text-danger">This is an error</div>
            <div className="pt-4">
              Dont have a account?
              <a className="ps-1" href="/register">
                Register
              </a>
            </div>
          </Form>
        </Col>
        <Col sm={2} md={3}></Col>
      </Row>
    </Container>
  );
}
