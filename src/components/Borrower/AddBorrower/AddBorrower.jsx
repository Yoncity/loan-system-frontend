import React, { Component } from 'react';
import { WRONG_RETURN_DATE, EMPTY_DATA } from '../../../constants/error';
import formValidator from './formValidator';
import { connect } from 'react-redux';
import addBorrower, {
  showSuccessMessageOnce,
} from '../../../actions/addBorrowerAction';
import Loader from '../../Loader/Loader';
import getProfile from '../../../actions/profile/profileActions';

export const calculateInterest = loanInfo => {
  if (loanInfo === null || Object.keys(loanInfo).length === 0) {
    return new Error(EMPTY_DATA).message;
  }
  const { interestRate, amountBorrowed, returnDate } = loanInfo;
  let currentDate = new Date();
  let returnDate2 = new Date(returnDate);

  let months;
  if (currentDate.getFullYear() === returnDate2.getFullYear()) {
    if (returnDate2 > currentDate) {
      months = returnDate2.getMonth() - currentDate.getMonth();
    }
  } else if (returnDate2.getFullYear() > currentDate.getFullYear()) {
    const diff = returnDate2.getFullYear() - currentDate.getFullYear();
    months = 12 * diff + returnDate2.getMonth() - currentDate.getMonth();
  } else return new Error(WRONG_RETURN_DATE);

  return (interestRate / 100) * amountBorrowed * months;
};

export const calculateAmountReturn = loanInfo => {
  if (loanInfo === null || Object.keys(loanInfo).length === 0) {
    return new Error(EMPTY_DATA).message;
  }
  const { amountBorrowed } = loanInfo;
  let interest = calculateInterest(loanInfo);
  interest += Number(amountBorrowed);
  return interest;
};

class AddBorrower extends Component {
  constructor() {
    super();
    this.state = {
      borrowerInfo: {
        firstname: null,
        lastname: null,
        idNumber: null,
        phone: null,
        address: null,
      },
      loanInfo: {
        amountBorrowed: null,
        interestRate: null,
        security: null,
        amountReturn: null,
        returnDate: null,
      },
    };
  }

  componentDidMount() {
    const { capital, getProfile } = this.props;
    if (capital === null || capital === '') {
      getProfile();
    }
  }

  initializeState = () => {
    this.setState({
      borrowerInfo: {
        firstname: null,
        lastname: null,
        idNumber: null,
        phone: null,
        address: null,
      },
      loanInfo: {
        amountBorrowed: null,
        interestRate: null,
        security: null,
        amountReturn: null,
        returnDate: null,
      },
    });
  };

  saveBorrowerInfo = () => {
    const { addBorrower, capital } = this.props;
    const { borrowerInfo, loanInfo } = this.state;

    const amountReturn = calculateAmountReturn(loanInfo);

    loanInfo.amountReturn = amountReturn;
    this.setState({ borrowerInfo, loanInfo });

    const proceed = formValidator({ borrowerInfo, loanInfo }, capital);
    if (proceed === true) {
      addBorrower({ borrowerInfo, loanInfo });
      this.initializeState();
    } else {
      alert(proceed);
    }
  };

  getFormFields = ({ target: { name, value } }, type) => {
    let tmp = this.state;
    if (type === 'borrowerInfo') {
      tmp.borrowerInfo[name] = value;
    } else if (type === 'loan') {
      tmp.loanInfo[name] = value;
    }
    this.setState(tmp);
  };

  renderAddForm = () => {
    return (
      <React.Fragment>
        <form onSubmit={e => e.preventDefault()}>
          <div className="container" id="name_container">
            <p className="fields-title">
              Full Name{' '}
              <span style={{ color: 'red' }}>
                {'>>'} (REQUIRED FIELDS) {'<<'}
              </span>
            </p>
            <input
              type="text"
              name="firstname"
              onChange={e => this.getFormFields(e, 'borrowerInfo')}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastname"
              onChange={e => this.getFormFields(e, 'borrowerInfo')}
              placeholder="Last Name"
            />
            <input
              type="text"
              name="idNumber"
              onChange={e => this.getFormFields(e, 'borrowerInfo')}
              placeholder="ID Number"
            />
          </div>

          <div className="container" id="contact_container">
            <p className="fields-title">
              Contact{' '}
              <span style={{ color: 'red' }}>
                {'>>'} (REQUIRED FIELDS) {'<<'}
              </span>
            </p>
            <input
              type="text"
              name="phone"
              onChange={e => this.getFormFields(e, 'borrowerInfo')}
              placeholder="Phone"
            />
            <input
              type="text"
              name="address"
              onChange={e => this.getFormFields(e, 'borrowerInfo')}
              placeholder="Address"
            />
          </div>

          <div className="container" id="loan_container">
            <p className="fields-title">
              Loan{' '}
              <span style={{ color: 'red' }}>
                {'>>'} (REQUIRED FIELDS) {'<<'}
              </span>
            </p>
            <input
              type="text"
              name="amountBorrowed"
              onChange={e => this.getFormFields(e, 'loan')}
              placeholder="Amount Borrowed"
            />
            <input
              type="text"
              name="security"
              onChange={e => this.getFormFields(e, 'loan')}
              placeholder="Security"
            />
            <input
              type="text"
              name="interestRate"
              onChange={e => this.getFormFields(e, 'loan')}
              placeholder="Interest Rate"
            />
            <input
              type="date"
              name="returnDate"
              onChange={e => this.getFormFields(e, 'loan')}
              placeholder="Return Date"
            />
          </div>
          <input
            type="submit"
            id="save-borrower"
            onClick={this.saveBorrowerInfo}
            value="SAVE BORROWER DETAILS"
          />
        </form>
      </React.Fragment>
    );
  };

  render() {
    const { loading, error, success, showSuccessMessageOnce } = this.props;
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return this.renderAddForm();
    }
    if (success) {
      alert('Successfully Borrowed');
      showSuccessMessageOnce();
    }
    return this.renderAddForm();
  }
}

const mapState = ({
  profile: {
    profile: { username, capital },
  },
  addBorrower: { loading, error, success },
}) => ({
  username,
  capital,
  loading,
  error,
  success,
});

const mapDispatch = dispatch => ({
  addBorrower: borrower => dispatch(addBorrower(borrower)),
  showSuccessMessageOnce: () => dispatch(showSuccessMessageOnce()),
  getProfile: () => dispatch(getProfile()),
});

export default connect(
  mapState,
  mapDispatch,
)(AddBorrower);
