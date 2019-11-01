import React, { Component } from "react";
import "./Dashboard.scss";
import { connect } from "react-redux";
import getProfile from "../../actions/profile/profileActions";
import updateProfile from "../../actions/profile/updateProfileAction";
import Loader from "../Loader/Loader";

class Dashboard extends Component {
  state = {
    capital: null
  };

  componentWillMount() {
    const { getProfile } = this.props;
    getProfile();
  }

  getCapitalInput = ({ target: { name, value } }) => {
    if (name === "capital-input") {
      this.setState({ capital: value });
    }
  };

  updateCapital = () => {
    const { updateProfile } = this.props;
    const { capital } = this.state;
    updateProfile(Number(capital));
  };

  render() {
    const { loading, error, profile } = this.props;
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    if (profile) {
      return (
        <div id="dashboard">
          <div id="capital">
            <p id="capital-title">Current Capital</p>
            <p id="capital-value">UGX {profile.capital}</p>
          </div>
          <div id="updateCapital">
            <form onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                name="capital-input"
                onChange={this.getCapitalInput}
                placeholder="Enter New Capital"
              />
              <input
                type="submit"
                onClick={this.updateCapital}
                value="Update Captial"
              />
            </form>
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapState = ({ profile: { loading, error, profile } }) => ({
  loading,
  error,
  profile
});

const mapDispatch = dispatch => ({
  getProfile: () => dispatch(getProfile()),
  updateProfile: capital => dispatch(updateProfile(capital))
});

export default connect(
  mapState,
  mapDispatch
)(Dashboard);
