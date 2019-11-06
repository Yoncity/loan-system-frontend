import React, { Component } from "react";
import "./ViewBorrowers.scss";
import { connect } from "react-redux";
import getBorrowers from "../../../actions/getBorrowersAction";
import Loader from "../../Loader/Loader";

class ViewBorrowers extends Component {
  constructor() {
    super();
    this.state = {
      showPaid: false,
      showUnPaid: true,
      showAll: false
    };
  }

  componentWillMount() {
    const { getBorrowers } = this.props;
    getBorrowers();
  }

  renderPaidBorrowers = () => {
    const { borrowers } = this.props;
    const paidBorrowers = borrowers.filter(b => b.paid === true);
    return this.renderViewBorrowers(paidBorrowers);
  };

  renderAllBorrowers = () => {
    const { borrowers } = this.props;
    return this.renderViewBorrowers(borrowers);
  };

  renderUnPaidBorrowers = () => {
    const { borrowers } = this.props;
    const unPaidBorrowers = borrowers.filter(b => b.paid === false);
    return this.renderViewBorrowers(unPaidBorrowers);
  };

  renderViewBorrowers = borrowers => {
    const { editBorrower } = this.props;
    return (
      <React.Fragment>
        <button
          onClick={() =>
            this.setState({ showPaid: false, showUnPaid: true, showAll: false })
          }
        >
          Show Unpaid Borrowers
        </button>
        <button
          onClick={() =>
            this.setState({ showPaid: true, showUnPaid: false, showAll: false })
          }
        >
          Show Paid Borrowers
        </button>

        <button
          onClick={() =>
            this.setState({ showPaid: false, showUnPaid: false, showAll: true })
          }
        >
          Show All Borrowers
        </button>
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
                onClick={() => editBorrower(info.slug)}
              >
                {info.borrowerInfo.firstname}
              </td>
              <td
                className="edit-borrower-info"
                onClick={() => editBorrower(info.slug)}
              >
                {info.borrowerInfo.lastname}
              </td>
              <td
                className="edit-borrower-info"
                onClick={() => editBorrower(info.slug)}
              >
                {info.borrowerInfo.address}
              </td>
              <td
                className="edit-borrower-info"
                onClick={() => editBorrower(info.slug)}
              >
                {info.borrowerInfo.phone}
              </td>
              <td>{info.loanInfo.amountBorrowed}</td>
              <td>{info.loanInfo.amountReturn}</td>
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
    const { showPaid, showUnPaid, showAll } = this.state;
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <div>Error....{error}</div>;
    }
    if (borrowers) {
      if (showPaid) {
        return this.renderPaidBorrowers();
      }
      if (showUnPaid) {
        return this.renderUnPaidBorrowers();
      }
      if (showAll) {
        return this.renderAllBorrowers();
      }
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
