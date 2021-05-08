import React from 'react'
import './ClassButton.css'
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from 'react-redux';

const ClassButton = (props) => {
  const handleSwitchClass = () => {
    console.log(props.classList)
    props.handleCloseMainMenu()
    let temp = JSON.parse(JSON.stringify(props.loopClass))
    props.handleUpdate(temp, props.classList)

  }
return (
  <div className='cb-container'>
    {/* <button className="cb-container-button" onClick={handleSwitchClass}>{props.classList.title}</button><div className="cb-count">{props.classList.count}</div> */}
    <MenuItem onClick={handleSwitchClass}>{props.loopClass.title}</MenuItem>
  </div>
)
}
const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    handleUpdate: (temp, tempClassList) => {dispatch({type:'UPDATE_CLASS', temp,tempClassList })}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClassButton);