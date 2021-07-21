import React from "react";
import { Link, withRouter } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => {
          debugger
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
})}
      </ul>
    );
  }

  errors(field) {
    for (const error of this.state.errors) {
    }
  }

  toWords(str) {
    const sent = str.replace(/[A-Z]/g, (letter) => ` ${letter}`);
    return sent.slice(0, 1).toUpperCase() + sent.slice(1);
  }

  render() {
    const inputs = ["email", "firstName", "lastName", "password", "confirmPassword"].map(field => (
      <input
        key={field.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}
        type={field.slice(-4)==="word" ? "password" : "text" }
        value={this.state[field]}
        onChange={this.update(field)}
        placeholder={this.toWords(field)}
      />
    ))

    return (
      <>
      {this.renderErrors()}
        <div className="user-form-panel"></div>
        <div id="signup-form" className="user-form">
          <h1>SIGN UP</h1>
          <form onSubmit={this.handleSubmit}>
            {inputs}
            <input type="submit" value="Submit" />
            {this.renderErrors()}
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(SignupForm);
