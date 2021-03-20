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
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    temp[index].isChecked = !temp[index].isChecked;
    this.setState({ nameList: temp });
  };



  handleAdd = (index,key) => {
    console.log('handleAdd',index,key)
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    console.log(temp)
    temp[index].count = temp[index].count + 1;
    this.setState({
      nameList: temp,
      count: this.state.count + 1,
      // classDisplay:tempClassDisplay
    });
  };



  handleSub = (index,key) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    temp[index].count = temp[index].count - 1;
    this.setState({
      nameList: temp,
      count: this.state.count - 1,
    });
  };

  handleReset = (index,key) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
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



  handleBottomNav = () => {};

  handleColorClick = (index,key) => {
    console.log('handlecolorclicked')
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    temp[index].displayColorPicker = !temp[index].displayColorPicker;
    this.setState({ nameList: temp });
  };
  handleClose = (index,key) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));

    temp[index].displayColorPicker = false;
    this.setState({ nameList: temp });
  };

  handleColorSelect = (index,key, e) => {
    let temp = JSON.parse(JSON.stringify(this.state.nameList));
    temp[index].background = e.hex;
    this.setState({ nameList: temp });
  };
  onDragStart = (e, index) => {
    this.draggedItem = this.state.nameList[index]; //griddisplay changed from nameList
    this.dragIndex = index
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };
  onDragOver = (index) => {
    const draggedOverItem = this.state.nameList[index];
    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    // filter out the currently dragged item
    let swap = this.state.nameList[index]
    this.nameList = this.state.nameList.filter(
      (item) => item !== this.draggedItem && item !== swap
    );
    // nameList = nameList.filter(
    //   item => item !== nameList[index]
    // )
    console.log(index)
    if (this.dragIndex>index) {
      this.nameList.splice(index, 0, this.draggedItem); //fix
      this.nameList.splice(this.dragIndex, 0, swap)
    } else {
      this.nameList.splice(this.dragIndex, 0, swap)
      this.nameList.splice(index, 0, this.draggedItem); //fix
    }
    // add the dragged item after the dragged over item


    // this.setState({ nameList });
  };
  onDragEnd = (index) => {
    this.setState({ nameList:this.nameList });

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
            handleSubMulti={this.handleSubMulti}
            handleSelectAll = {this.handleSelectAll}
            generalSelection = {this.state.generalSelection}
            handleInput = {this.handleInput}
            count= {this.state.count}
            nameList = {this.state.nameList}
            checkAll = {this.state.checkAll}
            names={names}
            handleState = {this.handleState}
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
