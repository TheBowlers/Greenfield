import React from 'react';

class QuestionView extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="questionView">
        <div className="head-question">
          <div className="head-question-prompt">
            {this.props.currentQuestion.questionText}
          </div>
          <div className="head-question-buttons">
          </div>
        </div>
      </div>
    )
  }
}

export default QuestionView;

