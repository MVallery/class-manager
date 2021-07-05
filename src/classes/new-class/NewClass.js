import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import { useHttpClient } from "../../general/http-hook";
import { Link } from "react-router-dom";
import { newClassHelper } from "./newClassHelper";
import "./NewClass.css";
// Component that is used to create a new class both on the Home page, and in the add student modal in ClassTitleMenu
const NewClass = (props) => {
  const { sendRequest } = useHttpClient();
  const inputNames = useSelector((state) => state.inputNames);
  const inputClassName = useSelector((state) => state.inputClassName);
  const classList = useSelector((state) => state.classList);
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();

  const handleNewClass = (props) => {
    props.cancelAddNewClassHandler();
    const { temp, tempClassList } = newClassHelper(
      inputNames,
      inputClassName,
      classList
    );
    if (userId) {
      try {
        sendRequest(
          `${process.env.REACT_APP_API}/api/users/${userId}/create-class`,
          "POST",
          JSON.stringify({
            title: temp.title,
            students: temp.students,
            styling: temp.styling,
            count: temp.count,
            id: temp.id,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    dispatch({ type: "UPDATE_CLASS", temp, tempClassList });
    dispatch({ type: "INPUT_NAMES", inputNames: "" });
    dispatch({ type: "INPUT_CLASS_NAME", inputClassName: "" });
  };
  let inputClassNamesError = inputClassName.length > 0 && /[^a-zA-Z0-9 ]/.test(inputClassName) ? true : false;
  let inputNamesError = inputNames && /[^a-zA-Z, ]/.test(inputNames) ? true : false;
  
  return (
    <React.Fragment>
      <div className="new-class-container">
        <TextField
          variant="filled"
          id="filled-basic"
          label={<span className="">Class Name:</span>}
          name="inputClassName"
          error={inputClassNamesError}
          value={inputClassName}
          onChange={props.handleChange}
          required
          className=""
        />
        {inputClassNamesError ? (
          <FormHelperText>Input only letters and numbers</FormHelperText>
        ) : (
          <div style={{ height: "21.89px" }}></div>
        )}

        <div className="names-input-container">
          <TextField
            variant="filled"
            id="filled-basic"
            label={
              <span className="">
                Input student names, separated by a comma.
              </span>
            }
            name="inputNames"
            value={inputNames}
            onChange={props.handleChange}
            error={inputNamesError}
            className="text-area-styles"
            placeholder="John Smith, Jane Doe..."
            required
            multiline
            rows={4}
          />
          <br />
        </div>
        {inputNamesError ? (
          <div>Input only names separated by commas</div>
        ) : (
          <div style={{ height: "21.89px" }}></div>
        )}
        {!inputNamesError &&
        !inputClassNamesError &&
        inputNames.length > 0 &&
        inputClassName.length > 0 ? (
          <Link className="new-class-link" to="/classes">
            <button
              onClick={() => {
                handleNewClass(props);
              }}
            >
              Create Class
            </button>
          </Link>
        ) : (
          <Link className="new-class-link" to="/classes">
            <button
              disabled
              onClick={() => {
                handleNewClass(props);
              }}
            >
              Create Class
            </button>
          </Link>
        )}
      </div>
    </React.Fragment>
  );
};

export default NewClass;
