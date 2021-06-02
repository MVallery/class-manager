import React from 'react'
import './ClassButton.css'
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from 'react-redux';

const ClassButton = (props) => {
  const handleSwitchClass = () => {
    props.handleCloseMainMenu()
    let temp = JSON.parse(JSON.stringify(props.loopClass))
    props.handleUpdate(temp, props.classList)

  }
return (
  <div className='cb-container'>
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