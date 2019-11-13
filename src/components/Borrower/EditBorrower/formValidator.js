import * as errors from '../../../constants/error';

const hasNoData = data => {
  return data === null || data === '';
};

const formValidator = borrowerData => {
  const { firstname, lastname, phone, address, idNumber } = borrowerData;

  try {
    if (
      hasNoData(firstname) ||
      hasNoData(lastname) ||
      hasNoData(phone) ||
      hasNoData(address) ||
      hasNoData(idNumber)
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

    return true;
  } catch (error) {
    return error.message;
  }
};

export default formValidator;
