import React from "react";
import Grid from "../components/Grid";
import { cap } from "../app-files/general";
import {Link} from 'react-router-dom'

const NewClass = (props) => {
  console.log(props.names);
  const handleSubmit = (props) => {
    if (
      (props.nameList.length > 0 &&
        window.confirm(
          "Are you sure? This will erase your other students! To add new students make sure to click Add Student instead"
        )) ||
      props.nameList.length === 0
    ) {
      const nameArray = props.inputNames.replace(/, /g, ",").split(",");
      let nameOnlyResult = [];
      let result = [];

      for (let x = 0; x < nameArray.length; x++) {
        const randColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        const id = cap(nameArray[x]) + Math.floor(Math.random() * 20);
        let record = {
          name: cap(nameArray[x]),
          count: 0,
          background: randColor,
          key: id,
          isChecked: false,
          displayColorPicker: false,
        };
        result.push(record);
        nameOnlyResult.push(record.name);
      }

      props.handleState({
        nameList: result,
        nameOnlyList: nameOnlyResult,
        inputNames: "",
      });
    }
  };

  return (
    <React.Fragment>
      <textarea
        onChange={props.handleChange}
        value={props.inputNames}
        // className={textAreaStyles}
        placeholder="Separate names with Commas"
      />
      <br />
      <input
        type="quantity"
        name="groups"
        onChange={props.handleInput}
        value={props.generalSelection.groups}
        placeholder="groups"
      ></input>
      <button
        onClick={() => {
          handleSubmit(props);
        }}
      >
        Create List
      </button>
    <Link to='/classes'>view class</Link>

      {props.names}
      {/* {newNameList} */}

      {/* <div className="new-name-list-container">{newNameList}</div> */}
      {/* <Grid names={props.names} handleClassDisplay={props.handleClassDisplay} /> */}
    </React.Fragment>
  );
};

export default NewClass;
