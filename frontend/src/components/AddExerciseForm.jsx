import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AddExerciseForm() {
  return (
    <div className="addExerciseForm">
      <h3 className="exerciseFormTitle">Add an Exercise</h3>
      <FloatingLabel controlId="floatingInput" label="Exercise Name" className="mb-3">
        <Form.Control type="text" placeholder="eg. Chest Press" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Muscle Used" className="mb-3">
        <Form.Control type="text" placeholder="eg. Chest" />
      </FloatingLabel>
      <Button className="exerciseFormBtn" variant="primary" type="submit">
        Submit
      </Button>
    </div>
  );
}
