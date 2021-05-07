import React from 'react'
import ClassButton from './ClassButton'
import { connect } from 'react-redux';

const ClassButtonList = (props) => {

  const classList = []
  const classNavBar = () => {
    for (let i in props.classList) {
      if (JSON.stringify(props.classList[i]) !== JSON.stringify(props.activeClass)) {
        classList.push(
          <ClassButton handleCloseMainMenu={props.handleCloseMainMenu} handleState={props.handleState} activeClass={props.activeClass} classList={props.classList[i]} />
        )
      }
  
    }
    console.log(classList)
    return classList

  }
  return classNavBar()
}
const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList
  }
}
export default connect(mapStateToProps)(ClassButtonList)