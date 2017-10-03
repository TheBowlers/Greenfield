import React from 'react';
import Login from './Login.jsx'
import Header from './Header.jsx'
import MainView from './MainView.jsx'
import Footer from './Footer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false
    }
  }

  render() {
    return (
      <div>
        <Header loggedIn={this.state.loggedIn} />
        <MainView loggedIn={this.state.loggedIn} />
        <Footer />
      </div>
    )
  }
}

export default App;