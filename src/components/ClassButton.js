import React from 'react'

const ClassButton = (props) => {
  const handleSwitchClass = () => {
    console.log(props.classList)

    let temp = JSON.parse(JSON.stringify(props.classList))
    // temp = props.classList.students
    props.handleState({
      activeClass:temp
    })
  }
return (
  <div className='class-button-container'>
    <button onClick={handleSwitchClass}>{props.classList.title}</button>
    <p>{props.classList.count}</p>
  </div>
)
}

export default ClassButton