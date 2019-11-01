import React, { Component } from "react";
import "./ViewBorrowers.scss";
import { connect } from "react-redux";
import getBorrowers from "../../../actions/getBorrowersAction";
import Loader from "../../Loader/Loader";

class ViewBorrowers extends Component {
  componentWillMount() {
    const { getBorrowers } = this.props;
    getBorrowers();
  }

  editBorrower = slug => {};

  renderViewBorrowers = () => {
    const { borrowers } = this.props;
    return (
      <React.Fragment>
        <table cellSpacing="0" cellPadding="10" rules="none">
          <tr>
            <td id="name-field" colSpan="2">
              Full Name
            </td>
            <td id="contact-field" colSpan="2">
              Contact
            </td>
            <td id="loan-field" colSpan="4">
              Loan Information
            </td>
          </tr>

          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Address</td>
            <td>Phone</td>
            <td>Amount Borrowed</td>
            <td>Amount To Return</td>
            <td>Interest Rate</td>
            <td>Return Date</td>
          </tr>

          {borrowers.map(info => (
            <tr>
              <td
                className="edit-borrower-info"
                onClick={this.editBorrower(info.slug)}
              >
                {info.borrowerInfo.firstname}
              </td>
              <td
                className="edit-borrower-info"
                onClick={this.editBorrower(info.slug)}
              >
                {info.borrowerInfo.lastname}
              </td>
              <td
                className="edit-borrower-info"
                onClick={this.editBorrower(info.slug)}
              >
                {info.borrowerInfo.address}
              </td>
              <td
                className="edit-borrower-info"
                onClick={this.editBorrower(info.slug)}
              >
                {info.borrowerInfo.phone}
              </td>
              <td>{info.loanInfo.amountBorrowed}</td>
              <td
                className="edit-borrower-info"
                onClick={this.editBorrower(info.slug)}
              >
                {info.loanInfo.amountReturn}
              </td>
              <td>{info.loanInfo.interestRate}%</td>
              <td>{info.loanInfo.returnDate}</td>
            </tr>
          ))}
        </table>
      </React.Fragment>
    );
  };

  render() {
    const { loading, error, borrowers } = this.props;
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <div>Error....{error}</div>;
    }
    if (borrowers) {
      return this.renderViewBorrowers();
    }
    return null;
  }
}

const mapState = ({ getBorrowers: { loading, error, borrowers } }) => ({
  loading,
  error,
  borrowers
});

const mapDispatch = dispatch => ({
  getBorrowers: () => dispatch(getBorrowers())
});

export default connect(
  mapState,
  mapDispatch
)(ViewBorrowers);
