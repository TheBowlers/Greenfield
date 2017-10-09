import React from 'react';

class StatsPanel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col-md-3 stats">
        <h2 className="text-center">Question Stats</h2>
        <table className="table table-striped table-hover ">
          <thead>
              <tr>
                <th>Category</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td>{this.props.currentQuestion.title}</td>
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
              <td>{this.props.currentQuestion.time/100} Seconds</td>
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