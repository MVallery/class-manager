import React, { useEffect } from 'react'
import ClassButton from './ClassButton'
const ClassButtonList = (props) => {
  useEffect(() => {
    classNavBar()
  }, [props.activeClass])
  const classList = []
  const classNavBar = () => {
    for (let i in props.classList) {
      console.log(props.classList[i])
      console.log(props.activeClass)
      console.log(props.classList[0] === props.activeClass)
      if (JSON.stringify(props.classList[i]) !== JSON.stringify(props.activeClass)) {
        console.log('props are not equal')
        classList.push(
          <ClassButton handleState={props.handleState} activeClass={props.activeClass} classList={props.classList[i]} />
        )
      }
  
    }
    console.log(classList)
    return classList

  }
  return classNavBar()
}
export default ClassButtonList