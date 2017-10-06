import React from 'react';

class StatsPanel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col-md-3 stats">
        <h1>Stats</h1>
        <h4>Question Title</h4>
        <div>{this.props.currentQuestion.title}</div>
        <h4>Difficulty</h4>
        <div>{this.props.currentQuestion.difficulty}</div>
        <h4>Author:</h4>
        <div>{this.props.currentQuestion.author}</div>
        <h4>Your best time:</h4>
        <div>{this.props.currentQuestion.time/100} Seconds</div>
        <h4>Time to beat:</h4>
        <div>{this.props.currentQuestion.time/1000} Seconds</div>

      </div>
    )
  }
}

export default StatsPanel;