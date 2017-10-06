import React from 'react';
import ModulesPanel from './ModulesPanel.jsx'
import QuestionPanel from './QuestionPanel.jsx'
import StatsPanel from './StatsPanel.jsx'

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainView: 'start',
      currentQuestion: {
        "_id": "59d54a6c8c4d5137387b7eb4",
        "title": "Ready to start quizzing?",
        "questionText": "When you start quizzing, a new question will appear here. Read the prompt and try to answer quickly to receive a bonus",
        "answerText": "Here is where you type in your answer. When you are ready, press 'Start Quizzing'",
        "questionType": "textResponse",
        "difficulty": "1",
        "time": "5",
        "author": "admin"
      },
      nextQuestion: {},
      answerField: "Here is where you type in your answer. When you are ready, press 'Start Quizzing'",
      questionStartTime: 0,
      answerSubmitTime: 0,
      startTimer: false,
    };
    this.changeView = this.changeView.bind(this);
    this.getNextQuestion = this.getNextQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }


  submitAnswer() {

    const correctAnswer = this.state.currentQuestion.answerText;
    const isCorrect = ($('.answer-field').text() == correctAnswer);
    this.setState({
      startTimer: false,
      isCorrect: isCorrect
    });
    const questionEndTime = Date.now();
    const timeToAnswer = questionEndTime - this.state.questionStartTime;
    const questionId = this.state.currentQuestion._id;


    if(isCorrect) {
      console.log('Answer Correct!');
    } else {
      console.log('Answer incorrect.');
    }
    console.log(`It took you ${timeToAnswer/1000} seconds to answer`);


    console.log('Submitting answer...');
    const request = $.ajax({
      method: "PUT",
      url: '/users/update',
      data: {
        email: document.user.email,
        question_id: questionId,
        timeToAnswer: timeToAnswer,
        answeredCorrect: isCorrect
      },
      dataType: 'application/json'
    });

    request.done((data) => {
      console.log('success');
    });

    request.fail((data) => {
      console.log('failed');
    });
  }

  renderNewQuestion(questionData) {
    console.log('renderNewQuestion Called');
    $('.answer-field').text('').focus();
    this.setState({
      currentQuestion: questionData,
      answerField: '',
      questionStartTime: Date.now(),
      startTimer: true
    });
  }

  getNextQuestion() {
    console.log('Getting next question');
    const request = $.ajax({
      method: "GET",
      url: '/questions',
      data: {questionType: 'textResponse'},
      dataType: 'application/json'
    });

    request.done((data) => {
      console.log('success');
      const question = JSON.parse(data.responseText);
      this.renderNewQuestion(question);
    });

    request.fail((data) => {
      console.log('failed');
      const question = JSON.parse(data.responseText);
      this.renderNewQuestion(question);
    });
  }

  changeView(viewName) {
    this.setState({mainView: viewName});
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="container-fluid mainView">
          <div className="row">
            <ModulesPanel />
            <QuestionPanel answeredCorrect = {this.state.isCorrect} timerIsOn = {this.state.startTimer} submitAnswer = {this.submitAnswer} answerField = {this.state.answerField} getNextQuestion = {this.getNextQuestion} changeView = {this.changeView} mainView = {this.state.mainView} currentQuestion = {this.state.currentQuestion}/>
            <StatsPanel mainView = {this.state.mainView} currentQuestion = {this.state.currentQuestion}/>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="jumbotron col-md-10 col-md-offset-1">
              <h1>Quizzer Wizard</h1>
              <img className="wizard" src="http://southparkstudios.mtvnimages.com/shared/characters/alter-egos/the-grand-wizard.png?height=165" alt="" />
              <p>
                <a href="https://github.com/TheBowlers/Greenfield" target="_blank" className="btn btn-lg btn-primary">Visit our Github</a>
              </p>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default MainView;