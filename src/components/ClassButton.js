import React from 'react'

const ClassButton = (props) => {
  const handleSwitchClass = () => {
    console.log(props.classList.students)

    let temp = JSON.parse(JSON.stringify(props.classList.students))
    // temp = props.classList.students
    props.handleState({
      nameList:temp
    })
  }
return (
  <div className='class-button-container'>
    <button onClick={handleSwitchClass}>{props.classList.name}</button>
    {/* <p>{props.class.pts}</p> */}
  </div>
)
}

export default ClassButton