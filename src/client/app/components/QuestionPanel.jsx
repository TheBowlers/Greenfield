import React from 'react';
import QuestionView from './QuestionView.jsx'
import AnswerView from './AnswerView.jsx'
import SubmitView from './SubmitView.jsx'


class QuestionPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-6">
        <QuestionView currentQuestion={this.props.currentQuestion}/>
        <AnswerView currentQuestion={this.props.currentQuestion}/>
        <SubmitView getNextQuestion = {this.props.getNextQuestion} changeView = {this.props.changeView} mainView = {this.props.mainView} />
      </div>
    )
  }
}

export default QuestionPanel;