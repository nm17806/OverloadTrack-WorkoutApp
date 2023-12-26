import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";

export default function WorkoutsModal() {
  const [showModal, setShowModal] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleModalSubmit = () => {
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  if (showModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleChange = (e) => {
    // Update the selectedItems array based on the button that was clicked
    let { value } = e.currentTarget;
    value = Number(value);
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  useEffect(() => {
    axios
      .get("api/exercises")
      .then(function (res) {
        // handle success
        setExercises(res.data);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  }, []);

  return (
    <>
      {showModal && (
        <div className="modal" style={{ display: showModal ? "block" : "none" }}>
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <div className="exerciseButtonsDiv" value={selectedItems} onChange={handleChange}>
              {/* {exercises &&
                exercises.map((exercise) => (
                  <Button
                    type="checkbox"
                    key={exercise.exercise_id}
                    className="exerciseButtons"
                    variant="outline-primary"
                    value={exercise.exercise_id}
                    onClick={handleChange}
                    style={{
                      backgroundColor: selectedItems.includes(exercise.exercise_id) ? "blue" : "transparent",
                      color: selectedItems.includes(exercise.exercise_id) ? "white" : "blue",
                    }}
                  >
                    {exercise.exercise_name + " (" + exercise.body_part + ")"}
                  </Button>
                ))} */}
            </div>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
            <button onClick={handleModalSubmit}>Submit</button>
          </div>
        </div>
      )}
    </>
    // <Modal show={showModal} onHide={() => setShowModal(false)}>
    //   <Modal.Header closeButton>
    //     <Modal.Title className="modalTitle">Which Exercises would you like to add?</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body></Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="secondary" onClick={() => setShowModal(false)}>
    //       Cancel
    //     </Button>
    //     <Button variant="primary" onClick={handleModalSubmit}>
    //       Submit
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
  );
}
