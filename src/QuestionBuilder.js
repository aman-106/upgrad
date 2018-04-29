import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
// const style = {
//   height: 100,
//   width: 100,
//   margin: 20,
//   textAlign: 'center',
//   display: 'inline-block',
// };

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const SelectQuestion = (props) => (
    <RadioButtonGroup
      name="shipSpeed"
      defaultSelected="passage"
      onChange={props.handleChange}
      >
      <RadioButton
        value="submission"
        label="SUBMISSION"
        style={styles.radioButton}
      />
      <RadioButton
        value="passage"
        label="PASSAGE"
        style={styles.radioButton}
      />
      <RadioButton
        value="mcq"
        label="MCQ"
        style={styles.radioButton}
      />
    </RadioButtonGroup>
);


class PassageQMaker extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      question:'',
      description:'',
      info:'',
    }
  }

  handleChangeInfo=(e,value)=>{
    this.setState({'info':value});
  }
  handleChangeDesc=(e,value)=>{
    this.setState({'description':value});
  }
  handleChangeTitle=(e,value)=>{
    this.setState({'question':value});
  }

  handleAddNewQ=()=>{
    if(this.state.question){
      let data = Object.assign({},this.state);
      data.type='passage';
      let timeStamp = new Date();
      timeStamp = timeStamp.toISOString();
      data.id=`passage-${timeStamp}`;
      this.props.addNewQ(data);
    }else{
      alert("empty question title");
    }
  }

  render(){
    return(
      <Paper
        // style={style}
        zDepth={2} >
        <Card>
          <CardText
            >
            Title
          </CardText>
          <CardText>
            <TextField
              onChange={this.handleChangeTitle}
              value={this.state.question}
              name='Title'
              hintText="some title"
            />
          </CardText>
          <CardText>
            description
          </CardText>
          <CardText>
            <TextField
              onChange={this.handleChangeDesc}
              value={this.state.description}
              name='description'
              hintText="some desc"
            />
          </CardText>
          <CardText>
            do and dont
          </CardText>
          <CardText>
            <TextField
              onChange={this.handleChangeInfo}
              value={this.state.info}
              name='  do and donts'
              hintText="to point answer"
            />
          </CardText>
          <CardActions>
          <FlatButton label="Author" onClick={this.handleAddNewQ} />
        </CardActions>
        </Card>
      </Paper>
    );
  }
}

export default class QuestionBuilder extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        qType:'passage',
      }
  }

  handlerQChange=(e,value)=>{
    this.setState({qType:value});
  }

  addNewQ=(qdata)=>{
    this.props.updateQuestionList(qdata);
  }

  render(){
    let questionBuilderSapce = false;
    if(this.state.qType=='passage'){
      questionBuilderSapce=<PassageQMaker  addNewQ={this.addNewQ}/>
    }else if(this.state.qType=='mcq' || this.state.qType == 'submission'){
      questionBuilderSapce=(
        <Card>
          <CardText>
            IN progress :(
          </CardText>
        </Card>);
    }
    return (
      <Card>
        <CardText>
          Select question
        </CardText>
        <CardText>
          <SelectQuestion handleChange={this.handlerQChange}/>
        </CardText>
        {questionBuilderSapce}
        <CardActions>
          <RaisedButton primary={true} label="Back" onClick={this.props.closeAddNewQ} />
        </CardActions>
      </Card>

    );
  }
}


export {SelectQuestion} ;
