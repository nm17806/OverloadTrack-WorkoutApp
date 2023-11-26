import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";

export default function AddExerciseForm() {
  const [exercise, setExercise] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("api/exercises", {
        exercise_name: exercise,
        body_part: bodyPart,
      })
      .then(function (res) {
        setExercise("");
        setBodyPart("");
        console.log(res);
      })
      .catch(function (err) {
        setError(err);
        console.log(err);
      });
  };

  return (
    <div className="addExerciseForm">
      <h3 className="exerciseFormTitle">Add an Exercise</h3>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInputExercise" label="Exercise Name" className="mb-3">
          <Form.Control
            onChange={(e) => setExercise(e.target.value)}
            value={exercise}
            type="text"
            placeholder="eg. Chest Press"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInputBodyPart" label="Muscle Used" className="mb-3">
          <Form.Control
            onChange={(e) => setBodyPart(e.target.value)}
            value={bodyPart}
            type="text"
            placeholder="eg. Chest"
          />
        </FloatingLabel>
        <Button className="exerciseFormBtn" variant="primary" type="submit">
          Submit
        </Button>
        <br />
        {error && (
          <div className="error">
            Something Went Wrong! <br />
            Please try again later.
          </div>
        )}
      </Form>
    </div>
  );
}
