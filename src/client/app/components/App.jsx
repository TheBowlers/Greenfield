import React from 'react';
import Login from './Login.jsx'
import Header from './Header.jsx'
import MainView from './MainView.jsx'
import Footer from './Footer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: Boolean(document.user),
      displayname: document.user || null
    };
  }

  logout() {
    document.user = null;
    this.setState({loggedIn: flase});
    window.location = "/logout";
    console.log('LOGGING OUT');
  }

  render() {
    return (
      <div>
        <Header displayname={this.state.displayname}logout={this.logout} loggedIn={this.state.loggedIn} />
        <MainView loggedIn={this.state.loggedIn} />
        <Footer />
      </div>
    )
  }
}

export default App;