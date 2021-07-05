import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { colorPallet, checkActiveClass } from '../../../app-files/general';
import { useDispatch } from 'react-redux';

const SelectTheme = props => {
  const {activeClass, classList} = props;
  const dispatch = useDispatch();

  const handleThemeInput = (e) => {
    const { name, value } = e.target;
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    temp.styling[name] = value;

    for (let x in temp.students) {
      temp.students[x].background = colorPallet(value);
    }
    tempClassList = checkActiveClass(tempClassList, temp);
    dispatch({type:"UPDATE_CLASS",temp, tempClassList})

  };
  return (
    
    <FormControl>
    <InputLabel>Color Theme</InputLabel>

    <Select
      className="select-form"
      style={{ width: "200px" }}
      value={activeClass?activeClass.styling.theme:null}
      onChange={handleThemeInput}
      width={20}
      displayEmpty
    >
      <MenuItem value="lightBlueGreen">Light Blue Green</MenuItem>
      <MenuItem value="lightBluePurple">Light Blue Purple</MenuItem>
      <MenuItem value="brightRainbow">Bright Rainbow</MenuItem>
      <MenuItem value="pastelRainbow">Pastel Rainbow</MenuItem>
      <MenuItem value="green">Shades of Green</MenuItem>
    </Select>
  </FormControl>
  )
}

export default SelectTheme;