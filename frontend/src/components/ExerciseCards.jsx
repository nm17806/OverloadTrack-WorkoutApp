import Card from "react-bootstrap/Card";

export default function ExerciseCards({ exercise }) {
  return (
    <Card className="exerciseCard">
      <Card.Body className="cardBody">
        <Card.Title className="cardTitle">{exercise.exercise_name}</Card.Title>
        <Card.Text className="cardText">{exercise.body_part}</Card.Text>
      </Card.Body>
    </Card>
  );
}
