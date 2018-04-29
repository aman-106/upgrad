import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

import QuestionBuilder from './QuestionBuilder';

const style = {
  margin: 12,
};

const styles = {
    block: {
      maxWidth: 250,
    },
    checkbox: {
      marginBottom: 16,
    },
};






// export default class TeacherHomePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       qType:false,
//     }
//     // login check
//     this.updateCheck = this.updateCheck.bind(this);
//
//   }
//
//   updateCheck(event) {
//     let selected = event.target.id;
//     this.setState({qType:selected});
//   }
//
//   render(){
//     return (
//       // <Card>
//       //   <CardText>
//       //     Question type
//       //   </CardText>
//       //   <CardText style={styles.block} >
//       //       <Checkbox
//       //       label="teacher"
//       //       id='teacherLogin'
//       //       style={styles.checkbox}
//       //       checked={this.props.currentLogin == 'teacherLogin'}
//       //       onCheck={this.props.updateCheck}
//       //       />
//       //   </CardText>
//       //   <CardText style={styles.block} >
//       //       <Checkbox
//       //       label="student"
//       //       id='studentLogin'
//       //       style={styles.checkbox}
//       //       checked={this.props.currentLogin == 'studentLogin'}
//       //       onCheck={this.props.updateCheck}
//       //       />
//       //   </CardText>
//       //   <CardActions>
//       //     <FlatButton label="Login" onClick={this.props.handleLogin} />
//       //   </CardActions>
//       // </Card>
//
//       // show questions to be assigned
//
//     );
//   }
// }



export default class TeacherHomePage extends  React.Component  {

  constructor(props) {
    super(props);

    // get local data
    this.myStorage = window.localStorage;
    const data  = JSON.parse(this.myStorage.getItem('upgrad'));
    // this.state.studentList = data.studentList;
    // this.state.questionList = data.questionList;

    this.state = {
      selected: [1],
      studentId:null,
      open: false,
      studentList:data.studentList,
      questionList:data.questionList,
    };

    this.handleAssginQToStudent = this.handleAssginQToStudent.bind(this);
  }

  updateQuestionList=(newQ)=>{
    this.setState((prevState)=>{
      let nextState = Object.assign({},prevState);
      nextState.questionList = [...prevState.questionList,newQ]
      console.log(nextState);
      return nextState;
    },this.saveData);
  }

  saveData = ()=>{
    let data = {
      studentList:this.state.studentList,
      questionList:this.state.questionList,
    };
    data = JSON.stringify(data);
    this.myStorage.setItem('upgrad',data);
    console.log("ff");
    console.dir(this.myStorage);
  }

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selected) => {
    this.setState({
      selected: selected,
    });
  };

  handleAssginQToStudent(){
    if(this.state.studentId){
      console.dir(this.state.studentList);
      // find student
      const curentStudent  = this.state.studentList.findIndex((student)=>{
        return student.id == this.state.studentId;
      });
      console.log('curentStudent',curentStudent);

      // get q ids
      if(this.state.selected == 'none'){
        // this.state.studentList[curentStudent].questions = [] ;
        this.setState((prevState)=>{
          let nextState = Object.assign({},prevState);
          nextState.studentList[curentStudent].questions = [];
        },this.saveData);

      }else if(this.state.selected == 'all'){

        const qListId  = this.state.questionList.map((question)=>{
            return question.id;
          });
          // this.state.studentList[curentStudent].questions = qListId;
          this.setState((prevState)=>{
            let nextState = Object.assign({},prevState);
            nextState.studentList[curentStudent].questions = qListId;
          },this.saveData);

      }else{
        const qListId  = this.state.questionList.map((question,index)=>{
          return question.id;
        }).filter((id,index)=>{
          return Array.prototype.includes.call(this.state.selected,index);
        });

        // this.state.studentList[curentStudent].questions = qListId;
        // save to localStorage

        this.setState((prevState)=>{
          let nextState = Object.assign({},prevState);
          nextState.studentList[curentStudent].questions = qListId;
        },this.saveData);

      }

      console.log(this.state.studentList);
      // this.saveData();

    }else{
      // this.setState({alert:true});
      this.handleOpen();
    }

  }

  // select student
  selectStudent = (event, index, value) => { this.setState({studentId:value}); }


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleAddNewQ=()=>{
    this.setState({addNewQ:true});
  }

  closeAddNewQ=()=>{
    this.setState({addNewQ:false});
  }

  render() {
    console.dir(this.myStorage);
    if(this.state.addNewQ){
      return (<QuestionBuilder updateQuestionList={this.updateQuestionList} closeAddNewQ={this.closeAddNewQ} />);
    }
    return (
            <Card>
              <CardHeader
                title='List of Questions'
                subtitle="Select the questions"
              />
              <CardActions>
                {/* <FlatButton label="Assign" onClick={this.props.handleLogin} /> */}
                <RaisedButton label="Add new question" onClick={this.handleAddNewQ} primary={true} style={style} />
              </CardActions>
              <CardText>
                <Table onRowSelection={this.handleRowSelection} multiSelectable>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>ID</TableHeaderColumn>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                      <TableHeaderColumn>Type</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    deselectOnClickaway={false}
                    >
                    {this.state.questionList.map((elem,index)=>{
                      return (
                        <TableRow key={index} selected={this.isSelected(index)}>
                          <TableRowColumn>{index+1}</TableRowColumn>
                          <TableRowColumn>{elem.question}</TableRowColumn>
                          <TableRowColumn>{elem.type}</TableRowColumn>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardText>
              <Card>
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
                </CardText>
                <CardText>
                  <RaisedButton primary={true} label="Assgin" onClick={this.handleAssginQToStudent} style={style} />
                  <Alert handleClose={this.handleClose} open={this.state.open} />
                </CardText>
              </Card>
            </Card>
    );
  }
}



/**
 * Alerts
 */
class Alert extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={()=>{
          this.props.handleClose();
        }}
      />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
          Select student
        </Dialog>
      </div>
    );
  }
}
