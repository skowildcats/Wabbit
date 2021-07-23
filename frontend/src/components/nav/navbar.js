import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserSettingsContainer from './user_settings_container';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersSettingOpen: false };
  }

  componentDidMount() {
    if (this.props.loggedIn) {this.props.getCurrentUser(this.props.currentUser.id)};
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div id="home-nav" className="nav-bar">
          <Link id="home-btn" to="/">
            <img src={process.env.PUBLIC_URL + "/logo-image.png"} alt="home-btn" />
          </Link>
          <Link to="/metrics">METRICS</Link>
          <button onClick={() => this.setState({ usersSettingOpen: !this.state.usersSettingOpen })}>
            {this.props.currentUser.firstName ? this.props.currentUser.firstName.toUpperCase() : null}
          </button>
          {this.state.usersSettingOpen ? <UserSettingsContainer closeSettings={() => this.setState({ usersSettingOpen: false })}/> : null}
        </div>
      );
    } else {
      return (
        <div id="splash-nav" className="nav-bar">
          <Link id="home-btn" to="/">
            <img src={process.env.PUBLIC_URL + "/logo-image.png"} alt="home-btn" />
          </Link>
          <Link to={"/signup"}>SIGNUP</Link>
          <Link to={"/login"}>LOGIN</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <>
        {this.getLinks()}
        {this.state.usersSettingOpen ? <form id="users-setting"></form> : null}
      </>
    );
  }
}

export default withRouter(NavBar);