import React from "react";
import {useLocation} from 'react-router-dom';

import { cap, shuffleArray, randWhole, colorPallet } from "../app-files/general";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
import './NewClass.css'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const NewClass = (props) => {
  let location=useLocation()
  const classes = useStyles();

  // console.log(props.names);
  const handleSubmit = (props) => {
    if (location.pathname==='/classes'){
      props.cancelAddNewClassHandler()
    }
    // location.pathname==='/classes'? props.cancelAddNewClassHandler():null;

    console.log('inputNames:',props.inputNames)
    console.log('classList:',props.classList)
      const nameArray = props.inputNames.replace(/, /g, ",").split(",");
      console.log('nameArray',nameArray)
      let nameOnlyResult = [];
      let result = [];
      for (let x = 0; x < nameArray.length; x++) {
      // let randColor = shuffleArray(colorPalette.softPurplePink)

        let [first, last] = nameArray[x].split(' ')
        // const randColor =
        //   "#" + Math.floor(Math.random() * 16777215).toString(16);
        const id = cap(nameArray[x]) + Math.floor(Math.random() * 20);
        let initial = last ? ' '+ cap(last[0]) : ''
        let record = {
          name: cap(first) + initial,
          first:first,
          last:last?last:'',
          count: 0,
          // background: randColor[0],
          background: colorPallet('lightBlueGreen'),
          key: id,
          isChecked: false,
          displayColorPicker: false,
        };
        result.push(record);
        nameOnlyResult.push(record.name);
      };
      // console.log('result:'+result)
      // console.log('inputClassName:'+props.inputClassName)
      let tempClassList = JSON.parse(JSON.stringify(props.classList));
      let tempClass = {title:props.inputClassName, students:result, count:0, styling:{groups:4, format:'', theme:'lightBlueGreen'}, classSnapShot: []};

      tempClassList.push(tempClass);
      
      props.handleState({
        activeClass: tempClass,
        classList: tempClassList,
        nameOnlyList: nameOnlyResult,
        inputClassName: '',
        inputNames: "",
      });
    // }
  };

  return (
    <React.Fragment>
      <div className="new-class-container">
      <TextField 
        variant='filled'
        id = 'filled-basic'
        label={<span className= ''>Class Name:</span>}
        name="inputClassName"
        value={props.inputClassName}
        onChange={props.handleChange}
        required
        className=""
        />
        <div className='names-input-container'>
      <TextField 
        variant='filled'
        id = 'filled-basic'
        label={<span className= ''>Student Names:</span>}
        name="inputNames"
        value={props.inputNames}
        onChange={props.handleChange}
        className='text-area-styles'
        placeholder="Input student names, separated by a comma"
        required
        multiline
        rows={4}
        rowsMax={6}
        />                   
      <br />
</div>
    <Link className="new-class-link" to='/classes'>      
    <button
        onClick={() => {
          handleSubmit(props);
        }}
      >Create Class
      </button>
</Link>
      </div>
    </React.Fragment>
  );
};

export default NewClass;
