import React, { useState } from "react";
import SelectGroup from "./SelectGroup";
import SelectLayout from "./SelectLayout";
import SelectTheme from "./SelectTheme";
import SelectSize from "./SelectSize";
import TextField from "@material-ui/core/TextField";
import ClassMenuButton from "./ClassMenuButton";
import { useSelector, useDispatch } from "react-redux";
import { addStudentsHelper } from "./addStudentsHelper";
import Modal from "../../../general/components/Modal";
import "./ClassTitleMenu.css";

// Rendered by Classes component, used to display general class buttons including:
// adding/removing students, changing class formatting and styling, and shuffling the class.

const ClassTitleMenu = (props) => {
  const activeClass = useSelector((state) => state.activeClass);
  const classList = useSelector((state) => state.classList);
  const inputNames = useSelector((state) => state.inputNames);
  const dispatch = useDispatch();
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [formatModal, setFormatModal] = useState(false);
  const [classMenuDisplay, setClassMenuDisplay] = useState(null);

  const handleAddStudents = () => {
    const {temp, tempClassList} = addStudentsHelper(inputNames, activeClass, classList);
    setAddStudentModal(false);
    if (props.userId) {
      props.handleDatabaseUpdate(temp);
    }
    dispatch({ type: "UPDATE_CLASS", temp, tempClassList });
    dispatch({ type: "INPUT_NAMES", inputNames: "" });
  };
  const title = activeClass ? activeClass.title : null
  return (
    <React.Fragment>
      <ClassMenuButton
        handleDatabaseUpdate={props.handleDatabaseUpdate}
        classMenuDisplay={classMenuDisplay}
        setClassMenuDisplay={setClassMenuDisplay}
        setFormatModal={setFormatModal}
        setAddStudentModal={setAddStudentModal}
      />
      {/******Add students modal *******/}
      <Modal
        show={addStudentModal}
        onCancel={() => {
          setAddStudentModal(false);
          setClassMenuDisplay(false);
        }}
        header={
          <div>Add students to {title} </div>
        }
        footerClass="worksheet-item__modal-actions"
        footer={
          <div className="add-student-button-container">
            <button className="add-student-button" onClick={handleAddStudents}>
              ADD STUDENT(S)
            </button>
          </div>
        }
      >
        <TextField
          variant="filled"
          id="filled-basic"
          label={
            <span className="">Input student names, separated by a comma.</span>
          }
          name="inputNames"
          value={inputNames}
          onChange={props.handleChange}
          className="text-area-styles"
          placeholder="John Smith, Jane Doe..."
          required
          style={{
            borderBottom: "2px solid purple !important",
            color: "purple",
          }}
          multiline
          rows={2}
          rowsMax={3}
        />
      </Modal>

      {/***** Format modal *****/}
      <Modal
        show={formatModal}
        onCancel={() => setFormatModal(false)}
        header={
          <div>
            Change the layout of {title}{" "}
          </div>
        }
        footerClass="worksheet-item__modal-actions"
      >
        <SelectSize handleSmallStyle={props.handleSmallStyle} activeClass={activeClass} classList={classList} />
        <SelectLayout activeClass={activeClass} classList={classList} />
        <SelectGroup activeClass={activeClass} classList={classList} />
        <SelectTheme activeClass={activeClass} classList={classList} />
      </Modal>
    </React.Fragment>
  );
};

export default ClassTitleMenu;
