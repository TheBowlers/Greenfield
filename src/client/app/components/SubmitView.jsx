import React from 'react';

class SubmitView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      mainButtonText: 'Submit',
      startTime: Date.now(),
      timeElapsed: 0,
      timerIsOn: false,
      displayTimeElapsed: '',
      canAnswer: false
    };
    this.updateTime = this.updateTime.bind(this);
    this.startQuestionTimer = this.startQuestionTimer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('Submit Getting new props', nextProps)
    if (nextProps.timerIsOn) {
      this.startQuestionTimer();
    }else {
      if (nextProps.answeredCorrect !== undefined) {
        if(nextProps.answeredCorrect){
          this.setState({answerFeedback: "Nice job! That's correct."});
        } else {
          this.setState({answerFeedback: "Not quite. Maybe next time."});
        }

      }
    }


  }

  handleSubmit() {
    if(this.state.canAnswer === true) {
      clearInterval(this.state.questionTimer);
      this.setState({
        timerIsOn: false,
        canAnswer: false
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
      canAnswer: true
    });
    //this.props.getNextQuestion();
  }

  handleNextQuestionClick() {

    this.setState({
      answerFeedback: '',
      canAnswer: true
    });
    this.props.getNextQuestion();
  }

  render() {
    return (
      <div className="submitView">
        <button onClick={this.handleSubmit} className="btn btn-lg btn-primary col-md-3 submit">{this.state.mainButtonText}</button>
        <div className="seconds-timer">{this.state.displayTimeElapsed}</div>
        <div className="answered-correct-feedback">{this.state.answerFeedback}</div>
        <button onClick={this.handleNextQuestionClick} className="btn btn-lg btn-primary col-md-3 skip">NextQuestion</button>
      </div>
    )
  }
}

export default SubmitView;