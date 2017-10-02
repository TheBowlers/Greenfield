import React from 'react';
import QuestionView from './QuestionView.jsx'
import AnswerView from './AnswerView.jsx'
import SubmitView from './SubmitView.jsx'


class QuestionPanel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>QuestionPanel</h3>
        <QuestionView />
        <AnswerView />
        <SubmitView />
      </div>
    )
  }
}

export default QuestionPanel;