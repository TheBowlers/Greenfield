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
        <div>
        </div>
      )
    }
  }
}

export default MainView;