import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/home');
    }

    // Set or clear errors
    this.setState({errors: nextProps.errors})
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user); 
  }

  // Render the session errors if there are any
  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  errors() {
    if (Object.values(this.state.errors.length)) {
      return (
        <span>Login or password is invalid</span>
      );
    }
  }

  render() {
    const errors = (Object.values(this.state.errors).length) ? (
      <p>Login or password is invalid</p>
    ) : (
      null
    );

    return (
      <>
        <div className="user-form-panel"></div>
        <div id="login-form" className="user-form">
          <h1>LOG IN</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
              className={errors ? "has-errors" : ""}
            />
            {errors}
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
              className={errors ? "has-errors" : ""}
            />
            {errors}
            <input type="submit" value="Submit" />
            <p>Don't have an account? </p>
            <Link to="/signup">Register</Link>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(LoginForm);