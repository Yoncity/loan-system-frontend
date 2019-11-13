import {
  calculateInterest,
  calculateAmountReturn,
} from '../../../../components/Borrower/AddBorrower/AddBorrower';
import { EMPTY_DATA } from '../../../../constants/error';

describe('Interest And Amount Return Test', () => {
  it('Should Fail when passing it null object', () => {
    const interest = calculateInterest(null);
    expect(interest).toEqual(EMPTY_DATA);

    const interest2 = calculateAmountReturn(null);
    expect(interest2).toEqual(EMPTY_DATA);
  });

  it('Should Fail when passing it empty object', () => {
    const interest = calculateInterest({});
    expect(interest).toEqual(EMPTY_DATA);

    const interest2 = calculateAmountReturn({});
    expect(interest2).toEqual(EMPTY_DATA);
  });

  let loanInfo;

  beforeEach(() => {
    loanInfo = {
      amountBorrowed: 50000,
      interestRate: 3,
      returnDate: '2019-12-1',
    };
  });

  describe('Interest Test', () => {
    it('Should Return Interest For 1 month', () => {
      const interest = calculateInterest(loanInfo);
      expect(interest).toEqual(1500);
    });

    it('Should Return Interest For 2 months', () => {
      loanInfo.returnDate = '2020-1-1';
      const interest = calculateInterest(loanInfo);
      expect(interest).toEqual(3000);
    });
  });

  describe('Amount Return Test', () => {
    it('Should Return Amount Returned using 1500 interest', () => {
      loanInfo.returnDate = '2019-12-1';
      const amountReturn = calculateAmountReturn(loanInfo);
      expect(amountReturn).toEqual(loanInfo.amountBorrowed + 1500);
    });

    it('Should Return Amount Returned using 1500 interest', () => {
      loanInfo.returnDate = '2020-1-1';
      const amountReturn = calculateAmountReturn(loanInfo);
      expect(amountReturn).toEqual(loanInfo.amountBorrowed + 3000);
    });
  });
  
});
