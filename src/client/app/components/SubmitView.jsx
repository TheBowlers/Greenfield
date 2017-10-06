import React from 'react';

class SubmitView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      mainButtonText: 'Submit',
      startTime: Date.now(),
      timeElapsed: 0,
      timerIsOn: false,
      displayTimeElapsed: ''
    };
    this.updateTime = this.updateTime.bind(this);
    this.startQuestionTimer = this.startQuestionTimer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timerIsOn) {
      this.startQuestionTimer();
    }
    if (nextProps.answerFeedback) {
      this.setState({answerFeedback: nextProps.answerFeedback});
    }

  }

  handleSubmit() {
    clearInterval(this.state.questionTimer);
    this.setState({timerIsOn: false});


    this.props.submitAnswer();
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
      timerIsOn: true
  });
    //this.props.getNextQuestion();
  }

  componentWillUpdate(nextProps, nextState) {

  }

  render() {
    return (
      <div className="submitView">
        <button onClick={this.handleSubmit} className="btn btn-lg btn-primary col-md-3 submit">{this.state.mainButtonText}</button>
        <div className="seconds-timer">{this.state.displayTimeElapsed}</div>
        <div className="seconds-timer">{this.state.answerFeedback}</div>
        <button onClick={this.props.getNextQuestion} className="btn btn-lg btn-primary col-md-3 skip">NextQuestion</button>
      </div>
    )
  }
}

export default SubmitView;