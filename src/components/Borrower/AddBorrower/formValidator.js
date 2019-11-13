import * as errors from '../../../constants/error';

const hasNoData = data => {
  return data === null || data === '';
};

const formValidator = (borrowerData, capital) => {
  const {
    borrowerInfo: { firstname, lastname, phone, address, idNumber },
    loanInfo: { amountBorrowed, interestRate, security, returnDate },
  } = borrowerData;

  try {
    if (
      hasNoData(firstname) ||
      hasNoData(lastname) ||
      hasNoData(phone) ||
      hasNoData(address) ||
      hasNoData(idNumber) ||
      hasNoData(amountBorrowed) ||
      hasNoData(interestRate) ||
      hasNoData(security) ||
      hasNoData(returnDate)
    ) {
      throw new Error(errors.INCOMPLETE_DATA);
    }

    let pattern = /[0-9]/;
    if (pattern.test(firstname)) {
      throw new Error(errors.BAD_FIRST_NAME);
    }
    if (pattern.test(lastname)) {
      throw new Error(errors.BAD_LAST_NAME);
    }

    let phonePattern = /[A-Za-z]/;
    if (phonePattern.test(phone)) {
      throw new Error(errors.BAD_PHONE);
    } else if (phone.length > 13) {
      throw new Error(errors.BAD_PHONE);
    } else if (phone.length < 10) {
      throw new Error(errors.BAD_PHONE);
    }

    if (amountBorrowed < 30000) {
      throw new Error(errors.AMOUNT_BORROWED_BELOW_LIMIT);
    } else if (amountBorrowed > capital) {
      throw new Error(errors.AMOUNT_BORROWED_ABOVE_LIMIT);
    }

    let interestPattern = /[A-Za-z]/;
    if (interestPattern.test(interestRate)) {
      throw new Error(errors.BAD_DATA_FORMAT);
    } else if (interestRate < 1) {
      throw new Error(errors.INTEREST_BELOW_LIMIT);
    } else if (interestRate > 10) {
      throw new Error(errors.INTEREST_ABOVE_LIMIT);
    }

    const currentDate = new Date();
    const expectedReturnDate = new Date(returnDate);
    if (expectedReturnDate < currentDate) {
      throw new Error(errors.WRONG_RETURN_DATE);
    }

    return true;
  } catch (error) {
    return error.message;
  }
};

export default formValidator;
