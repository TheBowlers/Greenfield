import React from 'react';

class AnswerView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="answerView">
        <div className="head-question-response">
          <div className="answer-field" contentEditable="true" >
            {this.props.answerField}
          </div>
        </div>
      </div>
    )
  }
}


export default AnswerView;