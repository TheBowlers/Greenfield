import React from 'react';
import Leaderboard from './Leaderboard.jsx'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      profilePic: null,
      username: "Default",
      userScore: null,
      leaderboardEntries: []
    };

    this.getUsers = this.getUsers.bind(this);
  }

  componentWillReceiveProps(newProps) {
    console.log('User information:', newProps);
    if(newProps.user) {
      this.setState({
        userScore: newProps.user.score.toLocaleString(),
        profilePic: newProps.user.image
      });
    }
  }

  getUsers() {
    $.ajax({
      method: "GET",
      url: '/users'
    })
    .done((data) => {
      console.log('getUsers in Header.jsx succeeded', data);
      this.setState({
        leaderboardEntries: data
      })
      $('#leaderboard').modal('show');
    })
    .fail((err) => {
      console.log('getUsers in Header.jsx failed', err);
    });
  }

  loginWithGoogle() {
    window.location = "/auth/google";
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="nav navbar">
          <div className="container">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#leaderboard" onClick={this.getUsers}>{this.state.userScore} points</a><span></span></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle profile" data-toggle="dropdown" role="button"><img className="profile-pic" src={this.state.profilePic} /><span className="caret"></span></a>
                <ul className="dropdown-menu" role="menu"  >
                  <li><a className="inactive">Signed in as</a></li>
                  <li><a className="inactive"><strong>{this.props.user.displayName}</strong></a></li>
                  <li className="divider"></li>
                  <li><a href="/add/question">Add a Question</a></li>
                  <li className="divider"></li>
                  <li><a href="/logout" onClick={this.props.logout}>Sign out</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <Leaderboard leaderboardEntries={this.state.leaderboardEntries}/>
        </div>
      )
    } else {
      return (
        <div className="nav navbar">
          <div className="container">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <img onClick={this.loginWithGoogle} className="btn-google" src="/public/images/btn_google_signin_light_normal_web@2x.png" />
              </li>
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default Header;