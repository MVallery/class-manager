import React, { Component } from "react";
import { Route, Switch, Link, NavLink } from "react-router-dom";

import "./App.css";
import Classes from "./pages/Classes";
import NewClass from "./pages/NewClass";
import Home from './pages/Home'
import { styles } from "./AppStyles";
import { cap } from "./app-files/general";
import Checkbox from "@material-ui/core/Checkbox";
import ColorLens from "@material-ui/icons/ColorLens";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { SketchPicker } from "react-color";
// import { DragDropContext } from "react-beautiful-dnd";
// import reorder, { reorderQuoteMap } from '../reorder';
// import { Droppable } from "react-beautiful-dnd";



class MyStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNames: "",
      nameList: [],
      nameOnlyList: [],
      // classDisplay: [],
      // isLoaded:false,
      generalSelection: {groups: '', columns:'', rows:''},
      count: 0,
      hideClass: false,
      checkAll: false,
    };
  }
  handleState = data => {
    this.setState(data);
  }
  handleClassDisplay = (gridDisplay) => {
    console.log('handleclassdisplay')
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    let slicedTemp = []
    for (let i=0;i<temp.length;i+this.state.generalSelection.groups) {
      let newTemp=temp.slice(i,this.state.generalSelection.groups+1)
      slicedTemp.push(newTemp)
    }
    temp.push(gridDisplay)
    this.setState({
      classDisplay:temp,
      isLoaded:true
    }, ()=> {console.log('stateisloaded', this.state)})
  }

  handleNewStu = () => {
    const newNameArray = this.state.inputNames.replace(/ /g, "").split(",");
    let temp = JSON.parse(JSON.stringify(this.state.nameList));

    for (let x = 0; x < newNameArray.length; x++) {
      const randColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      const id =
        cap(newNameArray[x]) + Math.floor(Math.random() * 20);
      let record = {
        name: cap(newNameArray[x]),
        count: 0,
        background: randColor,
        key: id,
        isChecked: false,
        displayColorPicker: false,
      };
      temp.push(record);
    }
    this.setState({
      nameList: temp,
      inputNames: "",
    });
  };

  handleHideClass = (e) => {
    this.setState({ hideClass: true });
  };
  handleChange = (e) => {
    this.setState({
      inputNames: e.target.value,
    });
  };
  handleInput = (e) => {
    console.log('handleinput', e)
    const {name, value} = e.target
    this.setState({
      generalSelection: {groups:Number(value)},
    })
  }

  handleSelection = (index, key) => {
    //let isChecked = this.state[key]
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    // for (let i =0;i<temp.length;i++){
    //   for(let x = 0;x<temp[i].length;x++){
    //     if (temp[i][x].key === key) {
    //       temp[i][x].isChecked = !temp[i][x].isChecked
    //     }
    //   }
    // }
    temp[index].isChecked = !temp[index].isChecked;
    this.setState({ nameList: temp });
  };

  handleSelectAll = () => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    if (this.state.checkAll === false) {
      for (let x = 0; x < temp.length; x++) {
        temp[x].isChecked = true;
      }
      this.setState({
        nameList: temp,
        checkAll: true,
      });
    } else {
      for (let x = 0; x < temp.length; x++) {
        temp[x].isChecked = false;
      }
      this.setState({
        nameList: temp,
        checkAll: false,
      });
    }
  };

  handleAdd = (index,key) => {
    console.log('handleAdd',index,key)
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    // for (let i =0;i<temp.length;i++){
    //   for(let x = 0;x<temp[i].length;x++){
    //     if (temp[i][x].key === key) {
    //       temp[i][x].count = temp[i][x].count+1
    //     }
    //   }
    // }
    console.log(temp)
    temp[index].count = temp[index].count + 1;
    // let tempClassDisplay = this.state.classDisplay
    // tempClassDisplay[0][0][index].count = tempClassDisplay[0][0][index].count+1
    this.setState({
      nameList: temp,
      count: this.state.count + 1,
      // classDisplay:tempClassDisplay
    });
  };

  handleAddMulti = (change) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    let count = JSON.parse(JSON.stringify(this.state.count));
    for (let x = 0; x < temp.length; x++) {
      if (temp[x].isChecked === true) {
        temp[x].count = temp[x].count + 1;
        count = count + 1;
      }
    }
    this.setState({
      nameList: temp,
      count: count,
    });
  };

  handleSub = (index,key) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    // for (let i =0;i<temp.length;i++){
    //   for(let x = 0;x<temp[i].length;x++){
    //     if (temp[i][x].key === key) {
    //       temp[i][x].count = temp[i][x].count-1
    //     }
    //   }
    // }
    temp[index].count = temp[index].count - 1;
    this.setState({
      nameList: temp,
      count: this.state.count - 1,
    });
  };
  handleSubMulti = (change) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    let count = JSON.parse(JSON.stringify(this.state.count));
    for (let x = 0; x < temp.length; x++) {
      if (temp[x].isChecked === true) {
        temp[x].count = temp[x].count - 1;
        count = count - 1;
      }
    }
    this.setState({
      nameList: temp,
      count: count,
    });
  };
  handleReset = (index,key) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    // for (let i =0;i<temp.length;i++){
    //   for(let x = 0;x<temp[i].length;x++){
    //     if (temp[i][x].key === key) {
    //       temp[i][x].count = 0
    //     }
    //   }
    // }
    temp[index].count = 0;
    this.setState({
      nameList: temp,
      //count: 0
    });
  };
  handleResetMulti = (index, key) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    let count = JSON.parse(JSON.stringify(this.state.count));
    for (let x = 0; x < temp.length; x++) {
      if (temp[x].isChecked === true) {
        temp[x].count = 0;
      }
    }
    this.setState({
      nameList: temp,
      count: count,
    });
  };
  handleDelete = (rowIndex,index) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    if (window.confirm("Are you sure you want to delete this student?")) {
      temp[index].name = 0;
      temp.splice(index, 1);
      this.setState({
        nameList: temp,
        //count: 0
      });
    } else {
    }
  };

  handleDeleteMulti = () => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    let count = JSON.parse(JSON.stringify(this.state.count));
    if (window.confirm("Are you sure you want to delete these students?")) {
      for (let x = temp.length - 1; x >= 0; x--) {
        if (temp[x].isChecked === true) {
          //temp[x] = 0;
          temp.splice(x, 1);
          console.log(temp);
        }
        console.log(temp);
        //this.setState({nameList:temp})
      }
      this.setState({
        nameList: temp,
        count: count,
      });
    }
  };

  handleBottomNav = () => {};

  handleColorClick = (index,key) => {
    console.log('handlecolorclicked')
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    // for (let i =0;i<temp.length;i++){
    //   for(let x = 0;x<temp[i].length;x++){
    //     if (temp[i][x].key === key) {
    //       temp[i][x].displayColorPicker = !temp[i][x].displayColorPicker
    //     }
    //   }
    // }
    temp[index].displayColorPicker = !temp[index].displayColorPicker;
    this.setState({ nameList: temp });
  };
  handleClose = (index,key) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    // for (let i =0;i<temp.length;i++){
    //   for(let x = 0;x<temp[i].length;x++){
    //     if (temp[i][x].key === key) {
    //       temp[i][x].displayColorPicker = false;
    //     }
    //   }
    // }
    temp[index].displayColorPicker = false;
    this.setState({ nameList: temp });
  };

  handleColorSelect = (index,key, e) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    // for (let i =0;i<temp.length;i++){
    //   for(let x = 0;x<temp[i].length;x++){
    //     if (temp[i][x].key === key) {
    //       temp[i][x].background = e.hex
    //     }
    //   }
    // }
    temp[index].background = e.hex;
    this.setState({ nameList: temp });
  };
  onDragStart = (e, key) => {
    this.draggedItem = this.state.nameList[key]; //griddisplay changed from nameList
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };
  onDragOver = (key) => {
    const draggedOverItem = this.state.nameList[key];
    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    // filter out the currently dragged item
    let nameList = this.state.gridDisplay.filter(
      (item) => item !== this.draggedItem
    );
    // add the dragged item after the dragged over item
    nameList.splice(key, 0, this.draggedItem); //fix

    this.setState({ nameList });
  };
  onDragEnd = () => {
    this.draggedIdx = null;
  };

  render() {
    console.log(this.state.nameList)
    const hideStyle = this.state.hideClass ? { display: "none" } : {};
    const { classes } = this.props;
    const popover = {
      position: "absolute",
      zIndex: "2",
    };
    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    };

    // const names = this.state.nameList.map((array, rowIndex)=> {
    //   //loops through the nameList array and maps styles & buttons for each name
    //   let recordIndex = -1;
    //   let recordMap = array.map((record,index) => {
    //     recordIndex+=1
    //     var key = record.key;
    //     let keyString = JSON.parse(JSON.stringify(key));
    //     var myStyle = {
    //       //changes style on top of card
    //       color: "black",
    //       fontSize: "20px",
    //       height: "180px",
    //       width: "180px",
    //       borderRadius: "20px",
    //       boxShadow: "10px 10px 10px grey",
    //       // margin: "0px 20px 20px",
    //       backgroundColor: record.background,
          
    //     };
    //     return (
    //         <div
    //           className="student-card-container"
    //           key={record.key}
    //           style={hideStyle}
    //         >
    //           <div
    //             style={myStyle}
    //             className="drag"
    //             draggable="true"
    //             onDragStart={(e) => this.onDragStart(e, recordIndex)}
    //             onDragEnd={this.onDragEnd}
    //             onDragOver={() => this.onDragOver(recordIndex)}
    //           >
    //             <div className="student-name-points-container">
    //               <div className="student-card-name">
    //                 <div className={classes.count}>{record.name}</div>
    //               </div>
    //             </div>
    //             <div className="student-card-points">
    //               <div className={classes.count}>{record.count}</div>
    //             </div>
    //             <br />
    //             <div className="student-card-popup">
    //               <IconButton
    //                 onClick={() => {
    //                   this.handleAdd(recordIndex,key);
    //                 }}
    //               >
    //                 <ThumbUp />
    //               </IconButton>
    //               <IconButton
    //                 onClick={() => {
    //                   this.handleSub(recordIndex,key);
    //                 }}
    //               >
    //                 <ThumbDown />
    //               </IconButton>
    //               <IconButton
    //                 onClick={() => {
    //                   this.handleColorClick(index,key);
    //                 }}
    //               >
    //                 <ColorLens />
    //               </IconButton>
    //               {/* <IconButton>
    //               <button onClick={() => {this.handleColorClick(index,key);}}>Color:</button>
    //               </IconButton> */}
    //               {this.state.nameList[rowIndex][index].displayColorPicker ? (
    //                 <div style={popover}>
    //                   <div
    //                     style={cover}
    //                     onClick={() => {
    //                       this.handleClose(index,key);
    //                     }}
    //                   />
    //                   <SketchPicker
    //                     color={this.state.nameList[rowIndex][index].background}
    //                     onChange={(e) => {
    //                       this.handleColorSelect(index,key, e);
    //                     }}
    //                   />
    //                 </div>
    //               ) : null}
    //               <div>
    //                 <FormGroup row>
    //                   <div key={record.key}>
    //                     <FormControlLabel
    //                       control={
    //                         <Checkbox
    //                           label={recordIndex}
    //                           checked={this.state.nameList[rowIndex][index].isChecked}
    //                           onChange={() => {
    //                             this.handleSelection(recordIndex,key);
    //                           }}
    //                           value={keyString}
    //                         ></Checkbox>
    //                       }
    //                     />
    //                   </div>
    //                 </FormGroup>
    //               </div>
    //             </div>
    //           </div>
    
    //         </div>
    //       );
        
    
    //   })
    //   return (
    //     // <div className='name-display-row'>{recordMap}</div>
    //     recordMap

    //   )
    // })
    const names = this.state.nameList.map((record, index) => {
      var key = record.key;
      let keyString = JSON.parse(JSON.stringify(key));
      var myStyle = {
        //changes style on top of card
        color: "black",
        fontSize: "20px",
        height: "160px",
        width: "160px",
        borderRadius: "20px",
        boxShadow: "10px 10px 10px grey",
        // margin: "0px 20px 20px",
        backgroundColor: record.background,
      };

      return (
        <div
          className="student-card-container"
          key={record.key}
          style={hideStyle}
        >
          <div
            style={myStyle}
            className="drag"
            draggable="true"
            onDragStart={(e) => this.onDragStart(e, index)}
            onDragEnd={this.onDragEnd}
            onDragOver={() => this.onDragOver(index)}
          >
            <div className="student-name-points-container">
              <div className="student-card-name">
                <div className={classes.count}>{record.name}</div>
              </div>
            </div>
            <div className="student-card-points">
              <div className={classes.count}>{record.count}</div>
            </div>
            <div className="student-card-popup">
              <IconButton
                onClick={() => {
                  this.handleAdd(index);
                }}
              >
                <ThumbUp />
              </IconButton>
              <IconButton className="icon"
                onClick={() => {
                  this.handleSub(index);
                }}
              >
                <ThumbDown />
              </IconButton>
              <IconButton
                onClick={() => {
                  this.handleColorClick(index);
                }}
              >
                <ColorLens />
              </IconButton>
              {/* <button onClick={() => {this.handleColorClick(index);}}>Color:</button> */}

              {this.state.nameList[index].displayColorPicker ? (
                <div style={popover}>
                  <div
                    style={cover}
                    onClick={() => {
                      this.handleClose(index);
                    }}
                  />
                  <SketchPicker
                    color={this.state.nameList[index].background}
                    onChange={(e) => {
                      this.handleColorSelect(index, e);
                    }}
                  />
                </div>
              ) : null}
              {/* </div> */}
              <div>
                <FormGroup row>
                  <div key={record.key}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          label={key}
                          checked={this.state.nameList[index].isChecked}
                          onChange={() => {
                            this.handleSelection(index);
                          }}
                          value={keyString}
                        ></Checkbox>
                      }
                    />
                  </div>
                </FormGroup>
              </div>
            </div>
          </div>

        </div>
      );
    });
    console.log(names)
    return (
      <div>
      {/* {this.state.classDisplay?this.state.classDisplay:null} */}
      {/* {names} */}
      {/* {this.state.nameList} */}

        <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signup" exact>
          {/* <Authenticate /> */}
        </Route>
        <Route path="/newclass" exact
        render={(props) => (
          <NewClass
            {...props}
            inputNames={this.state.inputNames}
            handleChange={this.handleChange}
            nameList = {this.state.nameList}
            handleState={this.handleState}
            names={names}
            handleClassDisplay = {this.handleClassDisplay}
            handleInput = {this.handleInput}
            generalSelection = {this.state.generalSelection}
          />
            )}/>  

        <Route path="/classes" exact
        render={(props) => (
          <Classes
            {...props}
            handleNewStu={this.handleNewStu}
            handleAddMulti={this.handleAddMulti}
            handleAdd={this.handleAdd}
            handleSub={this.handleSub}
            handleSubMulti={this.handleSubMulti}
            handleDelete = {this.handleDelete}
            handleSelectAll = {this.handleSelectAll}
            generalSelection = {this.state.generalSelection}
            handleInput = {this.handleInput}
            count= {this.state.count}
            names={names}
            classDisplay = {this.state.classDisplay}
          />)}/>

            </Switch>    
      </div>
    );
  }
}

MyStudents.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MyStudents);
