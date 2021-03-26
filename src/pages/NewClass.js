import React from "react";
import Grid from "../components/Grid";
import { cap, shuffleArray } from "../app-files/general";

import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import {Link} from 'react-router-dom'
import './NewClass.css'
const colorPallet = {
  softPurpleGreen:['#c1f7dc', '#C2EBDA', '#C2DED7', '#C3D8D6', '#C3D2D5', '#C2C6CF', '#C0B9C9', '#C0B3C6','#BFADC3', '#BDA0BC' ],
  softPurplePink: ['#FF6979','#FF7C89', '#FF8E99', '#FFA1A9', '#FFB3B9', '#E5B7BE', '#D8B9C0', '#C4A8B2', '#BAA0AB', '#AF97A3'],
  brightRainbow: ['#f065dd','#df1f5f','#a91fdf','#406be2', '#40e27e', '#ddf363','#f87a40']

}

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

  const classes = useStyles();

  // console.log(props.names);
  const handleSubmit = (props) => {
    // console.log(props.inputClassName)
    console.log('inputNames:',props.inputNames)
    console.log('classList:',props.classList)
    // if (
    //   (props.nameList.length > 0 &&
    //     window.confirm(
    //       "Are you sure? This will erase your other students! To add new students make sure to click Add Student instead"
    //     )) ||
    //   props.nameList.length === 0
    // ) {
      const nameArray = props.inputNames.replace(/, /g, ",").split(",");
      console.log('nameArray',nameArray)
      let nameOnlyResult = [];
      let result = [];
      for (let x = 0; x < nameArray.length; x++) {
      let randColor = shuffleArray(colorPallet.brightRainbow)

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
          background: randColor[0],
          key: id,
          isChecked: false,
          displayColorPicker: false,
        };
        result.push(record);
        nameOnlyResult.push(record.name);
      }
      // console.log('result:'+result)
      // console.log('inputClassName:'+props.inputClassName)
      let tempClassList = JSON.parse(JSON.stringify(props.classList))
      let tempClass = {title:props.inputClassName, students:result, count:0, generalSelection:{}, classSnapShot: []}

      tempClassList.push(tempClass)
      
      props.handleState({
        activeClass: tempClass,
        classList: tempClassList,
        nameOnlyList: nameOnlyResult,
        inputClassName: '',
        inputNames: "",
      });
    // }
  };
  const handleClassChange = (e) => {
    const {value}=e
    props.handleState({inputClassName:value})
  }
  return (
    <React.Fragment>
      <div className="new-class-container">
        
      {/* <textarea
        onChange={props.handleChange}
        value={props.inputNames}
        name='inputNames'
        className="text-area-styles"
        placeholder="Separate names with Commas"
      /> */}
      <TextField 
        variant='filled'
        id = 'filled-basic'
        label={<span className= ''>Class Name:</span>}
        name="inputClassName"
        value={props.inputClassName}
        // onChange={props.handleInputQuantity}
        onChange={props.handleChange}
        // placeholder="Class Name"
        required
        className=""
        />
        <div className='names-input-container'>
      <TextField 
        variant='filled'
        id = 'filled-basic'
        label={<span className= ''>Student Names:</span>}
        name="inputNames"
        // type="number"
        value={props.inputNames}
        onChange={props.handleChange}
        className='text-area-styles'
        placeholder="Input student names, separated by a comma"
        required
        multiline
        rows={4}
        rowsMax={6}
        />                   

      {/* <input 
        onChange={props.handleChange}
        value={props.inputClassName}
        name='inputClassName'
        
      /> */}
      <br />
      {/* <FormControl className={classes.formControl}>
        <InputLabel>Rows:</InputLabel>

        <Select className={classes.formControl}
          value={props.generalSelection.groups}
          onChange={props.handleInput}
          displayEmpty
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select>
      </FormControl> */}
      {/* <input
        type="quantity"
        name="groups"
        onChange={props.handleInput}
        value={props.generalSelection.groups}
        placeholder="groups"
      ></input> */}
</div>
    <Link className="new-class-link" to='/classes'>      
    <button
        onClick={() => {
          handleSubmit(props);
        }}
      >Create Class
      </button>
</Link>

      {/* {props.names} */}
      {/* {newNameList} */}

      {/* <div className="new-name-list-container">{newNameList}</div> */}
      {/* <Grid names={props.names} handleClassDisplay={props.handleClassDisplay} /> */}
      </div>
    </React.Fragment>
  );
};

export default NewClass;
