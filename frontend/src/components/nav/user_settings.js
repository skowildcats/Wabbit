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
    this._submitTheme = this._submitTheme.bind(this)

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

  _submitTheme(e){
    e.preventDefault()
    this.props.changeTheme({id: this.state.id, theme: this.state.theme})
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
      ["CANDY", "#CCCCCC", "#AAAAAA", "#878787",
        "#AE7675","#837E72", "#C7B97A", "#99AC89", "#799198", "#876E87"],
      ["VENICE","#808791", "#6C737C", "#5E6570",
        "#828079", "#C4B7A1", "#BFA49D", "#76848D", "#89664A", "#5D5449"],
      ["FOREST", "#9C9C95", "#85857C", "#525C53",
        "#414A44", "#596659", "#768A78", "#989486", "#686057", "#423B35"],
      ["POLAROID", "#B8BfB4", "#99A393", "#969086",
        "#8F6A61", "#9E9B9B", "#D1CA9F", "#A9B7A2", "#659990", "#526667"],
      ["SEASHORE", "#DBB7AB", "#D39E93", "#ABA49B",
        "#D39E93", "#796B5D", "#E7D2A6", "#ABA49B", "#4A818D", "#4B6587"],
      ["COFFEE", "#A78f76", "#7A6A57", "#634f45",
        "#73442B", "#AD6D2F", "#D7AA6A", "#A78f76", "#4C3C34", "#37251B"]
    ];
  }

  _colorBubbles(palette) {
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

          {/* theme menu */}
          {this.state.colorThemeFormOpen ? (
            <form id="color-theme-form" className="user-settings-form">
              {this.colorOptions()}
              <div className="form-nav">
                <button onClick={this._submitTheme}>Save</button>
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