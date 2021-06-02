import React, { useReducer, useEffect } from "react";
//useReducer manage more complex state, write logic that runs when you change state rather than just change value. good when have interconnected state.

import { validate } from "../validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
      case 'TOUCH':
        return {
          ...state,
          isTouched: true
        }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const {id, onInput} = props;
  const {value, isValid} = inputState;

  useEffect(()=> {
    props.onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    })
  }

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur= {touchHandler}
        value={inputState.value}
      />
    ) : (
//      : props.element ==='checkbox' ? (
//       <Checkbox name={props.name} value={props.value} checked={props.checked} onChange={props.onChange} color='primary'/>

//     ): props.element === 'radio'? (
//       <Checkbox></Checkbox>
//     ): props.element === 'text-field'? (
// <Checkbox></Checkbox>
//     ):(
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur= {touchHandler}

        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
