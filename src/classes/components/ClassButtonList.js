import React from 'react'
import ClassButton from './ClassButton'
import { connect } from 'react-redux';

//rendered by NavLinks since it is used as a way for user to navigate between their classes
// creates list of class buttons without the activeclass so that the class currently displayed is not repeated on the list.

const ClassButtonList = (props) => { 
  const classList = []
  for (let i in props.classList) {
    if (JSON.stringify(props.classList[i]) !== JSON.stringify(props.activeClass)) { 
      classList.push(
        <ClassButton handleCloseMainMenu={props.handleCloseMainMenu} loopClass={props.classList[i]} />
      )
    }
  }
  return classList

  
}
const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList
  }
}
export default connect(mapStateToProps)(ClassButtonList)