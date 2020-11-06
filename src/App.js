import React, { Component } from 'react';
import './App.css'
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Checkbox from '@material-ui/core/Checkbox';
import ColorLens from '@material-ui/icons/ColorLens';
import Delete from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import green from '@material-ui/core/colors/green';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import NewComponent from './NewComponent';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Sync from '@material-ui/icons/Sync';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import SelectAll from '@material-ui/icons/SelectAll';
import Student from './student';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import {SketchPicker} from 'react-color';
import { DragDropContext } from 'react-beautiful-dnd'
// import reorder, { reorderQuoteMap } from '../reorder';
import {Droppable } from 'react-beautiful-dnd';


const styles = theme => ({
  root: {
    width: '100%',
    color: green[600],
    '&$checked': {
    color: green[500],
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  main: {
    paddingLeft: 15,
  },
  count:{
    paddingLeft: 5,
    alignItems: 'center',

  },
  checked: {},
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});


const textAreaStyles = {
  width: 500,
  height: 50,
  margin: 5
};

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

class MyStudents extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        inputNames: "",
        nameList: [],
        nameOnlyList: [],
        // { name: blah, count: 0, background: selection: }
        count: 0,
        randName: "",
        searchName: "",
        searchNameList: [],
        hideClass: false,
        checkAll: false,
      }
    }

    handleSubmit=() => {
      if (this.state.nameList.length>0) {
        if (window.confirm("Are you sure? This will erase your other students! To add new students make sure to click Add Student instead")){
          const nameArray = this.state.inputNames.replace(/, /g,",").split(',');
          let nameOnlyResult = []
          let result = [];

          for( let x=0; x<nameArray.length; x++){
            const randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
            const id = capitalizeFirstLetter(nameArray[x])+Math.floor(Math.random()*20)
            let record = {
              name: capitalizeFirstLetter(nameArray[x]),
              count: 0,
              background: randColor,
              key: id,
              isChecked: false,
              displayColorPicker: false,
            }
            result.push(record);
            nameOnlyResult.push(record.name);
          }
          this.setState({
            nameList: result,
            nameOnlyList: nameOnlyResult,
            inputNames:"",
          });

        } 
        else {;}
      }
    else {     
      const nameArray = this.state.inputNames.replace(/, /g,",").split(',');
      let nameOnlyResult = []
      let result = [];

      for( let x=0; x<nameArray.length; x++){
        const randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        const id = capitalizeFirstLetter(nameArray[x])+Math.floor(Math.random()*20)
        let record = {
          name: capitalizeFirstLetter(nameArray[x]),
          count: 0,
          background: randColor,
          key: id,
          isChecked: false,
          displayColorPicker: false,
        }
        result.push(record);
        nameOnlyResult.push(record.name);
      }
      this.setState({
        nameList: result,
        nameOnlyList: nameOnlyResult,
        inputNames:"",
      });

    }}
    handleNewStu= () => {
      const newNameArray = this.state.inputNames.replace(/ /g,"").split(',');
      let temp = JSON.parse(JSON.stringify(this.state.nameList));

      for( let x=0; x<newNameArray.length; x++){
        const randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        const id = capitalizeFirstLetter(newNameArray[x])+Math.floor(Math.random()*20)
        let record = {
          name: capitalizeFirstLetter(newNameArray[x]),
          count: 0,
          background: randColor,
          key: id,
          isChecked: false,
          displayColorPicker: false,
        } 
        temp.push(record);
      }
      this.setState({
        nameList: temp,
        inputNames: "",

      });
    }

    handleHideClass=(e)=>{
      this.setState({hideClass:true});
    }
    handleChange=(e) =>{
      this.setState({
        inputNames: e.target.value,
      });
    }
    handleChangeGroups = (e) => {
      this.setState({
        numGroups: e.target.value,
      })
    }
    handleSubmitGroups = () => {
      let temp = JSON.parse(JSON.stringify(this.state.numGroups));
      let tempNum = this.state.numGroups
      var groupList = []
      for (let x=0; x<tempNum; x++){
        groupList.push(<React.Fragment>
          <Grid item xs={3}>
            <Paper></Paper>
          </Grid>
        </React.Fragment>);
      }
      this.setState({
        groupList:groupList
      })
      
    }
    handleSelection = index => {
      //let isChecked = this.state[key]
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      temp[index].isChecked = !temp[index].isChecked;
      this.setState({ nameList: temp });
    };
    
    handleSelectAll = () => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      if (this.state.checkAll === false){
        for (let x=0; x<temp.length;x++) 
        {temp[x].isChecked = true;
        }
        this.setState({ 
          nameList: temp,
          checkAll:true
        })
      }else{
        for (let x=0; x<temp.length;x++) 
        {temp[x].isChecked = false;
        }
        this.setState({ 
          nameList: temp,
          checkAll:false
        })
      }
    }

    handleSearchChange=(e) =>{
      this.setState({
        searchName: e.target.value,
      });
    };
    handleAdd = (index) => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      temp[index].count = temp[index].count + 1;
      
      this.setState({
        nameList: temp,
        count: this.state.count + 1
      })
    };

    handleAddMulti = (index, key) => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      let count = JSON.parse(JSON.stringify(this.state.count));
      for ( let x=0; x<temp.length; x++){
        if (temp[x].isChecked === true) {
          temp[x].count = temp[x].count + 1;
          count = count+1;
      }
    }
    this.setState({
      nameList: temp,
      count: count
  })
    };


    handleSub = (index) => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      temp[index].count = temp[index].count - 1;
      this.setState({
        nameList: temp,
        count: this.state.count - 1
      })
    };
    handleSubMulti = (index, key) => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      let count = JSON.parse(JSON.stringify(this.state.count));
      for ( let x=0; x<temp.length; x++){
        if (temp[x].isChecked === true) {
          temp[x].count = temp[x].count - 1;
          count = count-1;
      }
    }
    this.setState({
      nameList: temp,
      count: count
  })
    };
    handleReset = (index) => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      temp[index].count = 0;
      this.setState({
        nameList: temp
        //count: 0
      })
    };
    handleResetMulti = (index, key) => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      let count = JSON.parse(JSON.stringify(this.state.count));
      for ( let x=0; x<temp.length; x++){
        if (temp[x].isChecked === true) {
          temp[x].count = 0;
      }
    }
    this.setState({
      nameList: temp,
      count: count
  })
    };
    handleDelete = (index) => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      if(window.confirm("Are you sure you want to delete this student?"))
      {temp[index].name = 0;
      temp.splice(index,1);
      this.setState({
        nameList: temp
        //count: 0
      })}
      else {;}
    };

    handleDeleteMulti = () => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      let count = JSON.parse(JSON.stringify(this.state.count));
      if(window.confirm("Are you sure you want to delete these students?"))
      {for ( let x=0; x<temp.length; x++){
          if (temp[x].isChecked === true) {
            //temp[x].name = 0;
            temp.splice(x,1);
            console.log(temp)
        }
        console.log(temp)
        //this.setState({nameList:temp})
      }
      this.setState({
        nameList: temp,
        count: count
    })}
    };
    handleDeleteMulti = () => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      let count = JSON.parse(JSON.stringify(this.state.count));
      if(window.confirm("Are you sure you want to delete these students?"))

      {for ( let x=temp.length-1; x>=0; x--){
          if (temp[x].isChecked === true) {
            //temp[x] = 0;
            temp.splice(x,1);
            console.log(temp)
        }
        console.log(temp)
        //this.setState({nameList:temp})
      }
      this.setState({
        nameList: temp,
        count: count
    })}
    };
    handleRandom = () => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      let random = temp[Math.floor(Math.random()*temp.length)];
      let randomName = random.name;
      var myStyle = {
        color: 'black',
        fontSize: '20px',
        backgroundColor:random.background }
      var randomNameList = <div style={myStyle}>
      <React.Fragment>
        <Grid item xs={2}>
          {randomName}
        </Grid>
      </React.Fragment></div>

    
      this.setState({
        randName: randomNameList
        //count: 0
      })

    };
    handleSearch = () => {
      this.setState({hideClass:true});
      const namesOnly = JSON.parse(JSON.stringify(this.state.nameOnlyList));      
      const searchName = JSON.parse(JSON.stringify(this.state.searchName))
        if(namesOnly.indexOf(searchName) > -1){
          //const randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
          let record = searchName
          //result.push(record);
          this.setState({
            searchNameList: record,
            searchName:""
          });
          
        }
        else {
          let record = 'no match'
          this.setState({
            searchNameList: record,
            searchName:""
          });
        
        }
    };
    handleBottomNav = () => {
    }

    handleColorClick = (index) => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      temp[index].displayColorPicker = !temp[index].displayColorPicker
      this.setState({nameList: temp})
    }
    handleClose = (index) => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      temp[index].displayColorPicker = false
      this.setState({nameList: temp})    
    }

    handleColorSelect = (index,e) => {
      let temp = JSON.parse(JSON.stringify(this.state.nameList));
      temp[index].background = e.hex;
      this.setState({nameList: temp})  
    }
    onDragStart = (e, index) => {
      this.draggedItem = this.state.nameList[index];
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.target.parentNode);
      e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };
    onDragOver = index => {
      const draggedOverItem = this.state.nameList[index];
                      // if the item is dragged over itself, ignore
      if (this.draggedItem === draggedOverItem) {
        return;
      }
      // filter out the currently dragged item
      let nameList = this.state.nameList.filter(item => item !== this.draggedItem);
      // add the dragged item after the dragged over item
      nameList.splice(index, 0, this.draggedItem);

      this.setState({ nameList });
    };
    onDragEnd = () => {
      this.draggedIdx = null;
    };
    FormRow = (names) => {
      var i;
      var nameList = []
      for(i = 0; i <names.length; i++){
        nameList.push(<React.Fragment>
          <Grid item xs={3}>
            <Paper>{names[i]}</Paper>
          </Grid>
        </React.Fragment>)
      };
      return(nameList)
    };
    FormRowRandStudent = (name) => {
      var randName = []
      randName.push( <React.Fragment>
        <Grid item xs={3}>
          <Paper>{name}</Paper>
        </Grid>
        </React.Fragment>)
      return(randName)
    }


    render(){
      const hideStyle = this.state.hideClass ? {display:'none'} :{};
      const { classes } = this.props;
      const popover = {
        position: 'absolute',
        zIndex: '2',
      }
      const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }
      const names = this.state.nameList.map((record, index) => {
      var key = record.key
      let keyString = JSON.parse(JSON.stringify(key))
        var myStyle = {
          color: 'black',
          fontSize: '20px',
          backgroundColor:record.background 
        }
 
        return (
          <div key={record.key} style= {hideStyle}>
          <div style={myStyle} className="drag" draggable="true" 
              onDragStart={e => this.onDragStart(e, index)}
              onDragEnd={this.onDragEnd} 
              onDragOver={() => this.onDragOver(index)}>
            <div className = {classes.count}>{record.name}</div>
            <div className = {classes.count}>{record.count}</div><br />
                            <IconButton onClick={() => {this.handleAdd(index);}}>
                              <ThumbUp/>
                            </IconButton>
                            <IconButton onClick={() => {this.handleSub(index);}}>
                              <ThumbDown/>
                            </IconButton>
                            {/* <div> */}
                              <IconButton onClick={() => {this.handleColorClick(index);}}>
                              <ColorLens/>
                              </IconButton>
                            {/* <button onClick={() => {this.handleColorClick(index);}}>Color:</button> */}

                              {this.state.nameList[index].displayColorPicker ? <div style= { popover}>
                            <div style = { cover } onClick = {() => {this.handleClose(index) }} />
                            <SketchPicker color= {this.state.nameList[index].background} 
                                          onChange= {(e) => {this.handleColorSelect(index,e)}} />
                            </div> : null }
                            {/* </div> */}

                            <FormGroup row>
                                  <div key = {record.key}> 
                                    <FormControlLabel 
                                      control={<Checkbox label= {key} checked={this.state.nameList[index].isChecked} 
                                                  onChange={() => {this.handleSelection(index)}} 
                                                  value= {keyString}></Checkbox>}/></div>
                            </FormGroup>
          </div>
          </div>
                )
                });

      
  return (
    
        <div> 
              <div className={classes.root}>
                <AppBar position="static">
                <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                    <MenuIcon />
                </IconButton>

                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  <h3>My Class List</h3>
                  <NewComponent randomProp={this.state.count} />
                  <Student randomProp={this.state.count}/>
                </Typography>

                <IconButton onClick={this.handleSearch} >
                    <SearchIcon/>
                </IconButton>
              <div className={classes.grow} />
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <IconButton onClick={this.handleSearch} >
                      <SearchIcon/>
                    </IconButton>
                  </div>
                    <InputBase onSubmit= {this.handleSearch} 
                               onChange={this.handleSearchChange} 
                               value={this.state.searchName}  
                               placeholder="Search…" classes={{root: classes.inputRoot,
                                                              input: classes.inputInput,
                                                                }}/>
                </div>
                </Toolbar>
                </AppBar>
                </div>


          <div className ={classes.main}>
          <textarea onChange ={this.handleChange}
                    value={this.state.inputNames}
                    style ={textAreaStyles}
                    placeholder="Separate names with Commas"/><br />

          <button onClick={this.handleSubmit}>Create List</button>
          <button onClick={this.handleNewStu}>Add Student</button>
          <textarea onChange ={this.handleChangeGroups}
                    value={this.state.numGroups}
                    style ={textAreaStyles}
                    placeholder="Enter number of Groups"/><br />
          <button onClick ={this.handleSubmitGroups}>Create Groups</button>
            <h1>My Class:</h1><IconButton onClick= {this.handleAddMulti}>
                                <ThumbUp/>
                              </IconButton>
                              <IconButton onClick={this.handleSubMulti}>
                                <ThumbDown/>
                              </IconButton>
                              <IconButton onClick={this.handleResetMulti}>
                                <Sync/>
                              </IconButton>
                              <IconButton onClick={this.handleDeleteMulti}>
                                <Delete/>
                              </IconButton>
                              <IconButton onClick={this.handleSelectAll}>
                                <SelectAll/>
                              </IconButton>
              <ul>
                {/* {names} */}
              </ul>
        <Grid container spacing={8}>
            <Grid container item md={12} spacing={24}>
              {this.FormRow(names)}
            </Grid>
        </Grid>
        <h1>Total Class Points: {this.state.count}</h1>
        <button onClick={this.handleRandom}>Select Random Student:</button>
        {/* <ul>{this.state.randName}</ul> */}

        <Grid container spacing={8}>
            <Grid container item md={12} spacing={12}>
              {this.FormRowRandStudent(this.state.randName)}
            </Grid>
        </Grid>
        <h3>{this.state.searchNameList}</h3>
        </div>
        <BottomNavigation onChange={this.handleBottomNav} showLabels className={classes.root}> {/*took away value = {value} caused error */}
          <BottomNavigationAction label='Reset' icon={<Sync/>}/>
        </BottomNavigation>
        </div>

      );
      
    }
  };

  MyStudents.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(MyStudents)
