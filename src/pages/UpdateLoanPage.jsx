import React, { Component } from "react";
import UpdateLoan from "../components/Loan/UpdateLoan";
import Layout from "../containers/Layout/Layout";

class ViewLoansPage extends Component {
  render() {
    const { location } = this.props;
    return (
      <Layout location={location}>
        <UpdateLoan />
      </Layout>
    );
  }
}

export default ViewLoansPage;
