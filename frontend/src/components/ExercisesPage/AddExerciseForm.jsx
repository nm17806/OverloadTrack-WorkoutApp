import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useExercisesContext } from "../../hooks/useExercisesContext";

export default function AddExerciseForm() {
  const { postExercise } = useExercisesContext();
  const [exercise, setExercise] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await postExercise(exercise, bodyPart);
      setExercise("");
      setBodyPart("");
      setIsLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
      setIsLoading(false);
    }
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
        {isLoading ? (
          <Button className="exerciseFormBtn" variant="primary" disabled>
            Submitting...
          </Button>
        ) : (
          <Button className="exerciseFormBtn" variant="primary" type="submit">
            Submit
          </Button>
        )}
        <br />
        {error && <div className="error">Error</div>}
      </Form>
    </div>
  );
}
