import React from "react";

export default class UsersSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.currentUser;
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  handleClick(e) {
    e.preventDefault();
    this.patchUser(this.state);
  }

  render() {
    <form id="users-setting">

    </form>
  }
}