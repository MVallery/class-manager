import React from 'react'
import './ClassButton.css'
import MenuItem from "@material-ui/core/MenuItem";

const ClassButton = (props) => {
  const handleSwitchClass = () => {
    console.log(props.classList)
    props.handleCloseMainMenu()
    let temp = JSON.parse(JSON.stringify(props.classList))
    // temp = props.classList.students
    props.handleState({
      activeClass:temp
    })
  }
return (
  <div className='cb-container'>
    {/* <button className="cb-container-button" onClick={handleSwitchClass}>{props.classList.title}</button><div className="cb-count">{props.classList.count}</div> */}
    <MenuItem onClick={handleSwitchClass}>{props.classList.title}</MenuItem>
  </div>
)
}

export default ClassButton