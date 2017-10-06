import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      profilePic: "http://www.holidaybibleweek.co.uk/wp-content/uploads/mystery-300x300.png",
      username: "Default",
      userScore: "9,000"
    };

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

  loginWithGoogle() {
    window.location = "/auth/google";
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="nav navbar">
          <div className="container">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">{this.state.userScore} points</a><span></span></li>
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
          <div className="bs-example">
              <a href="#myModal" className="btn btn-lg btn-primary" data-toggle="modal">Launch Demo Modal</a>

              <div id="myModal" className="modal fade">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                              <h4 className="modal-title">Leaderboard</h4>
                          </div>
                          <div className="modal-body">
                            <table className="table table-striped table-hover ">
                              <thead>
                                <tr>
                                  <th>User</th>
                                  <th>Total <div>Score</div></th>
                                  <th>Correct <div>Answers</div></th>
                                  <th>Questions <div>Attempted</div></th>
                                  <th>Percent</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Kent Shepard</td>
                                  <td>100,000</td>
                                  <td>75</td>
                                  <td>150</td>
                                  <td>50%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
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