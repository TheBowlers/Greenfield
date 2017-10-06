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
      method: "PUT",
      url: '/users/update',
      data: {
        email: "jonathandavidlewis@gmail.com",
        question_id: "59d5d9ba47f17d558312855d",
        timeToAnswer: 50000,
        isCorrect: true
      },
      dataType: 'application/json'
    });

    request.done((data) => {
      console.log('success');
      const question = JSON.parse(data.responseText);
      this.renderNewQuestion(question);
    });

    request.fail((data) => {
      console.log('failed');
      const question = JSON.parse(data.responseText);
      this.renderNewQuestion(question);
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