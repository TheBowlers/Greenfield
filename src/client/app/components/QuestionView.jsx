import React from 'react';

class QuestionView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestionType: 'textResponse',
      currentQuestion: {},
      currentResponse: ''
    };
  }

  // componentDidMount() {
  //   TODO: display something by default
  // }
  handleQuestionTypeClick (questionType) {
    this.currentQuestionType = questionType;
    this.setQuestion();
  }

  setQuestion () {
    this.getQuestion(this.currentQuestionType, (question) =>
      this.setState({
        currentQuestion: question
      })
    );
  }

  getQuestion (questionType, callback) {
    //todo: change to relative path for urlRoute

    let urlRoute = '/questions?questionType=' + 'textResponse';
    $.ajax({
      url: urlRoute,
      type: 'get',
      dataType: 'application/json',
      success: function (data) {
        console.log('success', data);
        callback(data);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('error', errorThrown);
      }
    });
  }



  render() {
    //TODO: delegate the rendering to sub-components
    //<PromptView prompt={this.currentQuestion.questionText}>
    //<ResponseView question={this.currentQuestion.answerText}>
    //<QuestionButtons question={this.currentQuestion}>
    return (
      <div className="questionView">
        {/*
        <div>
         <div>Select a question type
           <a href="" onClick={() => this.handleQuestionTypeClick(this.state.currentQuestionType)} >Text Response</a>
         </div>
        </div>
        */}
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

