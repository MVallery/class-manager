import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { useDispatch } from "react-redux";
import { checkActiveClass } from "../../../app-files/general";
import { NearMe } from "@material-ui/icons";

const SelectSize = (props) => {
  const {activeClass, classList} = props;
  const dispatch = useDispatch();

  const handleClassChange = (e) => {
    const { name, value } = e.target;
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    temp.styling[name] = value;

      if (value === "regular") {
        props.handleSmallStyle({
          smallGroup: null,
          smallIcon: null,
          smallButtons: null,
          smallFont: null,
        });
      }
      if (value === "small") {
        props.handleSmallStyle({
          ...props.smallStyle,
          smallIcon: "small-icon",
          smallButtons: "small-buttons",
          smallFont: "small-font",
        });
      }
      tempClassList = checkActiveClass(tempClassList, temp);
      if (props.userId) {
        props.handleDatabaseUpdate(temp);
      }
      dispatch({type:"UPDATE_CLASS",temp, tempClassList})
  }
  return (
    <FormControl>
      <FormLabel>Icon Size</FormLabel>

      <RadioGroup
        aria-label="size"
        name="size"
        value={activeClass ? activeClass.styling.size : null}
        onChange={handleClassChange}
      >
        <FormControlLabel
          value="small"
          control={<Radio color="primary" />}
          label="Small"
        />
        <FormControlLabel
          value="regular"
          control={<Radio color="primary" />}
          label="Regular"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SelectSize;
