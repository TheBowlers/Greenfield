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
    this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    clearInterval(this.state.questionTimer);
    this.setState({timerIsOn: true});


    this.props.submitAnswer();
  }

  updateTime() {
    this.setState({
      timeElapsed: Date.now() - this.state.startTime,
      displayTimeElapsed: ((Date.now() - this.state.startTime)/1000).toFixed(2) + ' Seconds'
    });

  }

  handleNextQuestionClick() {
    this.setState({
      questionTimer: setInterval(this.updateTime, 100),
      startTime: Date.now(),
      timerIsOn: true
  });
    this.props.getNextQuestion();
  }

  componentWillUpdate(nextProps, nextState) {

  }

  render() {
    return (
      <div className="submitView">
        <button onClick={this.handleSubmit} className="btn btn-lg btn-primary col-md-3 submit">{this.state.mainButtonText}</button>
        <div class="seconds-timer">{this.state.displayTimeElapsed}</div>
        <button onClick={this.handleNextQuestionClick} className="btn btn-lg btn-primary col-md-3 skip">NextQuestion</button>
      </div>
    )
  }
}

export default SubmitView;