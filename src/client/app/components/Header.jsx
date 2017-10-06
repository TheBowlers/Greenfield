import React from 'react';
import Leaderboard from './Leaderboard.jsx'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      profilePic: "http://www.holidaybibleweek.co.uk/wp-content/uploads/mystery-300x300.png",
      username: "Default",
      userScore: "9,000",
      leaderboardEntries: []
    };

    // this.getUsers = this.getUsers.bind(this);
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

  // getUsers() {
  //   const request = $.ajax({
  //     method: "GET",
  //     url: '/users',
  //     dataType: 'application/json'
  //   });

  //   request.done((data) => {
  //     console.log('Got Users data, success', data.responseText);
  //     document.user = JSON.parse(data.responseText);
  //   });

  //   request.fail((data) => {
  //     console.log('Got Users data, fail', data.responseText);
  //     this.setState({
  //       leaderboardEntries: JSON.parse(data.responseText)
  //     })
  //   });
  // }

  loginWithGoogle() {
    window.location = "/auth/google";
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="nav navbar">
          <div className="container">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#leaderboard" data-toggle="modal">{this.state.userScore} points</a><span></span></li>
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
          <Leaderboard />
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