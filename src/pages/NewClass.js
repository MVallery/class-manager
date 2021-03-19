import React from 'react'
import Grid from '../components/Grid'
const NewClass = (props) => {
  return <React.Fragment>
  <textarea
  onChange={props.handleChange}
  value={props.inputNames}
  // className={textAreaStyles}
  placeholder="Separate names with Commas"
/>
<br />
<input
            type='quantity'
            name='groups'
            onChange={props.handleInput}
            value={props.generalSelection.groups}
            placeholder="groups"
        ></input>
<button onClick={props.handleSubmit}>Create List</button>
<Grid names={props.names} handleClassDisplay={props.handleClassDisplay}/>
</React.Fragment>

}

export default NewClass