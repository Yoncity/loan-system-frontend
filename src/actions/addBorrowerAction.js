import * as types from "../actionTypes/addBorrowerTypes";
import axios from "axios";

export const addBorrowerStarted = () => ({
  type: types.ADD_BORROWER_STARTED
});

export const addBorrowerSuccess = success => ({
  type: types.ADD_BORROWER_SUCCESS,
  payload: { success }
});

export const addBorrowerError = error => ({
  type: types.ADD_BORROWER_ERROR,
  payload: { error }
});

export const showSuccessMessageOnce = () => ({
  type: types.SHOW_SUCCESS_MESSAGE_ONCE
});

const addBorrower = borrower => async dispatch => {
  dispatch(addBorrowerStarted());
  try {
    const url = `http://localhost:3000/api/v1/borrower/`;
    const token = localStorage.getItem("loan-system-token");
    await axios.request({
      method: "POST",
      url,
      headers: {
        authorization: `Bearer ${token}`
      },
      data: borrower,
      responseType: "json",
      transformResponse: [
        data => {
          if (data.status !== 201) throw new Error(data.message);
          return data;
        }
      ]
    });

    dispatch(addBorrowerSuccess("success"));
  } catch (error) {
    dispatch(addBorrowerError(error.message));
  }
};

export default addBorrower;
