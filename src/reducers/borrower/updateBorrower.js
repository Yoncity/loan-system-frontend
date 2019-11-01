import * as types from "../../actionTypes/updateBorrowerTypes";

const updateBorrower = (state = {}, { payload, type }) => {
  switch (type) {
    case types.UPDATE_BORROWER_STARTED:
      return { loading: true, error: null };

    case types.UPDATE_BORROWER_SUCCESS:
      return { loading: false, success: payload.success };

    case types.UPDATE_BORROWER_ERROR:
      return {
        loading: false,
        error: payload.error
      };

    default:
      return state;
  }
};

export default updateBorrower;
