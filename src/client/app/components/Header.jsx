import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownClicked: false,
      profilePic: "http://www.holidaybibleweek.co.uk/wp-content/uploads/mystery-300x300.png",
      username: "Default"
    }
  }

  handleDropdownClick() {
    this.setState({
      dropdownClicked: !this.state.dropdownClicked
    })
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="nav navbar">
          <div className="container">
            <ul className="nav navbar-nav navbar-right">
              <li className={this.state.dropdownClicked === true ? "dropdown open" : "dropdown"}>
                <a href="#" onClick={this.handleDropdownClick.bind(this)} className="dropdown-toggle profile" data-toggle="dropdown" role="button"><img class="profile-pic" src={this.state.profilePic} /><span className="caret"></span></a>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="#">Signed in as</a></li>
                  <li><a href="#"><strong>{this.state.username}</strong></a></li>
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
              <li>
                <img className="btn-google" src="/public/images/btn_google_signin_light_normal_web@2x.png" />
              </li>
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default Header;