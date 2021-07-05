import { colorPallet, cap, checkActiveClass } from "../../../app-files/general";
export const addStudentsHelper = (inputNames, activeClass, classList)=>{
  const newNameArray = inputNames.replace(/ /g, "").split(",");
  let temp = JSON.parse(JSON.stringify(activeClass));
  let tempClassList = JSON.parse(JSON.stringify(classList));
  for (let i in newNameArray) {
    const id = cap(newNameArray[i]) + Math.floor(Math.random() * 20);
    let record = {
      name: cap(newNameArray[i]),
      count: 0,
      background: colorPallet(temp ? temp.styling.theme : null),
      key: id,
      isChecked: false,
      displayColorPicker: false,
    };
    //removes blank students from the list so that the new students can be added and blank students can be recalculated below.
    if (temp.students.some((el) => el.name === "blank")) {
      for (let x in temp.students) {
        if (temp.students[x].name === "blank") {
          temp.students.splice(x, 1, record);
          break;
        }
      }
      continue;
    }
    temp.students.push(record);
  }

  let remainder = temp.students.length % temp.styling.groups;
  if (remainder !== 0) {
    for (let i = 0; i < temp.styling.groups - remainder; i++) {
      //add blank students based on the students needed to fill in empty seats.
      temp.students.push({
        name: "blank",
        background: colorPallet(
          temp ? temp.styling.theme : null
        ),
        key: Math.floor(Math.random()),
      });
    }
  }
  tempClassList = checkActiveClass(tempClassList, temp);

  return {tempClassList, temp}
}