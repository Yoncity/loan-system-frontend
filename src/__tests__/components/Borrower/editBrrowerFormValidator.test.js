import formValidator from '../../../components/Borrower/EditBorrower/formValidator';
import * as errors from '../../../constants/error';

describe('Form Validator Test', () => {
  let borrowerInfo = {
    firstName: null,
    lastName: null,
    phone: null,
    address: null,
    idNumber: null,
  };

  it('Should Fail When Passing Empty Values', () => {
    const response = formValidator(borrowerInfo);
    expect(response).toBe(errors.INCOMPLETE_DATA);
  });

  describe('Should Fail When Passing Malformed Data', () => {
    beforeEach(() => {
      borrowerInfo.firstname = 'Yonatan';
      borrowerInfo.lastname = 'Dawit';
      borrowerInfo.phone = '0787275358';
      borrowerInfo.address = 'Mengo';
      borrowerInfo.idNumber = '12345678';
    });

    it('Should Fail When Passing Numbers As Names For FIRST_NAME', () => {
      borrowerInfo.firstname = 'Yonatan123';
      const response = formValidator(borrowerInfo);
      expect(response).toBe(errors.BAD_FIRST_NAME);
    });

    it('Should Fail When Passing Numbers As Names For LAST_NAME', () => {
      borrowerInfo.lastname = 'Dawit12';
      const response = formValidator(borrowerInfo);
      expect(response).toBe(errors.BAD_LAST_NAME);
    });

    it('Should Fail When Passing Phone Less Than 10 or More than 13', () => {
      borrowerInfo.phone = '+2567872753581';
      const response = formValidator(borrowerInfo);
      expect(response).toBe(errors.BAD_PHONE);

      borrowerInfo.phone = '078727535';
      const response2 = formValidator(borrowerInfo);
      expect(response2).toBe(errors.BAD_PHONE);
    });
  });
});
