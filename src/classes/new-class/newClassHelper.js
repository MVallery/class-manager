import { cap, colorPallet } from "../../app-files/general";
import { v4 as uuid } from 'uuid';

export const newClassHelper = (inputNames, inputClassName, classList) => {
    //replaces whitespace and splits into array of name elements.
  const nameArray = inputNames 
    .replace(/,\s+/g, ",")
    .replace(/\s+[^a-zA-Z]/, "")
    .split(",");
  let result = [];
  for (let x = 0; x < nameArray.length; x++) {
    if (nameArray[x].length === 0) {
      //ensure empty string doesn't make it through.
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
  let tempClassList = JSON.parse(JSON.stringify(classList));
  let temp = {
    title: inputClassName,
    students: result,
    count: 0,
    styling: {
      groups: 4,
      format: "groups",
      theme: "lightBlueGreen",
      size: "small",
    },
    classSnapShot: [],
    id: uuid(),
  };
  if (nameArray.length % 4 !== 0) {
    //add blank students to ensure that all groups are full with default setting of 4 per group.
    for (let i = 0; i < 4 - (nameArray.length % 4); i++) {
      temp.students.push({
        name: "blank",
        background: colorPallet("lightBlueGreen"),
        key: Math.floor(Math.random()),
      });
    }
  }
  tempClassList.push(temp);
  return { temp, tempClassList };
};
