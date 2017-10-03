import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="nav navbar">
          <div className="container">
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle profile" data-toggle="dropdown" role="button">Profile <span className="caret"></span></a>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="#">Signed in as</a></li>
                  <li className="divider"></li>
                  <li><a href="#">Your Stats</a></li>
                  <li className="divider"></li>
                  <li><a href="#">Account Settings</a></li>
                  <li><a href="#">Sign out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <div className="nav navbar">
          <div className="container">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Log In</a></li>
            <li>
              <div className="btn btn-success sign-up">Sign Up</div>
            </li>
          </ul>
          </div>
        </div>
      )
    }
  }
}

export default Header;