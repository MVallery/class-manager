import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Classes from "./classes/Classes";
import Home from "./general/Home";
import Authenticate from "./users/Authenticate";
import { styles } from "./AppStyles";
import { cap } from "./app-files/general";
import NewClassModal from "./classes/new-class/NewClassModal";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./App.css";

class MyStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddNewClassModal: false,
    };
  }

  componentDidUpdate(prevProps) {
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

  showAddNewClassHandler = () => {
    this.setState({ showAddNewClassModal: true });
  };
  cancelAddNewClassHandler = () => {
    this.setState({ showAddNewClassModal: false });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.props["handle" + cap(name)](value);
  };

  render() {
    return (
      <React.Fragment>
        <NewClassModal
              showAddNewClassModal={this.state.showAddNewClassModal}
              setAddNewClassModal={this.cancelAddNewClassHandler}
              handleChange={this.handleChange}
            />
        <Switch>
          <Route path="/" exact>
            <Home showAddNewClassHandler={this.showAddNewClassHandler} />
          </Route>
          <Route path="/signup" exact>
            <Authenticate history={this.props.history} />
          </Route>
          <Route path="/authenticate" exact>
            <Authenticate history={this.props.history} />
          </Route>
          <Route
            path="/classes"
            exact
            render={(props) => {
              return (
                <CSSTransition
                  in={true}
                  mountOnEnter
                  unmountOnExit
                  timeout={500}
                  classNames="transition-classes"
                >
                  <Classes {...this} {...this.state}/>
                </CSSTransition>
              );
            }}
          />
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
    inputNames: state.inputNames,
    inputClassName: state.inputClassName,
    isLoggedIn: state.isLoggedIn,
    token: state.token,
    userId: state.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (userId, token) => {
      dispatch({ type: "LOGIN", userId, token });
    },
    handleUpdate: (temp, tempClassList) => {
      dispatch({ type: "UPDATE_CLASS", temp, tempClassList });
    },
    handleInputNames: (inputNames) => { //needed for onChange
      dispatch({ type: "INPUT_NAMES", inputNames });
    },
    handleInputClassName: (inputClassName) => {
      dispatch({ type: "INPUT_CLASS_NAME", inputClassName });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(MyStudents)));
