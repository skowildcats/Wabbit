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

    this.props.login(user).then(({ currentUser }) => {
      const app = document.getElementById("app");
      currentUser.theme.map((color, i) => {
        app.style.setProperty(`--theme-${i+1}`, color);
      });
    }).catch(() => {
      if (Object.values(this.state.errors).length) {
        window.$("#submit").effect("shake")   
      }
    })
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
      <p className="errors">Login or password is invalid</p>
    ) : (
      null
    );

    return (
      <>
        <div className="user-form-panel"></div>
        <div id="login-form" className="user-form">
          <h1>LOG IN</h1>
          <form onSubmit={this.handleSubmit}>
            {errors}
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
            <input id="submit" type="submit" value="Log in" />
            <p>Don't have an account? </p>
            <Link to="/signup">Register now</Link>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(LoginForm);