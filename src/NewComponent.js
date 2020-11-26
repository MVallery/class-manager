import React, { Component } from 'react';
import './App.css'
import ReactDOM from 'react-dom';
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Sync from '@material-ui/icons/Sync';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SelectAll from '@material-ui/icons/SelectAll'
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import {SketchPicker} from 'react-color';
import ColorLens from '@material-ui/icons/ColorLens';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { DragDropContext } from 'react-beautiful-dnd'
// import reorder, { reorderQuoteMap } from '../reorder';
import {Droppable } from 'react-beautiful-dnd';

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
    }

    render(){
      console.log(this.props);
      return (
        <div onClick={() => {
          this.props.randomFunction();
        }} style={{ width: '100px', height: '100px', border: '1px solid black' }}>
          {this.props.randomProp}
        </div>
      )


      
    }
  };

  NewComponent.propTypes = {
    randomProp: PropTypes.any,
    randomFunction: PropTypes.func,
  };
export default NewComponent;
