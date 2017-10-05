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
        "_id": "demo",
        "title": "Ready to start quizzing?",
        "questionText": "When you start quizzing, a new question will appear here. Read the prompt and try to answer quickly to receive a bonus",
        "answerText": "Here is where you type in your answer. When you are ready, press 'Start Quizzing'",
        "questionType": "textResponse",
        "difficulty": "1",
        "time": "5",
        "author": "admin"
      }
    };
    this.changeView = this.changeView.bind(this);
    this.getNextQuestion = this.getNextQuestion.bind(this);
  }

  componentDidMount() {

  }

  renderNewQuestion(questionData) {
    console.log('renderNewQuestion Called');
    this.setState({currentQuestion: questionData});
  }

  getNextQuestion() {
    console.log('Getting next question');
    $.ajax({
      url: '/questions',
      data: {questionType: 'textResponse'},
      success: () => {
        console.log('success');
        this.renderNewQuestion();
      },
      failure: () => {
        console.log('failed');
        this.renderNewQuestion();
      },
      dataType: 'application/json'
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
            <QuestionPanel getNextQuestion = {this.getNextQuestion} changeView = {this.changeView} mainView = {this.state.mainView} currentQuestion = {this.state.currentQuestion}/>
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