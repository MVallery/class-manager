import React, {useState} from "react";
import { shuffleArray } from "../../app-files/general";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import Modal from "../../general/components/Modal";
import IconButton from "@material-ui/core/IconButton";

const RandomStudent = (props) => {
  const {activeClass} = props;
  const [randomStudentModal, setRandomStudentModal] = useState(false);
  const [randomStudent, setRandomStudent] = useState({ name: "" });
  const handleSelectRandomStudent = () => {
    let filterBlank = activeClass.students.filter(
      (student) => student.name !== "blank"
    );
    let randomStudent = shuffleArray(filterBlank)[0];
    setRandomStudent(randomStudent);
    setRandomStudentModal(true);
  };
  return (
    <React.Fragment>
      <Modal
        show={randomStudentModal}
        onCancel={() => setRandomStudentModal(false)}
        header={<div>Randomly Selected: </div>}
        footerClass="worksheet-item__modal-actions"
        contentClass="random-student-content-modal"
        footer={
          <React.Fragment>
            <div className="random-student-button">
              <IconButton onClick={handleSelectRandomStudent}>
                Get another random student <ShuffleIcon />
              </IconButton>
            </div>
          </React.Fragment>
        }
      >
        <div
          className="random-student"
          style={{ backgroundColor: `${randomStudent.background}` }}
        >
          {randomStudent.name}
        </div>
      </Modal>
      <IconButton onClick={handleSelectRandomStudent}>
        <span className="icon-button-text">Random Student</span>
        <ShuffleIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default RandomStudent;
