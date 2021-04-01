import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Classes from "./pages/Classes";
import NewClass from "./pages/NewClass";
import Home from './pages/Home'
import { styles } from "./AppStyles";
import { colorPallet, checkActiveClass } from "./app-files/general";

import Modal from "./components/Modal";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";



class MyStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNames: "",
      activeClass: {title:'', students:[], styling:{groups:4, format:'groups', theme:''}, classSnapshot:{}, count:0},
      inputClassName:'',
      classList: [],
      nameOnlyList: [],

      // generalSelection: {groups:4, columns:'', rows:''},
      count: 0,
      hideClass: false,
      showAddNewClassModal: false,
    };
  }

  showAddNewClassHandler = () => {
    this.setState({showAddNewClassModal:true});
  }
  cancelAddNewClassHandler = () => {
    this.setState({showAddNewClassModal:false})
  }
  handleState = (data, callback) => {
    this.setState(data, () => {
      if(callback) {
        callback();
      }
    });
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
    const {value} = e.target
    let temp=JSON.parse(JSON.stringify(this.state.activeClass))
    let tempClassList =JSON.parse(JSON.stringify(this.state.classList))

    temp.styling.groups = Number(value)
    let newTempList = checkActiveClass(tempClassList, temp);
    
    this.setState({
      activeClass:temp,
      classList:newTempList
    })
    // this.setState({
    //   generalSelection: {groups:Number(value)},
    // })
  };
  handleThemeInput = (e) => {
    const {name, value} = e.target
    let temp=JSON.parse(JSON.stringify(this.state.activeClass))
    let tempClassList =JSON.parse(JSON.stringify(this.state.classList))
    temp.styling.theme = value
    for (let x in temp.students) {
      temp.students[x].background = colorPallet(value)
    }
    let newTempList = checkActiveClass(tempClassList, temp);
    
    this.setState({
      activeClass:temp,
      classList:newTempList
    })
  }

  render() {
    return (
      
      <div>
      <Modal
        show={this.state.showAddNewClassModal}
        onCancel={this.cancelAddNewClassHandler}
        header= {<div>Create a new class: </div>}
        footerClass="worksheet-item__modal-actions"
        // footer={}
      >
        <NewClass
            // {...props}
            inputNames={this.state.inputNames}
            handleChange={this.handleChange}
            activeClass = {this.state.activeClass}
            handleState={this.handleState}
            inputClassName={this.state.inputClassName}
            classList={this.state.classList}
            handleInput = {this.handleInput}
            // cancelAddNewClassHandler = {cancelAddNewClassHandler}
                    
        />
      </Modal>
        <Switch>
        <Route path="/" exact>
          <Home 
          showAddNewClassHandler= {this.showAddNewClassHandler}
          />
          {/* <NewClass
            inputNames={this.state.inputNames}
            handleChange={this.handleChange}
            activeClass = {this.state.activeClass}
            handleState={this.handleState}
            handleInput = {this.handleInput}
            inputClassName={this.state.inputClassName}
            classList={this.state.classList}
          /> */}
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
            inputClassName={this.state.inputClassName}
            classList={this.state.classList}
            handleInput = {this.handleInput}
          />
            )}/>  

        <Route path="/classes" exact
        render={(props) => (
          <Classes
            {...props}
            handleInput = {this.handleInput}
            handleThemeInput = {this.handleThemeInput}
            activeClass = {this.state.activeClass}
            inputNames = {this.state.inputNames}
            inputClassName={this.state.inputClassName}
            handleChange = {this.handleChange}
            handleState = {this.handleState}
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
