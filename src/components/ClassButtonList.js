import React from 'react'
import ClassButton from './ClassButton'
const ClassButtonList = (props) => {
  const classList = []
  for (let i in props.classList) {
    // if (props.classList[i] !== props.activeClass) {
      classList.push(
        <ClassButton handleState={props.handleState} activeClass={props.activeClass} classList={props.classList[i]} />
      )
    // }

  }
  return classList
}
export default ClassButtonList