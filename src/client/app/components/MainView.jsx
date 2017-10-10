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
        "category": "Ready to start quizzing?",
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
      selectedCategory: null
    };
    this.changeView = this.changeView.bind(this);
    this.getNextQuestion = this.getNextQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.getFirstQuestion = this.getFirstQuestion.bind(this);
    this.storeFirstQuestion = this.storeFirstQuestion.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  componentWillMount() {
    this.getFirstQuestion();
  }

  storeFirstQuestion(questionData) {
    this.setState({
      nextQuestion: questionData
    });
  }

  getFirstQuestion() {
    $.ajax({
      method: "GET",
      url: '/questions/category',
      data: {category: this.state.selectedCategory}
    })
    .done((data) => {
      console.log('getFirstQuestion request in MainView.jsx succeeded', data);
     this.storeFirstQuestion(data);
    })
    .fail((err) => {
      console.log('getFirstQuestion request in MainView.jsx failed', err);
    });
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

    $.ajax({
      method: "PUT",
      url: '/users/update',
      data: {
        email: document.user.email,
        question_id: questionId,
        timeToAnswer: timeToAnswer,
        answeredCorrect: isCorrect
      }
    })
    .done((data) => {
      console.log('submitAnswer request in MainView.jsx succeeded', data);
      this.props.getUserInfo();
    })
    .fail((err) => {
      console.log('submitAnswer request in MainView.jsx failed', err);
    });
  }

  renderNewQuestion(questionData) {
    console.log('renderNewQuestion Called');
    this.setState({
      nextQuestion: questionData
    });
  }

  getNextQuestion() {
    console.log('Getting next question');
    this.setState({
      currentQuestion: this.state.nextQuestion,
      answerField: '',
      questionStartTime: Date.now(),
      startTimer: true
    });
    $('.answer-field').text('').focus();
    const request = $.ajax({
      method: "GET",
      url: '/questions/category',
      data: {category: this.state.selectedCategory},
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

  selectCategory(category) {
    this.setState({selectedCategory: category});

  }

  changeView(viewName) {
    this.setState({mainView: viewName});
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="container-fluid mainView">
          <div className="row">
            <ModulesPanel selectCategory = {this.selectCategory} selectedCategory = {this.state.selectedCategory}/>
            <QuestionPanel answeredCorrect = {this.state.isCorrect} timerIsOn = {this.state.startTimer} submitAnswer = {this.submitAnswer} answerField = {this.state.answerField} getNextQuestion = {this.getNextQuestion} changeView = {this.changeView} mainView = {this.state.mainView} currentQuestion = {this.state.currentQuestion}/>
            <StatsPanel mainView = {this.state.mainView} currentQuestion = {this.state.currentQuestion} user={this.props.user}/>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container-fluid">
          <div className="row main-banner">
            <div className="jumbotron col-lg-3">
              <h2>Like flashcards, but more rewarding</h2>
              <hr/>
              <p>Crammr uses an algorithm to help guide your practice toward a fun and effective learning experience.</p>
              <br/>
              <p>By mixing a fun and competitive play with learning goals and repetition, you will build basic skills for more rapid recall.</p>
            </div>
            <div className="jumbotron col-lg-3">
              <h1>Crammr</h1>
              <img className="wizard" src="http://southparkstudios.mtvnimages.com/shared/characters/alter-egos/the-grand-wizard.png?height=165" alt="" />
              <p>
                <a href="https://github.com/TheBowlers/Greenfield" target="_blank" className="btn btn-lg btn-primary">Visit our Github</a>
              </p>
            </div>
            <div className="jumbotron col-lg-3">
              <h2>Improve your skills</h2>
              <hr/>
              <p>With Crammr, you can create a custom learning plan and earn points and badges as you practice.</p>
              <br/>
              <p>Challenge yourself to compete on the leaderboard and earn achievements for reaching your learning goals.</p>

            </div>
          </div>
        </div>
      )
    }
  }
}

export default MainView;