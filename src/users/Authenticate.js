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
import {useSelector,useDispatch} from 'react-redux';

const Authenticate = props => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();  
  const dispatch = useDispatch();
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
          `${process.env.REACT_APP_API}/api/users/login`, 
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
        dispatch({type:"LOGIN",userId:responseData.userId, token:responseData.token})
        dispatch({type:"UPDATE_CLASS", temp:responseData.classList[0], tempClassList:responseData.classList})
      } catch (err) {
      }

    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API}/api/users/signup`, 

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
        dispatch({type:"LOGIN",userId:responseData.userId, token:responseData.token})
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
        `${process.env.REACT_APP_API}/api/users/googlelogin`, 
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
      dispatch({type:"LOGIN", userId:responseData.userId, token:id_token})
      dispatch({type:"UPDATE_CLASS", temp:responseData.classList[0], tempClassList:responseData.classList})
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
              clientId={process.env.REACT_APP_GOOGLE_API}
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

export default Authenticate;

