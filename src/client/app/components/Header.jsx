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
    console.log('new props are', newProps);
    if(newProps.user) {
      console.log('new score is:', typeof newProps.user.score);
      this.setState({
        userScore: newProps.user.score.toLocaleString(),
        profilePic: newProps.user.image
      });
    }
  }

  getUsers() {
    $.ajax({
      url: 'http://127.0.0.1:8080/users',
      method: 'GET',
      success: function(data) {
        console.log('success', data);
        this.setState({
          leaderboardEntries: data
        })
        $('#leaderboard').modal('show');
      }.bind(this),
      error: function(err) {
        console.log(err);
      }.bind(this)
    })
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
                  <li><a href="#">Your Stats</a></li>
                  <li className="divider"></li>
                  <li><a href="#">Account Settings</a></li>
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