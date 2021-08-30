import React from "react";

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.currentUser,
      userUpdateFormOpen: true,
      colorThemeFormOpen: false,
      logOutConfirmation: false,
      selectedTheme: null
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
    if(this.props.currentUser.theme[3] !== this.state.theme[3]) { window.location.reload(); }
  }

  updateField(e, field) {
    this.setState({
      [field]: e.target.value
    })
  }

  updateTheme(e, palette){
    e.preventDefault();
    this.setState({
      ["theme"]: palette.slice(1), ["selectedTheme"]: palette[0]
    })
  }

  logout(e) {
    e.preventDefault();
    this.props.closeSettings();
    this.props.logout();
    this.props.history.push("/");
  }

  palettes() {
    return [
      // ["APRIL", "#e8e69c", "#dbdf68", "#435a75",
      //   "#5b7a5b", "#25262b"],
      ["MIDNIGHT","#808791", "#6c737c", "#5e6570",
        "#666581", "#6f819f", "#354b82", "#21355e", "#40444f", "#111111"],
      ["ROSE", "#c2b4b4", "#aa9393", "#816969",
        "#5e2321", "#74495b", "#806b74", "#816565", "#823835", "#332852"],
      ["FOREST", "#9c9c95", "#85857c", "#525c53",
        "#0f3813", "#215430", "#597449", "#6b806d", "#5b5149", "#2d231b"],
      ["APRIL", "#e8e69c", "#dee189", "#435a75",
        "#dbdd5a", "#9bb159", "#5b7a5b", "#385b5c", "#3a526e", "#6074c3"],
      ["SEASHORE", "#dbb7ab", "#d39e93", "#4a818d",
        "#d39e93", "#796b5d", "#e7d2a6", "#aba49b", "#4a818d", "#4B6587"],
      ["COFFEE", "#a78f76", "#7a6a57", "#634f45",
        "#73442b", "#ad6d2f", "#d7aa6a", "#a78f76", "#4c3c34", "#37251b"]
    ];
  }

  _colorBubbles(palette) {
    debugger
    const theme = this.state.selectedTheme
      || this.palettes().filter(palette => palette[1] === this.props.currentUser.theme[0])[0][0];

    return (
      <div key={palette[0]} className={theme === palette[0] ? "palette-row selected" : "palette-row"} onClick={e => this.updateTheme(e, palette)}>
        <p className="palette-name">{palette[0]}</p>
        <ul className="palette">
          {palette.slice(4).map(color => {
            const style = { backgroundColor: color };
            return (
              <li className="color-bubble" key={`${palette[0]}-${color}`} style={style}></li>
            );
          })}
        </ul>
      </div>
    )
  }

  colorOptions() {
    return (
      <ul id="palettes">
        {this.palettes().map(palette => this._colorBubbles(palette))}
      </ul>
    );
  }

  render() {
    return (
      <div id="user-settings">
        <div id="users-settings-background" onClick={this.props.closeSettings} ></div>
        <ul id="user-settings-nav">
          <li onClick={() => this.openSetting("userUpdateFormOpen")} className={this.state.userUpdateFormOpen ? "selected" : ""}>
            MY ACCOUNT
          </li>
          <li onClick={() => this.openSetting("colorThemeFormOpen")} className={this.state.colorThemeFormOpen ? "selected" : ""}>
            COLOR THEME
          </li>
          <li onClick={() => this.setState({ logOutConfirmation: true })}>
            LOGOUT
          </li>
        </ul>
        <div id="user-settings-content">
          <p className="exit" onClick={this.props.closeSettings}>
            &times;
          </p>
          {this.state.userUpdateFormOpen ? (
            <form id="user-update-form" className="user-settings-form">
              <label htmlFor="update-email">EMAIL</label>
              <input type="text" id="update-email" onChange={(e) => this.updateField(e, "email")} value={this.state.email} readOnly/>
              <label htmlFor="update-first-name">FIRST NAME</label>
              <input type="text" id="update-first-name" onChange={(e) => this.updateField(e, "firstName")} value={this.state.firstName} />
              <label htmlFor="update-last-name">LAST NAME</label>
              <input type="text" id="update-last-name" onChange={(e) => this.updateField(e, "lastName")} value={this.state.lastName} />
              <label htmlFor="update-password">CURRENT PASSWORD</label>
              <input type="password" id="update-password" />
              <div className="form-nav">
                <button onClick={this.handleSubmit}>Save</button>
                <p>Change Password</p>
              </div>
            </form>
          ) : null}
          {this.state.colorThemeFormOpen ? (
            <form id="color-theme-form" className="user-settings-form">
              {this.colorOptions()}
              <div className="form-nav">
                <button onClick={this.handleSubmit}>Save</button>
              </div>
            </form>
          ) : null}
        </div>
        {this.state.logOutConfirmation ? (
          <>
            <div
              className="overlay"
              onClick={() => this.setState({ logOutConfirmation: false })}
            ></div>
            <form id="log-out-form" className="user-settings-form">
              <h2>Are you sure you want to log out?</h2>
              <p>YOU'LL BE REDIRECTED TO THE LOG IN PAGE</p>
              <div className="form-nav">
                <p onClick={() => this.setState({ logOutConfirmation: false })}>
                  Cancel
                </p>
                <button onClick={this.logout}>Log Out</button>
              </div>
            </form>
          </>
        ) : null}
      </div>
    );
  }
}