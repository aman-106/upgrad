import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import axios from 'axios';
import { List, ListItem } from 'material-ui/List';
import SearchBar from 'material-ui-search-bar';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';

import Login from './Login';
import TeacherHomePage from './TeacherHomePage';
import StudentHomePage from './StudentHomePage';
class App extends React.Component {
  constructor(props) {
    super(props);
    // global state
    this.state = {
      // teacherLogin: false,
      // studentLogin: false,
      currentLogin:false,
      showStudentPage:false,
      showTeacherPage:false,
    }
    // login check
    this.updateCheck = this.updateCheck.bind(this);
    // login btn
    this.handleLogin = this.handleLogin.bind(this);
  }

  updateCheck(event) {
    let selected = event.target.id;
    this.setState({currentLogin:selected});

  }

  handleLogin(){
    if(this.state.currentLogin == 'teacherLogin'){
      this.setState({showTeacherPage:true,showStudentPage:false});
    }
    if(this.state.currentLogin == 'studentLogin'){
      this.setState({showStudentPage:true,showTeacherPage:false});
    }
  }

  render() {
    let currentPage=false;

    if(this.state.showTeacherPage){
      // console.log('dkdk');
      currentPage = <TeacherHomePage />
    }
    else if(this.state.showStudentPage ){
      currentPage = <StudentHomePage />
    }else {
      currentPage = (
        <Login updateCheck={this.updateCheck} currentLogin={this.state.currentLogin} handleLogin={this.handleLogin} />
      );

    }
    console.dir(currentPage);
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <AppBar title='UpGrad' />
        {currentPage}
      </MuiThemeProvider>
    );
  }
}

export default App;
