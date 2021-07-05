import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { colorPallet, checkActiveClass } from "../../../app-files/general";
import { useDispatch } from "react-redux";
const SelectGroup = (props) => {
  const { activeClass, classList } = props;
  const dispatch = useDispatch();

  const handleClassChange = (e) => {
    const { name, value } = e.target;
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    if (name === "groups") {
      let filteredTemp = temp.students.filter(
        //filter out old blank desks so that the change to the group amount does not cause any left over desks.
        (student) => student.name !== "blank"
      );
      temp.students = filteredTemp;
      let blankDesks = value - (temp.students.length % value); //value - remainder = number of empty desks needed to fill the group
      temp.styling.groups = Number(value);
      if (temp.students.length % value > 0) {
        for (let i = 0; i < blankDesks; i++) {
          temp.students.push({
            name: "blank",
            key: Math.floor(Math.random()),
            background: colorPallet(
              activeClass ? activeClass.styling.theme : null
            ),
          });
        }
      }
    }
    tempClassList = checkActiveClass(tempClassList, temp);
    if (props.userId) {
      props.handleDatabaseUpdate(temp);
    }
    dispatch({ type: "UPDATE_CLASS", temp, tempClassList });
  };
  return (
    <FormControl>
      <InputLabel>
        Each{" "}
        {activeClass
          ? activeClass.styling.format === "rows"
            ? "row"
            : "group"
          : null}
      </InputLabel>

      <Select
        className="select-form"
        value={activeClass ? activeClass.styling.groups : null}
        name="groups"
        onChange={handleClassChange}
        displayEmpty
      >
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectGroup;
