import React from "react"
import './Logo.css'

const Logo = props => {
  let iconStyle
  let containerStyle
  let logoEnd
  if (props.style==='main-logo'){
    containerStyle={height:'120px', animation: 'moveInLeft 2s ease-out'}
    iconStyle={width:'120px', height:'120px'}
    logoEnd={lineHeight:'180px', fontSize:'4rem'}
  } else if (props.style==='navbar') {
    containerStyle={width:'500px', height:'50px'}
    iconStyle={width:'40px', height:'40px', border:'0.5px solid black', boxShadow: '1px 1px 5px 2px grey', padding:'1px 5px 7px 5px'}
    logoEnd={lineHeight:'50px', fontSize:'1.5rem'}
    

  }
  return (
    <div className="logo-heading" style={containerStyle}>
    <div className="logo-container" style={iconStyle}>
      <div className="logo-student-card-container">
        <div className="logo-student-icon-container">
          <div className="logo-student-head"></div>
          <div className="logo-student-body"></div>
        </div>
        <div className="logo-desk-top"></div>
        <div className="logo-desk">
          <span className="logo-c"></span>
        </div>
      </div>
    </div>
    <div className="logo-end" style={logoEnd}>Class Manager</div>
    </div>
  )
}

export default Logo