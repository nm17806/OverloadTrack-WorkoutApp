import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../index.scss";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  console.log(inputs);

  const handlechange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <Container fluid>
      <Row className="loginContainer">
        <Col sm={2} md={3}></Col>
        <Col sm={8} md={6} className="loginColumn">
          <Form className="loginForm" onChange={handlechange}>
            <h1 className="text-center pb-4">Login</h1>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control className="mb-5" type="email" name="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control className="mb-5" type="password" name="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handlesubmit}>
              Submit
            </Button>
            <div className="pt-4 text-center text-danger">{error}</div>
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
