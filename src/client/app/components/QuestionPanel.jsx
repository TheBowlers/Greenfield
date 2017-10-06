import React from 'react';
import QuestionView from './QuestionView.jsx'
import AnswerView from './AnswerView.jsx'
import SubmitView from './SubmitView.jsx'


class QuestionPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleCtrlKeyPress = this.handleCtrlKeyPress.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleCtrlKeyPress);
  }

  handleCtrlKeyPress(e) {
    console.log('KEY PRESSED');
    console.log('CTRL pressed?', e.ctrlKey, 'keycode?', e.keyCode);
    if (e.ctrlKey && e.keyCode === 13){
      $('.submit').click();
    }
  }



  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleCtrlKeyPress);
  }



  render() {
    return (
      <div className="col-md-6">
        <QuestionView currentQuestion={this.props.currentQuestion}/>
        <AnswerView answerField = {this.props.answerField} currentQuestion={this.props.currentQuestion}/>
        <SubmitView answeredCorrect = {this.props.answeredCorrect} timerIsOn = {this.props.timerIsOn} submitAnswer = {this.props.submitAnswer} getNextQuestion = {this.props.getNextQuestion} changeView = {this.props.changeView} mainView = {this.props.mainView} />
      </div>
    )
  }
}

export default QuestionPanel;