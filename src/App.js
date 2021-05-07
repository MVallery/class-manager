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
import { AuthContext } from "./users/auth-context";
import {useHttpClient} from './general/http-hook'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./App.css";


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
      token: null,
      userId: false,
      isLoggedIn: false,
      hideClass: false,
      showAddNewClassModal: false,
    };
  }

  login = (uid, token) => {
    this.setState({ token: token, userId:uid, isLoggedIn:true });
    // this.setState({ userId: uid });
    // this.setState({ isLoggedIn: true });
    // this.setState
    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    this.props.history.push("/classes");
  };

  logout = () => {
    this.setState({ token: null });
    this.setState({ userId: null });
    this.setState({ isLoggedIn: false });
    localStorage.removeItem("userData");
    this.props.history.push("/");
  };
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (prevProps.isLoggedIn !== this.state.isLoggedIn) {
      if (!this.state.isLoggedIn) {
        if (
          storedData &&
          storedData.token &&
          new Date(storedData.expiration) > new Date()
        ) {
          this.login(
            storedData.userId,
            storedData.token,
            new Date(storedData.expiration)
          );
        }
      }
    }
  }

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("userData"));
  //   if (
  //     storedData &&
  //     storedData.token &&
  //     new Date(storedData.expiration) > new Date()
  //   ) {
  //     login(
  //       storedData.userId,
  //       storedData.token,
  //       new Date(storedData.expiration)
  //     );
  //   }
  // }, [login]);
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
      <React.Fragment>
        <AuthContext.Provider
          value={{
            isLoggedIn: !!this.state.token,
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
          }}
        >
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
              <Authenticate handleState={this.handleState}/>
            </Route>
            <Route path="/authenticate" exact>
              <Authenticate handleState={this.handleState}/>
            </Route>
            <Route
              path="/new-class"
              exact
              render={(props) => <NewClass {...this} {...this.state} />}
            />
          {this.state.activeClass?
            <Route
            path="/classes"
            exact
            render={(props) => <Classes {...this} {...this.state} />}
          />
        :
        <Route
        path="/classes"
        exact
        render={(props) => <React.Fragment><div><div><h2>You have no classes yet, please add your first class now!</h2></div><NewClass {...this} {...this.state} /></div></React.Fragment>}
      />
        }
            {/* <Route
              path="/classes"
              exact
              render={(props) => <Classes {...this} {...this.state} />}
            /> */}
          </Switch>
        </AuthContext.Provider>
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
    classList: state.classList
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(MyStudents)));
