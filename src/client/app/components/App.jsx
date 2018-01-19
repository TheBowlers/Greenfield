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
    if (document.user) {
      this.getUserInfo();
      this.setState({user: document.user});
    }
  }

  getUserInfo() {
    $.ajax({
      method: "GET",
      url: '/users/email',
      data: {
        email: document.user.email
      }
    })
    .done((data) => {
      console.log('getUserInfo in App.jsx succeeded', data);
      document.user = data;
      this.setState({user: document.user});
    })
    .fail((err) => {
      console.log('getUserInfo in App.jsx failed', err);
    });
  }

  logout() {
    document.user = null;
    this.setState({loggedIn: false});
    window.location = "/logout";
    console.log('LOGGING OUT');
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} logout={this.logout} loggedIn={this.state.loggedIn} />
        <MainView loggedIn={this.state.loggedIn} getUserInfo={this.getUserInfo} user={this.state.user}/>
        <Footer />
      </div>
    )
  }
}

export default App;