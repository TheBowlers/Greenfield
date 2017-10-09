import React from 'react';

class StatsPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bestTime: null
    }
  }

  componentWillReceiveProps(newProps) {
    let bestTimeToAnswer = this.findQuestionStats(newProps.user.questionsAnswered, newProps.currentQuestion._id)
    this.setState({
      bestTime: bestTimeToAnswer
    })
  }

  findQuestionStats(questionsAnswered, currentQuestionId) {
    let questions = this.props.user.questionsAnswered
    for (var i = 0; i < questionsAnswered.length; i++) {
      if (currentQuestionId === questionsAnswered[i].id) {
        return questionsAnswered[i].bestTimeToAnswer / 1000
      }
    }
    return 'Not answered yet'
  }

  render() {
    return (
      <div className="col-md-3 stats">
        <h1>Question Stats</h1>
        <table className="table table-striped table-hover ">
          <thead>
              <tr>
                <th>Category</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td>{this.props.currentQuestion.category}</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-striped table-hover ">
          <thead>
              <tr>
                <th>Difficulty</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td>{this.props.currentQuestion.difficulty}</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-striped table-hover ">
          <thead>
              <tr>
                <th>Your best time</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td>{typeof this.state.bestTime === 'number' ? `${this.state.bestTime} Seconds` : this.state.bestTime}</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-striped table-hover ">
          <thead>
              <tr>
                <th>Time to beat</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td>{this.props.currentQuestion.time/1000} Seconds</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-striped table-hover ">
          <thead>
              <tr>
                <th>Author</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td>{this.props.currentQuestion.author}</td>
            </tr>
          </tbody>
        </table>
      </div>

    )
  }
}

export default StatsPanel;