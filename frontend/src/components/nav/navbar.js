import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <>
                <Link to={'/tweets'}>All Tweets</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/new_tweet'}>Write a Tweet</Link>
                <button onClick={this.logoutUser}>Logout</button>
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

export default NavBar;