import React from "react";
import { cap, colorPallet } from "../../app-files/general";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from "@material-ui/core/TextField";
import { v4 as uuid } from 'uuid';
import {useHttpClient} from '../../general/http-hook';
import { Link } from "react-router-dom";
import "./NewClass.css";
import { connect } from 'react-redux';

// Component that is used to create a new class both on the Home page, and in the add student modal in ClassTitleMenu
const NewClass = (props) => {
  const {sendRequest} = useHttpClient();

  const handleNewClass = (props) => {
    props.cancelAddNewClassHandler();
    //replaces whitespace and splits into array of name elements.
    const nameArray =  props.inputNames.replace(/,\s+/g, ',').replace(/\s+[^a-zA-Z]/,'').split(',')
    let result = [];
    for (let x = 0; x < nameArray.length; x++) {
      if (nameArray[x].length === 0) { //ensure empty string doesn't make it through.
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
      styling: { groups: 4, format: "groups", theme: "lightBlueGreen", size:'small'},
      classSnapShot: [],
      id: uuid()
    };
    if (nameArray.length % 4 !== 0) { //add blank students to ensure that all groups are full with default setting of 4 per group.
      for (let i = 0; i < 4 - (nameArray.length % 4); i++) {
        tempClass.students.push({
          name: "blank",
          background: colorPallet("lightBlueGreen"),
          key: Math.floor(Math.random()),
        });
      }
    }
  
    tempClassList.push(tempClass);
    try {
     sendRequest('https://classmanagerbackend.herokuapp.com/api/users/'+props.userId+'/create-class', "POST", 

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
  props.handleState({inputNames:'', inputClassName:''})
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
        {!inputNamesError && !inputClassNamesError && props.inputNames.length>0 && props.inputClassName.length>0 ? (
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
