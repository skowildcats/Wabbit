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
        const app = document.getElementById("app")
        currentUser.theme.slice(0,3).map((color, i) => {
          app.style.setProperty(`--theme-${i+1}`, color);
        })
        currentUser.theme.slice(3).map((color, i) => {
          app.style.setProperty(`--task-color-${i+1}`, color);
        })
      })
    };
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div id={this.props.location.pathname === "/" ? null : "home-nav"} className="nav-bar">
          <NavLink exact activeClassName="visiting" id="splash-btn" to="/">
            <img src={process.env.PUBLIC_URL + "/logo-image.png"} alt="splash-btn" />
          </NavLink>
          <NavLink activeClassName="visiting" to={"/about"}>ABOUT US</NavLink>
          <NavLink activeClassName="visiting" to={"/home"}>HOME</NavLink>
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
          <NavLink exact activeClassName="visiting" id="splash-btn" to="/">
            <img src={process.env.PUBLIC_URL + "/logo-image.png"} alt="splash-btn" />
          </NavLink>
          <NavLink activeClassName="visiting" to={"/about"}>ABOUT US</NavLink>
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