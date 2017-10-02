import React from 'react';
import ModulesPanel from './ModulesPanel.jsx'
import QuestionPanel from './QuestionPanel.jsx'
import StatsPanel from './StatsPanel.jsx'

class MainView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ModulesPanel />
        <QuestionPanel />
        <StatsPanel />
      </div>
    )
  }
}

export default MainView;