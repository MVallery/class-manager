import green from "@material-ui/core/colors/green";
import { fade } from "@material-ui/core/styles/colorManipulator";


const styles = (theme) => ({
    root: {
      width: "100%",
      color: green[600],
      "&$checked": {
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
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit,
        width: "auto",
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      width: "100%",
    },
    main: {
      paddingLeft: 15,
    },
    count: {
      paddingLeft: 5,
      alignItems: "center",
    },
    checked: {},
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      // transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 120,
        "&:focus": {
          width: 200,
        },
      },
    },
  });
  
  const textAreaStyles = {
    width: 500,
    height: 50,
    margin: 5,
  };


const Input = (props) => {
    console.log(props.inputState.columns)
    return (
        

        <div>
        {/* <div className={classes.main}> */}

        <div>
        <textarea
            name= 'inputNames'
            onChange={props.handleChange}
            value={props.inputNames}
            style={textAreaStyles}
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
        {/* <button onClick={props.handleNewStu}>Add Student</button> */}
        {/* <input
            name='rows'
            onChange={props.handleInput}
            value={props.inputState.rows}
            placeholder="rows"
        ></input>
        <input
            name='columns'
            onChange={props.handleInput}
            value={props.inputState.columns}
            placeholder="columns"
        ></input> */}

        <br />
        <h1>My Class:</h1>

        <ul>{/* {names} */}</ul>
        {/* <button onClick={this.handleGridSelect}>Grid Selection</button> */}
        {/* <button onClick={() => this.formFilledGrid(this.names)}> */}
            {/* Create Filled Grid */}
        {/* </button> */}
        <button onClick={() => props.formGridDisplay(props.names)}>
            Create Grid Display
        </button>
        </div>
        </div>
    )
}

export default Input