import * as types from "../../actionTypes/getBorrowersTypes";

const getBorrowers = (state = {}, { payload, type }) => {
  switch (type) {
    case types.GET_BORROWERS_STARTED:
      return { loading: true, error: null, borrowers: null };

    case types.GET_BORROWERS_SUCCESS:
      return { loading: false, borrowers: payload.borrowers };

    case types.GET_BORROWERS_ERROR:
      return { loading: false, error: payload.error };

    default:
      return state;
  }
};

export default getBorrowers;
