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
      user: null
    };
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
    if (document.user) {
      this.setState({user: document.user});
    }

  }

  getUserInfo() {

    console.log('Getting next question');
    const request = $.ajax({
      method: "GET",
      url: '/users',
      data: {
        email: "jonathandavidlewis@gmail.com"
      },
      dataType: 'application/json'
    });

    request.done((data) => {
      console.log('Got User data, success', data.responseText);
      document.user = JSON.parse(data.responseText);
    });

    request.fail((data) => {
      console.log('Got User data, fail', data.responseText);
      document.user = JSON.parse(data.responseText);
      this.setState({user: document.user});
    });
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
        <Header user={this.state.user} logout={this.logout} loggedIn={this.state.loggedIn} />
        <MainView loggedIn={this.state.loggedIn} />
        <Footer />
      </div>
    )
  }
}

export default App;