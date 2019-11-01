import React, { Component } from "react";
import "./SignIn.scss";
import { connect } from "react-redux";
import { authenticate } from "../../actions/authAction";
import { Redirect } from "react-router-dom";
import Loader from "../Loader/Loader";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  getFormInput = ({ target: { name, value } }) => {
    if (name === "username" || name === "password")
      this.setState({ [name]: value });
  };

  signIn = () => {
    const { username, password } = this.state;
    const { authenticate } = this.props;
    if (username == null) return;
    if (password == null) return;

    authenticate({ username, password });
  };

  renderSignInFields = (display, error) => {
    return (
      <div id="login-container">
        <div id="login-fields">
          <p id="login-title">Loan System</p>
          <p className="error" style={{ display }}>
            {error}
          </p>
          <form onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.getFormInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.getFormInput}
            />
            <input type="submit" onClick={this.signIn} value="Sign In" />
          </form>
        </div>
      </div>
    );
  };

  render() {
    const { isAuth, loading, error } = this.props;
    if (isAuth) {
      return <Redirect to="/" />;
    } else {
      if (loading) {
        return <Loader />;
      } else if (error) {
        return this.renderSignInFields("block", error);
      } else {
        return this.renderSignInFields("none", error);
      }
    }
  }
}

const mapState = ({ authenticate: { isAuth, loading, error } }) => ({
  isAuth,
  loading,
  error
});

const mapDispatch = dispatch => ({
  authenticate: user => dispatch(authenticate(user))
});

export default connect(
  mapState,
  mapDispatch
)(Login);
