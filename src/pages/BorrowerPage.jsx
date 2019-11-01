import React, { Component } from "react";
import Borrower from "../components/Borrower/Borrower";
import Layout from "../containers/Layout/Layout";

class BorrowerLoansPage extends Component {
  render() {
    const { location } = this.props;
    return (
      <Layout location={location}>
        <Borrower />
      </Layout>
    );
  }
}

export default BorrowerLoansPage;
