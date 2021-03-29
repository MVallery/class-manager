import React, { useEffect } from 'react'
import ClassButton from './ClassButton'
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
export default ClassButtonList