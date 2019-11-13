import formValidator from '../../../components/Borrower/AddBorrower/formValidator';
import * as errors from '../../../constants/error';

describe('Form Validator Test', () => {
  let borrowerInfo = {
    borrowerInfo: {
      firstName: null,
      lastName: null,
      phone: null,
      address: null,
      idNumber: null,
    },
    loanInfo: {
      amountBorrowed: null,
      interestRate: null,
      security: null,
      amountReturn: null,
      returnDate: null,
    },
  };

  it('Should Fail When Passing Empty Values', () => {
    const response = formValidator(borrowerInfo);
    expect(response).toBe(errors.INCOMPLETE_DATA);
  });

  describe('Should Fail When Passing Malformed Data', () => {
    beforeEach(() => {
      borrowerInfo.borrowerInfo.firstname = 'Yonatan';
      borrowerInfo.borrowerInfo.lastname = 'Dawit';
      borrowerInfo.borrowerInfo.phone = '0787275358';
      borrowerInfo.borrowerInfo.address = 'Mengo';
      borrowerInfo.borrowerInfo.idNumber = '12345678';
      borrowerInfo.loanInfo.amountBorrowed = '100000';
      borrowerInfo.loanInfo.security = 'LAPTOP';
      borrowerInfo.loanInfo.interestRate = '3';
      borrowerInfo.loanInfo.amountReturn = '103000';
      borrowerInfo.loanInfo.returnDate = '2019-12-11';
    });

    it('Should Fail When Passing Numbers As Names For FIRST_NAME', () => {
      borrowerInfo.borrowerInfo.firstname = 'Yonatan123';
      const response = formValidator(borrowerInfo);
      expect(response).toBe(errors.BAD_FIRST_NAME);
    });

    it('Should Fail When Passing Numbers As Names For LAST_NAME', () => {
      borrowerInfo.borrowerInfo.lastname = 'Dawit12';
      const response = formValidator(borrowerInfo);
      expect(response).toBe(errors.BAD_LAST_NAME);
    });

    it('Should Fail When Passing Phone Less Than 10 or More than 13', () => {
      borrowerInfo.borrowerInfo.phone = '+2567872753581';
      const response = formValidator(borrowerInfo);
      expect(response).toBe(errors.BAD_PHONE);

      borrowerInfo.borrowerInfo.phone = '078727535';
      const response2 = formValidator(borrowerInfo);
      expect(response2).toBe(errors.BAD_PHONE);
    });

    it('Should Fail When Borrowing More Than Capital', () => {});

    it('Should Fail When Borrowing Less Than 30000', () => {
      borrowerInfo.loanInfo.amountBorrowed = '10000';
      const response = formValidator(borrowerInfo);
      expect(response).toBe(errors.AMOUNT_BORROWED_BELOW_LIMIT);
    });

    it('Should Fail When Borrowing More Than Capital', () => {
      borrowerInfo.loanInfo.amountBorrowed = '1350000';
      const response = formValidator(borrowerInfo, 1250000);
      expect(response).toBe(errors.AMOUNT_BORROWED_ABOVE_LIMIT);
    });

    it('Should Fail When Passing Interest Rate Below The Limit 1 ', () => {
      borrowerInfo.loanInfo.interestRate = '0';
      const response = formValidator(borrowerInfo);
      expect(response).toBe(errors.INTEREST_BELOW_LIMIT);
    });

    it('Should Fail When Passing Interest Rate Above The Limit 10', () => {
      borrowerInfo.loanInfo.interestRate = '11';
      const response = formValidator(borrowerInfo);
      expect(response).toBe(errors.INTEREST_ABOVE_LIMIT);
    });

    it('Should Fail When Setting Return Date After A Date As Passed.', () => {
      borrowerInfo.loanInfo.returnDate = '2018-11-11';
      const response = formValidator(borrowerInfo);
      expect(response).toBe(errors.WRONG_RETURN_DATE);

      borrowerInfo.loanInfo.returnDate = '2019-10-11';
      const response2 = formValidator(borrowerInfo);
      expect(response2).toBe(errors.WRONG_RETURN_DATE);

      borrowerInfo.loanInfo.returnDate = '2019-11-01';
      const response3 = formValidator(borrowerInfo);
      expect(response3).toBe(errors.WRONG_RETURN_DATE);
    });
  });
});
