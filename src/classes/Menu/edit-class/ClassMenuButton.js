import React from 'react';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { checkActiveClass, randWhole, shuffleArray } from '../../../app-files/general';
import './ClassTitleMenu.css'

const ClassMenuButton = props => {
  const activeClass = useSelector(state=>state.activeClass)
  const classList = useSelector(state=>state.classList)
  const dispatch = useDispatch();

  const handleDeleteClass = () => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    tempClassList = tempClassList.filter(item => item.title !== temp.title)
    if (window.confirm("Are you sure you want to delete this class?")) {
      if (props.userId){
        props.handleDatabaseDelete();
      }
      temp = tempClassList.length>0? tempClassList[0]:{
        title: "",
        students: [],
        styling: { groups: 4, format: "groups", theme: "" },
        classSnapshot: {},
        count: 0,  
      }
    dispatch({type:"UPDATE_CLASS",temp, tempClassList})
    }

  }
  const handleDeleteMulti = () => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    if (window.confirm("Are you sure you want to delete these students?")) {
      for (let x = temp.students.length - 1; x >= 0; x--) {
        if (temp.students[x].name === "blank") {
          continue;
        }
        if (temp.students[x].isChecked === true) {
          temp.count = temp.count - temp.students[x].count;
          temp.students.splice(x, 1, { name: "blank", background:temp.students[x].background, key:randWhole(2,1000)});
        }
      }
      tempClassList = checkActiveClass(tempClassList, temp);
      if (props.userId) {
        props.handleDatabaseUpdate(temp);
      }
      dispatch({type:"UPDATE_CLASS",temp, tempClassList})

    }
  };
  const handleShuffleClass = () => {
    props.setClassMenuDisplay(null);
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    let shuffledTemp = shuffleArray(temp.students);
    temp.students = shuffledTemp;
    tempClassList = checkActiveClass(tempClassList, temp);
    if (props.userId) {
      props.handleDatabaseUpdate(temp);
    }
    dispatch({type:"UPDATE_CLASS",temp, tempClassList})

  };
  return (
    <div className="classes-title-menu-container">
      <div className="classes-chalkboard-container">
        <div className="classes-chalkboard-title-menu">
        
          <h1>{activeClass?activeClass.title:null}</h1>
          <IconButton style={{ 
                        color: "white", 
                        backgroundImage: 'linear-gradient(-20deg, transparent, #6d6b6b)', 
                        border: '3px ridge white'
                      }} 
                        onClick={(e)=>props.setClassMenuDisplay(e.currentTarget)}>
            <MenuIcon />
          </IconButton>
        </div>

        <Menu
          id="simple-menu"
          anchorEl={props.classMenuDisplay}
          keepMounted
          open={Boolean(props.classMenuDisplay)}
          onClose={()=>props.setClassMenuDisplay(false)}
          getContentAnchorEl={null}
          disableScrollLock={true}
        >
          <MenuItem onClick={()=>{props.setFormatModal(true); props.setClassMenuDisplay(false)}}>
            Change Layout
          </MenuItem>
          <MenuItem onClick={handleShuffleClass}>Shuffle Class</MenuItem>
          <MenuItem onClick={()=>{props.setAddStudentModal(true);props.setClassMenuDisplay(false)}}>Add Student(s)</MenuItem>
          <MenuItem onClick={handleDeleteMulti}>Delete Student(s)</MenuItem>
          <MenuItem onClick={handleDeleteClass}>Delete Class</MenuItem>

        </Menu>
    </div>
</div>
  )
}

export default ClassMenuButton