import React from "react";

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.currentUser,
      userUpdateFormOpen: true,
      colorThemeFormOpen: false,
      logOutConfirmation: false,
    };

    this.logout = this.logout.bind(this);
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  openSetting(setting) {
    setting === "userUpdateFormOpen"
      ? this.setState({ userUpdateFormOpen: true, colorThemeFormOpen: false })
      : this.setState({ userUpdateFormOpen: false, colorThemeFormOpen: true })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.patchUser(this.state);
  }

  updateField(e, field){
    this.setState({
      [field]: e.target.value
    })
  }

  logout(e) {
    e.preventDefault();
    this.props.closeSettings();
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    console.log(this.state)
    return (
      <div id="user-settings">
        <div id="users-settings-background" onClick={this.props.closeSettings}></div>
        <ul id="user-settings-nav">
          <li onClick={() => this.openSetting("userUpdateFormOpen")} className={this.state.userUpdateFormOpen ? "selected" : ""}>MY ACCOUNT</li>
          <li onClick={() => this.openSetting("colorThemeFormOpen")} className={this.state.colorThemeFormOpen ? "selected" : ""}>COLOR THEME</li>
          <li onClick={() => this.setState({logOutConfirmation: true})}>LOGOUT</li>
        </ul>
        <div id="user-settings-content">
          <p className="exit" onClick={this.props.closeSettings}>&times;</p>
          {this.state.userUpdateFormOpen ? (
            <form id="user-update-form" className="user-settings-form">
              <label htmlFor="update-first-name">FIRST NAME</label>
              <input type="text" id="update-first-name" onChange={(e) => this.updateField(e, "firstName")} value={this.state.firstName} />
              <label htmlFor="update-last-name">LAST NAME</label>
              <input type="text" id="update-last-name" onChange={(e) => this.updateField(e, "lastName")} value={this.state.lastName} />
              <label htmlFor="update-email">EMAIL</label>
              <input type="text" id="update-email" onChange={(e) => this.updateField(e, "email")} value={this.state.email} />
              <label htmlFor="update-password">CURRENT PASSWORD</label>
              <input type="password" id="update-password" />
              <div className="form-nav">
                <button onClick={this.handleSubmit}>Save</button>
                <p>Change Password</p>
              </div>
            </form>
          ) : null }
          {this.state.colorThemeFormOpen ? (
            <form id="color-theme-form" className="user-settings-form">
              <label htmlFor="update-first-name">FIRST NAME</label>
              <input type="text" id="update-first-name" value={this.state.firstName} />
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