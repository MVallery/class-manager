import React, {useContext} from "react";
import { cap, colorPallet } from "../../app-files/general";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from "@material-ui/core/TextField";
import { v4 as uuid } from 'uuid';
import {useHttpClient} from '../../general/http-hook';
// import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./NewClass.css";
import { connect } from 'react-redux';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 100,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

const NewClass = (props) => {
  const {isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleNewClass = (props) => {
    console.log(props)
    props.cancelAddNewClassHandler();
  
    console.log("inputNames:", props.inputNames);
    console.log("classList:", props.classList);
    const nameArray =  props.inputNames.replace(/,\s+/g, ',').replace(/\s+[^a-zA-Z]/,'').split(',')
    console.log("nameArray", nameArray);
    let result = [];
    for (let x = 0; x < nameArray.length; x++) {
      if (nameArray[x].length === 0) {
        continue;
      }
      let [first, last] = nameArray[x].split(" ");
  
      const id = cap(nameArray[x]) + Math.floor(Math.random() * 20);
      let initial = last ? " " + cap(last[0]) : "";
      let record = {
        name: cap(first) + initial,
        first: first,
        last: last ? last : "",
        count: 0,
        pointStyle: null,
        background: colorPallet("lightBlueGreen"),
        key: id,
        isChecked: false,
        displayColorPicker: false,
      };
      result.push(record);
    }
    let tempClassList = JSON.parse(JSON.stringify(props.classList));
    let tempClass = {
      title: props.inputClassName,
      students: result,
      count: 0,
      styling: { groups: 4, format: "groups", theme: "lightBlueGreen" },
      classSnapShot: [],
      id: uuid()
    };
    if (nameArray.length % 4 !== 0) {
      for (let i = 0; i < 4 - (nameArray.length % 4); i++) {
        tempClass.students.push({
          name: "blank",
          background: colorPallet("lightBlueGreen"),
          key: Math.floor(Math.random()),
        });
        console.log(tempClass);
      }
    }
  
    tempClassList.push(tempClass);
    try {
     sendRequest('http://localhost:5000/api/users/'+props.userId+'/create-class', "POST", 
      JSON.stringify({
        title: tempClass.title,
        students: tempClass.students,
        styling: tempClass.styling,
        count: tempClass.count,
        id: tempClass.id
      }), {
        'Content-Type': 'application/json'
      }
      )
  
    } catch(err) {
      console.log(err)
    }
  props.handleUpdate(tempClass, tempClassList)

  }
  let inputClassNamesError = /[^a-zA-Z0-9 ]/.test(props.inputClassName)? true:false
  let inputNamesError = /[^a-zA-Z, ]/.test(props.inputNames)? true:false
  return (
    <React.Fragment>
      <div className="new-class-container">
        <TextField
          variant="filled"
          id="filled-basic"
          label={<span className="">Class Name:</span>}
          name="inputClassName"
          error = {inputClassNamesError}
          value={props.inputClassName}
          onChange={props.handleChange}
          required
          className=""
        />
          {inputClassNamesError ? <FormHelperText>Input only letters and numbers</FormHelperText>:<div style={{height:'21.89px'}}></div>}

        <div className="names-input-container">
          <TextField
            variant="filled"
            id="filled-basic"
            label={
              <span className="">Input student names, separated by a comma.</span>
            }
            name="inputNames"
            value={props.inputNames}
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
        {inputNamesError ? <div>Input only names separated by commas</div>:<div style={{height:'21.89px'}}></div>}
        {!inputNamesError && !inputClassNamesError ? (
          <Link className="new-class-link" to="/classes">
          <button
            onClick={() => {
              handleNewClass(props);
            }}
          >
            Create Class
          </button>
        </Link>
        ): (
          <Link className="new-class-link" to="/classes">
          <button disabled
            onClick={() => {
              handleNewClass(props);
            }}
          >
            Create Class
          </button>
        </Link>
        )
        
      }
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList,
    userId:state.userId
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    handleUpdate: (temp, tempClassList) => {dispatch({type:'UPDATE_CLASS', temp,tempClassList })}
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewClass);
