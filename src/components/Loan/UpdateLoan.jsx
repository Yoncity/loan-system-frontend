import React, { Component } from 'react';
import { connect } from 'react-redux';
import getBorrowers from '../../actions/getBorrowersAction';
import './UpdateLoan.scss';
import { updateBorrower } from '../../actions/updateBorrowerAction';
import formValidator from './formValidator';

class UpdateLoan extends Component {
  state = {
    searchID: null,
    searchPhone: null,
    borrower: null,
  };

  componentDidMount() {
    const { borrowers, getBorrowers } = this.props;
    if (!borrowers) {
      getBorrowers();
    }
  }

  getFieldsInput = ({ target: { name, value } }) => {
    if (
      name === 'searchID' ||
      name === 'searchPhone' ||
      name === 'amountReturn'
    ) {
      this.setState({ [name]: value });
    }
  };

  searchBorrower = () => {
    const { borrowers } = this.props;
    const { searchID, searchPhone } = this.state;

    const proceed = formValidator({ idNumber: searchID, phone: searchPhone });

    if (proceed === true) {
      const borrower = borrowers.find(
        b =>
          b.borrowerInfo.idNumber === searchID &&
          b.borrowerInfo.phone === searchPhone,
      );
      if (borrower && borrower.paid === false) {
        this.setState({ borrower });
      } else {
        this.setState({ borrower: '' });
      }
    } else alert(proceed);
  };

  renderSearchFields = () => {
    return (
      <div id="search-borrower">
        <input
          type="text"
          name="searchID"
          onChange={this.getFieldsInput}
          placeholder="ID Number"
        />
        <input
          type="text"
          name="searchPhone"
          onChange={this.getFieldsInput}
          placeholder="Phone"
        />
        <input type="submit" onClick={this.searchBorrower} value="SEARCH" />
      </div>
    );
  };

  payLoan = () => {
    const { updateBorrower } = this.props;
    const { borrower } = this.state;

    updateBorrower({ paid: true }, borrower.slug);
  };

  renderFoundBorrower = borrower => {
    const { loading, error, success } = this.props;
    let status;
    let button = (
      <input type="submit" onClick={this.payLoan} value="Pay Loan" />
    );
    if (loading) {
      status = <div className="loading-message">Updating....</div>;
    }
    if (error) {
      status = <div className="error-message">Error....{error}</div>;
    }
    if (success) {
      status = <div className="success-message">Successfully Updated</div>;
      button = <input type="submit" id="paid-button" value="Paid" />;
    }
    if (borrower) {
      const { borrowerInfo, loanInfo } = borrower;
      return (
        <div id="found-borrower">
          {status}
          <div id="borrower-info">
            <p>
              Name: {borrowerInfo.firstname} {borrowerInfo.lastname}
            </p>
            <p>Phone: {borrowerInfo.phone}</p>
            <p>Address: {borrowerInfo.address}</p>
          </div>
          <div className="loan-info">
            <p>Amount Borrowed: {loanInfo.amountBorrowed}</p>
            <p>Interest Rate: {loanInfo.interestRate}%</p>
            <p>Amount To Return: {loanInfo.amountReturn}</p>
          </div>

          <div className="loan-info">
            <p>Borrowing Date: {loanInfo.createdAt}</p>
            <p>Return Date: {loanInfo.returnDate}</p>
          </div>

          {button}
        </div>
      );
    } else {
      let status;
      if (borrower === null) {
        status = <p id="no-borrower">Use Fields Above To Search A Borrower</p>;
      } else if (borrower === '') {
        status = <p id="no-borrower">No Borrower Found</p>;
      }
      return <div id="found-borrower">{status}</div>;
    }
  };

  render() {
    const { borrower } = this.state;
    return (
      <div id="update-loan">
        {this.renderSearchFields()}
        {this.renderFoundBorrower(borrower)}
      </div>
    );
  }
}

const mapState = ({
  getBorrowers: { borrowers },
  updateBorrower: { loading, error, success },
}) => ({
  borrowers,
  loading,
  error,
  success,
});

const mapDispatch = dispatch => ({
  updateBorrower: (borrower, slug) => dispatch(updateBorrower(borrower, slug)),
  getBorrowers: () => dispatch(getBorrowers()),
});

export default connect(
  mapState,
  mapDispatch,
)(UpdateLoan);
