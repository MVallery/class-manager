import React, { Component } from "react";
import { Route, Switch, Link, NavLink } from "react-router-dom";

import "./App.css";
import Classes from "./pages/Classes";
import NewClass from "./pages/NewClass";
import Home from './pages/Home'
import { styles } from "./AppStyles";
import { cap } from "./app-files/general";


import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";



class MyStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNames: "",
      activeClass: {title:'', students:[], generalSelection:{}, classSnapshot:{}},
      inputClassName:'',
      classList: [],
      nameOnlyList: [],

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
    console.log(e)
    const {name, value} = e.target
    // console.log(name, value)
    // console.log(this.state.inputClassName)
    this.setState({
      [name]: value,
    });
  };
  handleInput = (e) => {
    // console.log('handleinput', e)
    const {name, value} = e.target
    this.setState({
      generalSelection: {groups:Number(value)},
    })
  };


  render() {
    // console.log(this.state.nameList)
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

 
    return (
      <div>
      {/* {this.state.classDisplay?this.state.classDisplay:null} */}
      {/* {names} */}
      {/* {this.state.nameList} */}

        <Switch>
        <Route path="/" exact>
          <Home />
          <NewClass
            inputNames={this.state.inputNames}
            handleChange={this.handleChange}
            activeClass = {this.state.activeClass}
            handleState={this.handleState}
            // names={names}
            handleClassDisplay = {this.handleClassDisplay}
            handleInput = {this.handleInput}
            inputClassName={this.state.inputClassName}
            generalSelection = {this.state.generalSelection}
            classList={this.state.classList}
          />
        </Route>
        <Route path="/signup" exact>
          {/* <Authenticate /> */}
        </Route>
        <Route path="/new-class" exact
        render={(props) => (
          <NewClass
            {...props}
            inputNames={this.state.inputNames}
            handleChange={this.handleChange}
            activeClass = {this.state.activeClass}
            handleState={this.handleState}
            // names={names}
            handleClassDisplay = {this.handleClassDisplay}
            inputClassName={this.state.inputClassName}
            classList={this.state.classList}

            handleInput = {this.handleInput}
            generalSelection = {this.state.generalSelection}
          />
            )}/>  

        <Route path="/classes" exact
        render={(props) => (
          <Classes
            {...props}
            generalSelection = {this.state.generalSelection}
            handleInput = {this.handleInput}
            count= {this.state.count}
            activeClass = {this.state.activeClass}
            checkAll = {this.state.checkAll}
            // names={names}
            handleState = {this.handleState}
            classDisplay = {this.state.classDisplay}
            classList = {this.state.classList}
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
