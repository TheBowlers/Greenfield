import React from 'react';
import Login from './Login.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <p>Hello World</p>
        <Login />
      </div>
    )
  }
}

export default App;