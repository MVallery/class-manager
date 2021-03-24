import React from 'react'
import {Link} from 'react-router-dom'
import './Grid.css'
  
  class Grid extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        gridDisplay: [],
        userGridSelection: [],
      };
    }
    handleRows = (e) => {
      var arr = []
      arr.push(e.target.value)
  
      this.setState({
        userGridSelection: arr,
      });
      console.log("rows: ", this.state.userGridSelection)
    };
    handleColumns = (e) => {
      var arr = this.state.userGridSelection;
      arr.push(e.target.value)
      this.setState({
        userGridSelection:arr
      });
      console.log("rows: ", this.state.userGridSelection[0])
  
      console.log("columns: ", this.state.userGridSelection[1])
  
    };
    fullGridFormation = (names) => {
      this.handleGridSelect()
      setTimeout(this.formFilledGrid(names), 2000)
      setTimeout(this.formGridDisplay(), 3000)
    }
    handleGridSelect =(names) => {
      var arr = [];
      for (let i = 0; i<this.state.userGridSelection[0]; i++) {
        arr.push([])
        for (let i=0; i<this.state.userGridSelection[1]; i++) {
          arr[arr.length-1].push(null)
        }
      }
      var testingForLoop = arr
      this.setState({
        gridDisplay:arr,
      })
      console.log(testingForLoop)
      console.log("GridDisplay after GridSelect ", this.state.gridDisplay)
    }
    formFilledGrid = (names) => {
      var gridFlat = this.state.gridDisplay.flat()
      for (var i=0; i<names.length;i++) {
        gridFlat[i] = names[i]
  
      }
      for (i=0; i<gridFlat.length;i++){
        if (gridFlat[i] === null) {
            gridFlat[i] = <div style={{height:"200px", width:"200px"}}><div className="blank-student"> </div></div>
        }
        else {
        }
      }
      var filledGrid = [], size = this.state.gridDisplay[0].length;
      while (gridFlat.length>0) filledGrid.push(gridFlat.splice(0, size));
      console.log(filledGrid)
      this.setState({
        gridDisplay: filledGrid,
      })
      console.log(this.state.gridDisplay)
    }
  
    formGridDisplay = () => {
      var newArray = this.state.gridDisplay
      
      var newGridDisplay = []
        for (var i=0; i<newArray.length;i++) {
          newGridDisplay.push(<div className="grid-row"> {newArray[i]}</div>)
        }
  
      console.log(newArray)
      this.setState({
        gridDisplay:newGridDisplay
      }, console.log('newGridDisplay', this.state))
    }
    onClick = () => {
      this.formGridDisplay();
      this.handleCD()
    }
    handleCD = () => {
      this.props.handleClassDisplay(this.state.gridDisplay)

    }
    render() {
      
      return (
        <React.Fragment>
      <input onChange={this.handleRows}
          value={this.state.userGridSelection[0]}
          placeholder="rows"></input>
      <input onChange={this.handleColumns}
            value={this.state.userGridSelection[1]}
            placeholder="columns"></input>
                      <button onClick = {this.handleGridSelect}>Grid Selection</button>

      <button onClick = {() => this.formFilledGrid(this.props.names)}>Create Filled Grid</button>
    <button onClick = {this.onClick}>Create your class</button>

      
      {this.state.gridDisplay}
</React.Fragment>
      )
    }
    
  
}
export default Grid
