import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function WorkoutsModal() {
  const [showModal, setShowModal] = useState(false);

  const handleModalSubmit = () => {
    setShowModal(false);
  };
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="modalTitle">Which Exercises would you like to add?</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleModalSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
