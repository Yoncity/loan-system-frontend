import * as types from "../../actionTypes/addBorrowerTypes";

const addBorrower = (state = {}, { payload, type }) => {
  switch (type) {
    case types.ADD_BORROWER_STARTED:
      return {
        loading: true,
        error: null
      };

    case types.ADD_BORROWER_SUCCESS:
      return {
        loading: false,
        success: payload.success
      };

    case types.ADD_BORROWER_ERROR:
      return {
        loading: false,
        error: payload.error
      };

    case types.SHOW_SUCCESS_MESSAGE_ONCE:
      return {};

    default:
      return state;
  }
};

export default addBorrower;
