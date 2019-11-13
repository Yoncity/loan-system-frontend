import * as errors from '../../constants/error';

const hasNoData = data => {
  return data === null || data === '';
};

const formValidator = borrowerData => {
  const { phone, idNumber } = borrowerData;

  try {
    if (hasNoData(phone) || hasNoData(idNumber)) {
      throw new Error(errors.INCOMPLETE_DATA);
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
