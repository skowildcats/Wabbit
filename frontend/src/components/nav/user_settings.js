import React from "react";

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.currentUser,
      userUpdateFormOpen: true,
      logOutConfirmation: false
    };

    this.logout = this.logout.bind(this);
  }

  openSetting(setting) {
    this.setState({ [setting]: true })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.patchUser(this.state);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    return (
      <div id="user-settings">
        <div id="users-settings-background" onClick={this.props.closeSettings}></div>
        <ul id="user-settings-nav">
          <li onClick={() => this.openSetting("userUpdateFormOpen")}>MY ACCOUNT</li>
          <li onClick={() => this.setState({logOutConfirmation: true})}>LOGOUT</li>
        </ul>
        <div id="user-settings-content">
          <p className="exit" onClick={this.props.closeSettings}>&times;</p>
          {this.state.userUpdateFormOpen ? (
            <form id="user-update-form" className="user-settings-form">
              <label htmlFor="update-first-name">FIRST NAME</label>
              <input type="text" id="update-first-name" value={this.state.firstName} />
              <label htmlFor="update-last-name">LAST NAME</label>
              <input type="text" id="update-last-name" value={this.state.lastName} />
              <label htmlFor="update-email">EMAIL</label>
              <input type="text" id="update-email" value={this.state.email} />
              <label htmlFor="update-password">CURRENT PASSWORD</label>
              <input type="password" id="update-password" />
              <div className="form-nav">
                <button>Save</button>
                <p>Change Password</p>
              </div>
            </form>
          ) : null }
        </div>
        {this.state.logOutConfirmation ? (
          <>
            <div className="overlay" onClick={() => this.setState({ logOutConfirmation: false })}></div>
            <form id="log-out-form" className="user-settings-form">
              <h2>Are you sure you want to log out?</h2>
              <p>YOU'LL BE REDIRECTED TO THE LOG IN PAGE</p>
              <div className="form-nav">
                <p onClick={() => this.setState({ logOutConfirmation: false })}>Cancel</p>
                <button onClick={this.logout}>Log Out</button>
              </div>
            </form>
          </>
        ) : null }
      </div>
    );
  }
}