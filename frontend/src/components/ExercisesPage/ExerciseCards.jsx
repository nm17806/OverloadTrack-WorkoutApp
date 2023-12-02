import { useState } from "react";
import Card from "react-bootstrap/Card";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ExerciseCards({ exercise }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(false);
    axios
      .patch(`api/exercises/${exercise.exercise_id}`)
      .then(function (res) {
        // handle success
        console.log(res);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  };

  return (
    <Card className="exerciseCard">
      <Card.Body className="cardBody">
        <Row>
          <Col xs={10}>
            <Card.Title className="cardTitle">{exercise.exercise_name}</Card.Title>
            <Card.Text className="cardText">{exercise.body_part}</Card.Text>
          </Col>
          <Col xs={2}>
            <span className="delete-icon" onClick={() => setShowModal(true)}>
              <RiDeleteBinLine />
            </span>
          </Col>
        </Row>
        {/* Delete Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Exercise</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete {exercise.exercise_name}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}
