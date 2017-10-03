import React from 'react';
import ModulesPanel from './ModulesPanel.jsx'
import QuestionPanel from './QuestionPanel.jsx'
import StatsPanel from './StatsPanel.jsx'

class MainView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="container-fluid mainView">
          <div className="row">
            <ModulesPanel />
            <QuestionPanel />
            <StatsPanel />
          </div>
        </div>
      )
    } else {
      return (
        <div className="container">
          <div className="jumbotron">
            <h1>Quizzer Wizard</h1>
            <img className="wizard" src="http://southparkstudios.mtvnimages.com/shared/characters/alter-egos/the-grand-wizard.png?height=165" alt="" />
            <p>
              <a className="btn btn-lg btn-success">Start Quizzing</a>
              <a className="btn btn-lg btn-primary">Visit our Github</a>
            </p>
          </div>
        </div>
      )
    }
  }
}

export default MainView;