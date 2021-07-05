import React from 'react'
import ClassButton from './ClassButton'
import { useSelector } from 'react-redux';

//rendered by NavLinks since it is used as a way for user to navigate between their classes
// creates list of class buttons without the activeclass so that the class currently displayed is not repeated on the list.

const ClassButtonList = (props) => { 
  const classList = useSelector(state=>state.classList);
  const activeClass = useSelector(state=>state.activeClass);
  const classButtonList = []
  for (let i in classList) {
    if (JSON.stringify(classList[i]) !== JSON.stringify(activeClass)) { 
      classButtonList.push(
        <ClassButton handleCloseMainMenu={props.handleCloseMainMenu} loopClass={classList[i]} />
      )
    }
  }
  return classButtonList
}

export default ClassButtonList;