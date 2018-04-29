import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
const styles = {
    block: {
      maxWidth: 250,
    },
    checkbox: {
      marginBottom: 16,
    },
  };

export default class Login extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Card>
        <CardHeader
          title="Login"
        />
        <CardText>
          I am a ...
        </CardText>
        <CardText style={styles.block} >
            <Checkbox
            label="Teacher"
            id='teacherLogin'
            style={styles.checkbox}
            checked={this.props.currentLogin == 'teacherLogin'}
            onCheck={this.props.updateCheck}
            />
        </CardText>
        <CardText style={styles.block} >
            <Checkbox
            label="Student"
            id='studentLogin'
            style={styles.checkbox}
            checked={this.props.currentLogin == 'studentLogin'}
            onCheck={this.props.updateCheck}
            />
        </CardText>
        <CardActions>
          <FlatButton label="Login" onClick={this.props.handleLogin} />
        </CardActions>
      </Card>
    );
  }
}
