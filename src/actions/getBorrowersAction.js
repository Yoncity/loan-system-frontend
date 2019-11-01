import * as types from "../actionTypes/getBorrowersTypes";
import axios from "axios";

export const getBorrowersStarted = () => ({
  type: types.GET_BORROWERS_STARTED
});

export const getBorrowersSuccess = borrowers => ({
  type: types.GET_BORROWERS_SUCCESS,
  payload: { borrowers }
});

export const getBorrowersError = error => ({
  type: types.GET_BORROWERS_ERROR,
  payload: { error }
});

const getBorrowers = () => async dispatch => {
  dispatch(getBorrowersStarted());
  try {
    const url = `http://localhost:3000/api/v1/borrower/`;
    const token = localStorage.getItem("loan-system-token");
    const res = await axios.request({
      method: "GET",
      url,
      headers: {
        authorization: `Bearer ${token}`
      },
      responseType: "json",
      transformResponse: [
        data => {
          if (data.status !== 200) throw new Error(data.message);
          return data;
        }
      ]
    });
    dispatch(getBorrowersSuccess(res.data.borrower));
  } catch (error) {
    dispatch(getBorrowersError(error.message));
  }
};

export default getBorrowers;
