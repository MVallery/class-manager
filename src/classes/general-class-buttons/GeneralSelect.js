import React from "react";
import SelectAll from "@material-ui/icons/SelectAll";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import IconButton from "@material-ui/core/IconButton";

const GeneralSelect = (props) => {
  const { activeClass, classList, updateDispatch } = props;
  const tempClassList = classList;
  const handleSelectAll = () => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].name === "blank") {
        continue;
      }
      temp.students[x].isChecked = true;
    }
    updateDispatch(temp, tempClassList);
  };
  const handleDeselectAll = () => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].name === "blank") {
        continue;
      }
      temp.students[x].isChecked = false;
    }
    updateDispatch(temp, tempClassList);
  };
  return (
    <React.Fragment>
      <IconButton onClick={handleDeselectAll}>
        <span className="icon-button-text">Deselect All</span>
        <SelectAll />
      </IconButton>
      <IconButton onClick={handleSelectAll}>
        <span className="icon-button-text">Select All</span>
        <LibraryAddCheckIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default GeneralSelect;
