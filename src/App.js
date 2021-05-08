import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Classes from "./classes/Classes";
import NewClass from "./classes/components/NewClass";
import Home from "./general/Home";
import Authenticate from "./users/Authenticate";
import { styles } from "./AppStyles";
import { colorPallet, checkActiveClass } from "./app-files/general";

import Modal from "./general/components/Modal";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./App.css";


class MyStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNames: "",
      inputClassName: "",
      hideClass: false,
      showAddNewClassModal: false,
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      if (!this.props.isLoggedIn) {
        if (
          storedData &&
          storedData.token &&
          new Date(storedData.expiration) > new Date()
        ) {
          this.props.login(
            storedData.userId,
            storedData.token,
            new Date(storedData.expiration)
          );
        }
      }
    }
  }
  handleState = (data, callback) => {
    this.setState(data);
  };

  showAddNewClassHandler = () => {
    this.setState({ showAddNewClassModal: true });
  };
  cancelAddNewClassHandler = () => {
    this.setState({ showAddNewClassModal: false });
  };


  handleHideClass = (e) => {
    this.setState({ hideClass: true });
  };

  handleChange = (e) => {
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
    this.props.handleUpdate(temp, newTempList)
  };

  handleThemeInput = (e) => {
    const { name, value } = e.target;
    console.log(this.props)
    let temp = JSON.parse(JSON.stringify(this.props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(this.props.classList));
    temp.styling.theme = value;
    for (let x in temp.students) {
      temp.students[x].background = colorPallet(value);
    }
    let newTempList = checkActiveClass(tempClassList, temp);
    this.props.handleUpdate(temp, newTempList)

  };

  render() {
    console.log(this);

    return (
      <React.Fragment>

          <Modal
            show={this.state.showAddNewClassModal}
            onCancel={this.cancelAddNewClassHandler}
            header={<div>Create a new class: </div>}
            footerClass="worksheet-item__modal-actions"
          >
            <NewClass
              {...this}
              {...this.state}
              cancelAddNewClassHandler={this.cancelAddNewClassHandler}
            />
          </Modal>
          <Switch>
            <Route path="/" exact>
              <Home showAddNewClassHandler={this.showAddNewClassHandler} />
            </Route>
            <Route path="/signup" exact>
              <Authenticate history={this.props.history}/>
            </Route>
            <Route path="/authenticate" exact>
              <Authenticate history={this.props.history}/>
            </Route>
            <Route
              path="/new-class"
              exact
              render={(props) => <NewClass {...this} {...this.state} />}
            />
          {this.props.activeClass?
            <Route
            path="/classes"
            exact
            render={(props) => <Classes {...this} {...this.state} />}
          />
        :
        <Route
        path="/classes"
        exact
        render={(props) => <React.Fragment><div style={{padding:'200px'}}><div><h2>You have no classes yet, please add your first class now!</h2></div><NewClass {...this} {...this.state} /></div></React.Fragment>}
      />
        }

          </Switch>
      </React.Fragment>
    );
  }
}

MyStudents.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList,
    isLoggedIn:state.isLoggedIn,
    token:state.token,
    userId:state.userId
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    login: (userId, token) => {dispatch({type:'LOGIN', userId,token })},
    logout: ()=> {dispatch({type:'LOGOUT'})},
    handleUpdate: (temp, tempClassList) => {dispatch({type:'UPDATE_CLASS', temp,tempClassList })}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(MyStudents)));
