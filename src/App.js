import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Classes from "./pages/Classes";
import NewClass from "./pages/NewClass";
import Home from "./pages/Home";
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
      activeClass: {
        title: "",
        students: [],
        styling: { groups: 4, format: "groups", theme: "" },
        classSnapshot: {},
        count: 0,
      },
      inputClassName: "",
      classList: [],
      // nameOnlyList: [],

      // count: 0,
      hideClass: false,
      showAddNewClassModal: false,
    };
  }
  showAddNewClassHandler = () => {
    this.setState({ showAddNewClassModal: true });
  };
  cancelAddNewClassHandler = () => {
    this.setState({ showAddNewClassModal: false });
  };
  handleState = (data, callback) => {
    this.setState(data);
  };

  handleHideClass = (e) => {
    this.setState({ hideClass: true });
  };
  handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleInput = (e) => {
    const { value } = e.target;
    let temp = JSON.parse(JSON.stringify(this.state.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(this.state.classList));

    temp.styling.groups = Number(value);
    let newTempList = checkActiveClass(tempClassList, temp);
    for (let i = 0; i < value - (temp.students.length % value); i++) {
      temp.students.push({ name: "blank", key: Math.floor(Math.random()) });
    }
    this.setState({
      activeClass: temp,
      classList: newTempList,
    });
  };
  handleThemeInput = (e) => {
    const { name, value } = e.target;
    let temp = JSON.parse(JSON.stringify(this.state.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(this.state.classList));
    temp.styling.theme = value;
    for (let x in temp.students) {
      temp.students[x].background = colorPallet(value);
    }
    let newTempList = checkActiveClass(tempClassList, temp);

    this.setState({
      activeClass: temp,
      classList: newTempList,
    });
  };

  render() {
    console.log(this);

    return (
      <div>
        <Modal
          show={this.state.showAddNewClassModal}
          onCancel={this.cancelAddNewClassHandler}
          header={<div>Create a new class: </div>}
          footerClass="worksheet-item__modal-actions"
        >
          <NewClass {...this} {...this.state} />
        </Modal>
        <Switch>
          <Route path="/" exact>
            <Home showAddNewClassHandler={this.showAddNewClassHandler} />
          </Route>
          <Route path="/signup" exact>
            {/* <Authenticate /> */}
          </Route>
          <Route
            path="/new-class"
            exact
            render={(props) => <NewClass {...this} {...this.state} />}
          />

          <Route
            path="/classes"
            exact
            render={(props) => <Classes {...this} {...this.state} />}
          />
        </Switch>
      </div>
    );
  }
}

MyStudents.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MyStudents);
