import React from 'react';
import ModulesPanel from './ModulesPanel.jsx'
import QuestionPanel from './QuestionPanel.jsx'
import StatsPanel from './StatsPanel.jsx'

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: {}
    };
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="container-fluid mainView">
          <div className="row">
            <ModulesPanel />
            <QuestionPanel currentQuestion = {this.state.currentQuestion}/>
            <StatsPanel currentQuestion = {this.state.currentQuestion}/>
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