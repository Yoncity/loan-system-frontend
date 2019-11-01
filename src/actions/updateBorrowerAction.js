import * as types from "../actionTypes/updateBorrowerTypes";
import axios from "axios";

export const updateBorrowerStarted = () => ({
  type: types.UPDATE_BORROWER_STARTED
});

export const updateBorrowerSuccess = success => ({
  type: types.UPDATE_BORROWER_SUCCESS,
  payload: { success }
});

export const updateBorrowerError = error => ({
  type: types.UPDATE_BORROWER_ERROR,
  payload: { error }
});

export const updateBorrower = (borrower, slug) => async dispatch => {
  dispatch(updateBorrowerStarted());
  try {
    const url = `http://localhost:3000/api/v1/borrower/${slug}`;
    const token = localStorage.getItem("loan-system-token");
    await axios.request({
      method: "PUT",
      url,
      headers: {
        authorization: `Bearer ${token}`
      },
      data: borrower,
      responseType: "json",
      transformResponse: [
        data => {
          if (data.status !== 200) throw new Error(data.message);
          return data;
        }
      ]
    });
    dispatch(updateBorrowerSuccess("success"));
  } catch (error) {
    dispatch(updateBorrowerError(error.message));
  }
};
