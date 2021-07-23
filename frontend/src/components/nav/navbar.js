import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import UserSettingsContainer from './user_settings_container';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersSettingOpen: false };
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.getCurrentUser(this.props.currentUser.id)
      .then(({ currentUser }) => {
        const style = getComputedStyle(document.body);
        currentUser.theme.map((color, i) => {
          style.setPropertyValue(`--theme-${i}`, color);
        })
      })
    };
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div id={this.props.location.pathname === "/" ? null : "home-nav"} className="nav-bar">
          <NavLink activeClassName="visiting" id="home-btn" to="/home">
            <img src={process.env.PUBLIC_URL + "/logo-image.png"} alt="home-btn" />
          </NavLink>
          <NavLink activeClassName="visiting" to="/metrics">METRICS</NavLink>
          <button onClick={() => this.setState({ usersSettingOpen: !this.state.usersSettingOpen })}>
            {this.props.currentUser.firstName ? this.props.currentUser.firstName.toUpperCase() : null}
          </button>
          {this.state.usersSettingOpen ? <UserSettingsContainer closeSettings={() => this.setState({ usersSettingOpen: false })}/> : null}
        </div>
      );
    } else {
      return (
        <div id="splash-nav" className="nav-bar">
          <NavLink activeClassName="visiting" id="home-btn" to="/">
            <img src={process.env.PUBLIC_URL + "/logo-image.png"} alt="home-btn" />
          </NavLink>
          <NavLink activeClassName="visiting" to={"/signup"}>SIGNUP</NavLink>
          <NavLink activeClassName="visiting" to={"/login"}>LOGIN</NavLink>
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