import React from "react";
import Accordion from "react-bootstrap/Accordion";

export default function WorkoutsLayout({ template, exercises }) {
  return (
    <Accordion className="workoutAccordian">
      <Accordion.Item className="workoutAccordianItem" eventKey="0">
        <Accordion.Header>{template.name}</Accordion.Header>

        {exercises.map((exercise, index) => (
          <React.Fragment key={index}>
            <div className="workoutAccordianBody">
              <Accordion.Body>{exercise.Exercise_Name}</Accordion.Body>
              <Accordion.Body>{exercise.BodyPart}</Accordion.Body>
            </div>
          </React.Fragment>
        ))}
      </Accordion.Item>
    </Accordion>
  );
}
