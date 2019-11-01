import React, { Component } from "react";
import Layout from "../containers/Layout/Layout";
import Dashboard from "../components/Dashboard/Dashboard";

class DashboardPage extends Component {
  render() {
    const { location } = this.props;
    return (
      <Layout location={location}>
        <Dashboard />
      </Layout>
    );
  }
}

export default DashboardPage;
