import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { useDispatch } from "react-redux";
import { checkActiveClass } from "../../../app-files/general";

const SelectLayout = (props) => {
  const {activeClass, classList} = props;
  const dispatch = useDispatch();

  const handleClassChange = (e) => {
    const { name, value } = e.target;
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    temp.styling[name] = value;
    tempClassList = checkActiveClass(tempClassList, temp);
    if (props.userId) {
      props.handleDatabaseUpdate(temp);
    }
    dispatch({type:"UPDATE_CLASS",temp, tempClassList})
  }
  return (
    <FormControl>
      <FormLabel>Layout</FormLabel>

      <RadioGroup
        aria-label="format"
        name="format"
        value={activeClass ? activeClass.styling.format : null}
        onChange={handleClassChange}
      >
        <FormControlLabel
          value="groups"
          control={<Radio color="primary" />}
          label="Groups"
        />
        <FormControlLabel
          value="rows"
          control={<Radio color="primary" />}
          label="Rows"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SelectLayout;
