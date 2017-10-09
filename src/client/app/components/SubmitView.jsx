import React from 'react';

class SubmitView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      nextButtonText: 'Start Quizzing!',
      startTime: Date.now(),
      timeElapsed: 0,
      timerIsOn: false,
      displayTimeElapsed: '',
      canAnswer: false,
      hasStarted: false
    };
    this.updateTime = this.updateTime.bind(this);
    this.startQuestionTimer = this.startQuestionTimer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this);
    this.handleCtrlKeyPress = this.handleCtrlKeyPress.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleCtrlKeyPress);
  }

  handleCtrlKeyPress(e) {
    console.log('KEY PRESSED');
    console.log('CTRL pressed?', e.ctrlKey, 'keycode?', e.keyCode);
    if (e.ctrlKey && e.keyCode === 13){
      if(this.state.canAnswer) {
        $('.submit').click();
      } else {
        $('.skip').click();
      }
    }
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleCtrlKeyPress);
  }

  componentWillReceiveProps(nextProps) {
    console.log('Submit Getting new props', nextProps)
    if (nextProps.timerIsOn) {
      this.startQuestionTimer();
    }else {
      if (nextProps.answeredCorrect !== undefined) {
        if(nextProps.answeredCorrect){
          this.setState({
            answerFeedback: "Nice job! That's correct.",
            feedbackClass: 'correct-answer-feedback'
          });
        } else {
          this.setState({
            answerFeedback: "Not quite. Maybe next time.",
            feedbackClass: 'wrong-answer-feedback'
          });
        }

      }
    }


  }

  handleSubmit() {
    if(this.state.canAnswer === true) {
      clearInterval(this.state.questionTimer);
      this.setState({
        timerIsOn: false,
        canAnswer: false,
        hasStarted: false,
        nextButtonText: 'Next Question'
      });

      this.props.submitAnswer();
    }
  }

  updateTime() {
    this.setState({
      timeElapsed: Date.now() - this.state.startTime,
      displayTimeElapsed: ((Date.now() - this.state.startTime)/1000).toFixed(2) + ' Seconds'
    });

  }

  startQuestionTimer() {
    clearInterval(this.state.questionTimer);
    this.setState({
      questionTimer: setInterval(this.updateTime, 100),
      startTime: Date.now(),
      timerIsOn: true,
      canAnswer: true,
      nextButtonText: 'Skip Question'
    });
    //this.props.getNextQuestion();
  }

  handleNextQuestionClick() {

    this.setState({
      answerFeedback: '',
      canAnswer: true,
      hasStarted: true
    });
    this.props.getNextQuestion();
  }
  renderSubmitButton() {
    if (this.state.hasStarted) {
      return (
          <button onClick={this.handleSubmit} className="btn btn-lg btn-primary col-md-3 submit">Submit</button>
      )
    } else {
      return null;
    }
  }

  renderFeedback() {

  }

  render() {
    return (
      <div>
        <div className="submitView">
          {this.renderSubmitButton()}
          <button onClick={this.handleNextQuestionClick} className="btn btn-lg btn-primary col-md-3 col-md-offset-5 skip">{this.state.nextButtonText}</button>
          <div className="seconds-timer">{this.state.displayTimeElapsed}</div>
          <div className={this.state.feedbackClass}>{this.state.answerFeedback}</div>

        </div>
        <div>Pro tip: Use CTRL/COMMAND + Enter to answer and advance rapidly!</div>
      </div>
    )
  }
}

export default SubmitView;