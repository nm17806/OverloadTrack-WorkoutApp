import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function FetchWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Use lodash to filter the exercises based on the search query
    const filtered = _.filter(workoutName, (workout) =>
      _.includes(workout.template_name.toLowerCase(), query.toLowerCase())
    );

    // Update the filteredExercises state
    setFilteredWorkouts(filtered);
  };

  useEffect(() => {
    axios
      .get("api/workouts/exercises")
      .then(function (res) {
        setWorkouts(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("api/workouts")
      .then(function (res) {
        setWorkoutName(res.data);
        setFilteredWorkouts(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const handleDelete = () => {
    setShowModal(false);

    // Use the selectedExercise state to get the correct exercise and workout information
    if (selectedExercise) {
      const { id } = selectedExercise;

      axios
        .patch(`api/workouts/exercises/${id}`)
        .then(function (res) {
          setSelectedExercise(null);
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  const handleWorkoutDelete = () => {
    setShowWorkoutModal(false);

    if (selectedWorkout) {
      const { template_id } = selectedWorkout;

      axios
        .patch(`api/workouts/${template_id}`)
        .then(function (res) {
          setSelectedWorkout(null);
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Form>
        <FloatingLabel controlId="floatingInputSeartch" label="Search Exercises" className="mb-3">
          <Form.Control value={searchQuery} onChange={handleSearch} type="text" placeholder="eg. Chest" />
        </FloatingLabel>
      </Form>
      {filteredWorkouts.map((workout) => {
        const checkForExercises = workouts.find((exercise) => exercise.template_id === workout.template_id);
        const filteredExercises = workouts.filter((exercise) => exercise.template_id === workout.template_id);

        return (
          <div key={workout.template_id}>
            <Accordion className="workoutAccordian">
              <Accordion.Item className="workoutAccordianItem" eventKey="0">
                <Accordion.Header>
                  {workout.template_name}
                  <span
                    onClick={() => {
                      setSelectedWorkout({
                        template_id: workout.template_id,
                        template_name: workout.template_name,
                      });
                      setShowWorkoutModal(true);
                    }}
                  >
                    &nbsp;
                    <RiDeleteBinLine />
                  </span>
                </Accordion.Header>

                {checkForExercises ? (
                  filteredExercises.map((exercise) => (
                    <React.Fragment key={exercise.id}>
                      <Row>
                        <Col xs={11}>
                          <div className="workoutAccordianBody">
                            <Accordion.Body>{exercise.exercise_name}</Accordion.Body>
                            <Accordion.Body>{exercise.body_part}</Accordion.Body>
                          </div>
                        </Col>
                        <Col xs={1}>
                          <span
                            onClick={() => {
                              setSelectedExercise({
                                id: exercise.id,
                                exercise_name: exercise.exercise_name,
                                workout_name: exercise.workout_template_name,
                              });
                              setShowModal(true);
                            }}
                          >
                            <Accordion.Body>
                              <RiDeleteBinLine />
                            </Accordion.Body>
                          </span>
                        </Col>
                      </Row>
                    </React.Fragment>
                  ))
                ) : (
                  <div className="workoutAccordianBody">
                    <Accordion.Body>There are no exercises assigned yet</Accordion.Body>
                  </div>
                )}
              </Accordion.Item>
            </Accordion>
          </div>
        );
      })}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Exercise From Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExercise && (
            <div>
              Are you sure you want to remove {selectedExercise.exercise_name} from {selectedExercise.workout_name}?
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showWorkoutModal} onHide={() => setShowWorkoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedWorkout && (
            <div>Are you sure you want to remove the workout routine: {selectedWorkout.template_name}?</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWorkoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleWorkoutDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
