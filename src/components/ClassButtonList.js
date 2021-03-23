import React from 'react'
import ClassButton from './ClassButton'
const ClassButtonList = (props) => {
  const classList = []
  for (let i in props.classList) {
    classList.push(
      <ClassButton handleState={props.handleState} classList={props.classList[i]} />
    )
  }
  return classList
}
export default ClassButtonList