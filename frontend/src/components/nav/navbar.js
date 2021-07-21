import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
      this.props.history.push('/');
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <>
          <button onClick={this.logoutUser}>LOGOUT</button>
        </>
      );
    } else {
      return (
        <>
          <Link to={'/signup'}>SIGNUP</Link>
          <Link to={'/login'}>LOGIN</Link>
        </>
      );
    }
  }

  render() {
      return (
        <div id="nav-bar">
            { this.getLinks() }
        </div>
      );
  }
}

export default withRouter(NavBar);