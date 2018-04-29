import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';


export default class StudentHomePage extends React.Component {

  constructor(props) {
    super(props);

    // get local data
    this.myStorage = window.localStorage;
    const data  = JSON.parse(this.myStorage.getItem('upgrad'));
    // this.state.studentList = data.studentList;
    // this.state.questionList = data.questionList;

    this.state = {
      studentList:data.studentList,
      studentId:null,
      currentStudent:null,
    };
  }

  selectStudent = (event, index, value) => { this.setState({studentId:value}); }

  render(){
    let currentStudent = false,currentQList=false;
    if(this.state.studentId){
      debugger;
      let index = Array.prototype.findIndex.call(this.state.studentList,(student)=>{
        return student.id == this.state.studentId
      });
      console.log(index);

      currentStudent = this.state.studentList[index];
      if(currentStudent){
        currentQList = currentStudent.questions.map((quesId)=>{
                return (<ListItem key={quesId}  primaryText={quesId} />);
        });
      }
    }
    return(
      <Card>
        <CardHeader
          title='List of Questions'
          subtitle="Select the questions"
        />
        <CardText>
          <SelectField
            floatingLabelText="Select Student"
            value={this.state.studentId}
            onChange={this.selectStudent}
          >
            {
              this.state.studentList.map((student)=>{
                return (<MenuItem key={student.id} value={student.id} primaryText={student.name} />);
              })
            }
          </SelectField>
          <List>
            {
              currentQList
            }
          </List>
        </CardText>
      </Card>
    );
  }
}
