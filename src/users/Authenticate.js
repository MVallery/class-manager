import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import Input from "./FormElements/Input";
import Button from "./FormElements/Button";
import MaterialButton from '@material-ui/core/Button';

import Card from "../general/components/Card";
import LoadingSpinner from '../general/components/LoadingSpinner';
import ErrorModal from '../general/components/ErrorModal';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "./validators";
import { useForm } from "./form-hook";
import {useHttpClient} from '../general/http-hook';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from './FormElements/GoogleIcon';
import "./Authenticate.css";
import {connect} from 'react-redux';

const Authenticate = props => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();  
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {...formState.inputs,},
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {...formState.inputs,},
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `https://classmanagerbackend.herokuapp.com/api/users/login`, 
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            
          }
        )
        const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);

        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: responseData.userId,
            token: responseData.token,
            expiration: tokenExpirationDate.toISOString(),
          })
        );
        props.login(responseData.userId, responseData.token);
        props.handleUpdate(responseData.classList[0], responseData.classList);

      } catch (err) {
      }

    } else {
      try {
        const responseData = await sendRequest(
          `https://classmanagerbackend.herokuapp.com/api/users/signup`, 

          'POST', 
          JSON.stringify({
            email: formState.inputs.email.value,
            // name: formState.inputs.name.value,
            password: formState.inputs.password.value
          }),
          {
            'Accept': 'application/json',

          'Content-Type': 'application/json'
          }
        );

        props.login(responseData.userId, responseData.token);
      } catch (err) {
      }
    }
    props.history.push("/classes");

  };
  let location = useLocation()
  useEffect(() => {
    if (location.pathname==='/signup') {
      switchModeHandler()
    }
    if (location.pathname==='/login') {
      switchModeHandler()
    }
}, [location])
  const googleSuccess =async(res)=>{
    const result = res?.profileObj;
    var id_token = res.getAuthResponse().id_token;
    try{
      const responseData = await sendRequest(
        `https://classmanagerbackend.herokuapp.com/api/users/googlelogin`, 
        "POST",
        JSON.stringify({
          email:result.email,
          token:id_token,
          password:'google'
        }),
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          
        }
      )
      const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: responseData.userId,
          token: id_token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
      props.login(responseData.userId, id_token);
      props.handleUpdate(responseData.classList[0], responseData.classList);
    }catch(error){
      console.log(error)
    }
    props.history.push("/classes");

  } 
  const googleFailure =()=>{

  }
  return (
    <React.Fragment>
      <div className="authenticate-container">
        <ErrorModal error= {error} onClear={clearError}/>
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
          {!isLoginMode ? <h2>Sign up</h2> :<h2>Login Required</h2>}
                <hr />

          <form onSubmit={authSubmitHandler}>
            <Input
              id="email"
              element="input"
              type="text"
              label="Email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email."
              onInput={inputHandler}
            />
            <Input
              id="password"
              element="input"
              type="text"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password at least 6 characters."
              onInput={inputHandler}
            />

            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGN UP"}
            </Button>
            <GoogleLogin
              clientId="247069627752-hhs6nq2317fetlg46vjo70jvf3ced6nu.apps.googleusercontent.com"
              render={(renderProps)=>(
                <MaterialButton
                  // className={className.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<GoogleIcon/>}
                  varient="contained"
                  >
                    Google Login
                  </MaterialButton>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiepolicy="single_host_origin"
              />
          </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </Button>
        </Card>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList,
    userId:state.userId,
    token:state.token,
    isLoggedIn:state.isLoggedIn
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    handleUpdate: (temp, tempClassList) => {dispatch({type:'UPDATE_CLASS', temp, tempClassList })},
    login: (userId, token) => {dispatch({type:'LOGIN', userId, token })},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);

